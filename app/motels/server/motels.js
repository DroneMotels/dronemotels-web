
Meteor.publish('motels', function(){
  return Motels.find(
    {
      $or:[{
              status:"hidden",
              owner:this.userId
            },
            {
              status:{
                $ne:"hidden"
              }
    }]
  });
})

Motels.allow({
  insert: function(userId, fileObj) {
    console.log('========== INSERT ==========='.red);
    if (userId && fileObj.owner && fileObj.owner === userId){
      return true;
    } else {
      console.log('no userId'.yellow);
      return false;
    }
  },
  update: function(userId, fileObj) {
    console.log('========== UPDATE ============'.red);
    if (userId) {
      if (fileObj.owner && fileObj.owner === userId){
        console.log('is owner'.green);
        return true;
      } else {
        console.log('not owner'.red);
        if (Meteor.users.findOne(userId).admin) {
          console.log('is admin'.green);
          return true;
        } else {
          console.log('not admin'.red);
          return false;
        }
      }
    } else {
      return false;
    }
  },
  remove: function(userId, fileObj) {
    console.log('>>> '.red + fileObj._id);
    if (userId) {
      if (fileObj.owner === userId) {
        console.log('is owner'.green);
        return true;
      } else {
        console.log('not owner'.red);
        if (Meteor.users.findOne(userId).admin) {
          console.log('is admin'.green);
          return true;
        } else {
          console.log('not admin'.red);
          return false;
        }
      }
    } else {
      console.log('no userId'.red);
      return false;
    }
  },
  fetch: ['owner']
});

Meteor.methods({
  addMotel: function(name){
    Motels.insert({
      name:name||'unnamed motel',
      owner:this.userId
    });
  }
})
