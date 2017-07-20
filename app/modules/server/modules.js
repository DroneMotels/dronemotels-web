
Meteor.publish('modules', function(){
  return Modules.find({
    $and:[{
      $or:[{
          status:"hidden",
          owner:this.userId
        },
        {
          status:{
            $ne:"hidden"
          }
      }]
    },{
      $or:[{ flags: {$lt: 3}},{ flags: { $exists: false }}]
    }
    ]
  });
})

Modules.allow({
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
  addModule: function(name){
    Modules.insert({
      name:name||'un-named module',
      owner:this.userId
    });
  }
})

Meteor.methods({
  addDependency: function(mod, dep) {
    Modules.update(mod,{
      $push:{
        dependencies: dep
      }
    })
  },
  removeDependency: function(mod, dep) {
    Modules.update(mod,{
      $pull:{
        dependencies: dep
      }
    },
    { multi: false }
  )
  }
})
