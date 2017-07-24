Flags = new Mongo.Collection('flags');

Meteor.methods({
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
  }
})
