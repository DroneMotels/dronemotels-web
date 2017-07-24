
Meteor.publish('ratings', function(){
  return Ratings.find({},{fields:{rating:1,userId:-1}});
})
