Meteor.subscribe('comments');

UI.registerHelper('commentsWithPostId', function(postId){
  return Comments.find({postId:postId},{sort:{date_created:-1}})
})

UI.registerHelper('commentsLatest', function(postId){
  return Comments.find({},{sort:{date_created:-1}, limit:5})
})

Template.semanticComments.onRendered = function(){

}

Session.setDefault('sessionCommentReplyTo',null)

UI.registerHelper('sessionCommentReplyTo', function(){
  return Comments.findOne({_id:Session.get('sessionCommentReplyTo')})
})

Template.semanticComment.events({
  'click a.reply': function(e,t){
    Session.set('sessionCommentReplyTo',this._id)
    var self = this
    $('.ui.basic.modal.comment').modal({
      closable: true,
      onDeny: function(){
        Session.set('sessionCommentReplyTo',null)
        return true
      },
      onApprove: function(){
        var text = $('textarea.commentReplyTextarea').val()
        Meteor.call('addComment',self._id,text)
        Session.set('sessionCommentReplyTo',null)
        return true
      }
    })
    .modal('show')

  },
  'click div.submit': function(e,t){
    var text = t.find('textarea').value
    console.log(e,t,this)
    Meteor.call('addComment',this._id,text)
  }
})


Template.commentInput.events({
  'click .commentSend': function(e,t){
    var text = t.find('.commentText').value
    console.log(this.postId);
    Meteor.call('addComment',this.postId,text)
    t.find('.commentText').value = ""
  }
})

Template.commentItem.events({
  'click .rate-up': function(e,t){
    var commentId = this._id
    var rating = 1
    console.log(commentId, rating)
    Meteor.call('addCommentRating',commentId, rating)
  },
  'click .rate-remove': function(e,t){
    var commentId = this._id
    Meteor.call('removeRating',commentId)
  },
  'click .rate-down': function(e,t){
    var commentId = this._id
    var rating = -1
    console.log(commentId, rating)
    Meteor.call('addCommentRating',commentId, rating)
  },
  'click .flag-comment': function(e,t){
    Meteor.call('flagComment',this._id)
  }
})
