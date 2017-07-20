
// --- Images Collection ---------------------------------------------------------

//FS.debug = true;

var ImagesStore = new FS.Store.GridFS("images-original", {
  //mongoUrl: 'mongodb://127.0.0.1:27017/test/', // optional, defaults to Meteor's local MongoDB
  //mongoOptions: {...},  // optional, see note below
  //transformWrite: myTransformWriteFunction, //optional
  //transformRead: myTransformReadFunction, //optional
  maxTries: 1, // optional, default 5
  chunkSize: 1024*1024  // optional, default GridFS chunk size in bytes (can be overridden per file).
                        // Default: 2MB. Reasonable range: 512KB - 4MB
});

Images = new FS.Collection('images', {
  stores: [ImagesStore],
  filter: {
    maxSize: 1048576 * 4, //in bytes
    allow: {
      contentTypes: ['image/jpeg','image/gif','image/png','image/svg'],
      extensions: ['jpg','gif','png','svg']
    }
  }
});


Images.allow({
  insert: function(userId, fileObj) {
    console.log('========== INSERT ==========='.red);
    fileObj['owner'] = userId
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
  download: function(userId, fileObj /*, shareId*/) {
    return true;
    // console.log('<<< '.green + fileObj._id.green);
    // var meta = Meta.findOne({meta:true},{limit:1});
    // var splash = meta.home_image;
    // if (userId) {
    //   console.log('is user')
    //   return true;
    // } else {
    //   if (splash && splash === fileObj._id) {
    //     return true;
    //   }
    //   if (Posts.findOne({_id:fileObj.postId})) {
    //     return true;
    //   }
    //   console.log('no user')
    //   return false;
    // }
  },
  fetch: []
});


Meteor.publish('images', function() {
  return Images.find({}, { limit: 0 });
});
