Flags = new Mongo.Collection('flags');

Meteor.methods({
  flagComment: function(commentId,reason){
    if (!Flags.findOne({userId: this.userId, commentId: commentId})){
      Flags.insert({
        date_created: new Date(),
        userId: this.userId,
        commentId: commentId,
        reason: reason || "check"
      })
      Comments.update(commentId, {$inc:{flags:1}})
    }
  },
  flagMotel: function(motelId,reason){
    if (!Flags.findOne({userId: this.userId, motelId: motelId})){
      Flags.insert({
        date_created: new Date(),
        userId: this.userId,
        motelId: motelId,
        reason: reason || "check"
      })
      Motels.update(motelId, {$inc:{flags:1}})
    }
  },
  flagModule: function(moduleId,reason){
    if (!Flags.findOne({userId: this.userId, moduleId: moduleId})){
      Flags.insert({
        date_created: new Date(),
        userId: this.userId,
        moduleId: moduleId,
        reason: reason || "check"
      })
      Modules.update(moduleId, {$inc:{flags:1}})
    }
  },
  adminRemoveAllFlags: function(){
    Flags.find().forEach(function(item){
      Flags.remove(item._id)
    })
    Comments.find().forEach(function(item){
      Comments.update(item._id,{$set:{flags:0}})
    })
  }
})
