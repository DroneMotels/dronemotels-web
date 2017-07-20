Meteor.publish('commentsWithPostId', function(postId){
  return Comments.find({postId:postId},{sort:{date_created:-1}});
})
Meteor.publish('commentsLatest', function(postId){
  return Comments.find({},{sort:{date_created:-1}, limit: 10});
})

Meteor.publish('comments', function(id){
  return Comments.find({},{sort:{date_created:-1}});
})

Comments.allow({
  insert: function(userId, fileObj) {
    if (userId && fileObj.owner && fileObj.owner === userId){
      return true;
    } else {
      return false;
    }
  },
  update: function(userId, fileObj) {
  if (userId) {
      if (fileObj.owner && fileObj.owner === userId){
        fileObj['date_edited'] = new Date();
        return true;
      } else {
        if (Meteor.users.findOne(userId).admin) {
          fileObj['date_edited'] = new Date();
          return true;
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  },
  remove: function(userId, fileObj) {
    if (userId) {
      if (fileObj.owner === userId) {
        return true;
      } else {
        if (Meteor.users.findOne(userId).admin) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  },
  fetch: ['owner']
});

Meteor.methods({
  addComment: function(postId, text){
    console.log(postId,text)
    if ( text && postId && this.userId ) {
      Comments.insert({
        owner:this.userId,
        date_created: new Date(),
        date_edited: new Date(),
        postId: postId,
        text: text
      });
    }
  },
  addCommentRating: function(commentId, rating){
    if ( this.userId && commentId && rating ) {
      // check if user already commentSend
      console.log(this.userId, commentId, rating)
      var commentExists = Ratings.findOne({commentId:commentId, userId: this.userId })
      // console.log(commentExists)
      if (!commentExists) {
        Ratings.insert({
          commentId: commentId,
          userId: this.userId,
          rating: rating
        })
      } else {
        Ratings.update(commentExists._id,{$set:{
          commentId: commentId,
          userId: this.userId,
          rating: rating
        }})
      }
    }
  },
  removeRating: function(commentId){
    Ratings.remove({commentId:commentId,userId:this.userId})
  }
})

// remove all ratings
Meteor.methods({
  adminRemoveAllRatings: function(){
    Comments.find({}).forEach(function(item){
      Comments.update(item._id,{$set:{"ratings":[]}})
    })
  }
})
