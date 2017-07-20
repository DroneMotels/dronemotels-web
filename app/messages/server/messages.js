Meteor.publish('messages', function(){
  return Messages.find({owner:this.userId},{sort:{date_created:-1}})
})

Meteor.methods({
  sendMessage: function(to,content,related){
    if (to === this.userId || !content || content === "") return false;
    console.log(to,content,related);
    var msg = {
      owner: this.userId,
      to: to,
      from: this.userId,
      content: content,
      date_created: new Date(),
      related: related,
      read: true
    }
    Messages.insert(msg);
    msg.owner = to;
    msg.read = false;
    Messages.insert(msg);
  },
  markMessageAsRead: function(messageId){
    var msg = Messages.findOne(messageId)
    if (msg && msg.owner === this.userId) {
      Messages.update({_id:messageId},{$set:{read:true}})
    }
  }
})

Messages.allow({
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
