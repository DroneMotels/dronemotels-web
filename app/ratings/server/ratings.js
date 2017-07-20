
Meteor.publish('ratings', function(){
  return Ratings.find({},{fields:{commentId:1,rating:1,userId:-1}});
})
