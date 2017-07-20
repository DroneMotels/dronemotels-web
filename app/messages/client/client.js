Meteor.subscribe('messages')

UI.registerHelper('messagesOfUser', function() {
    return Messages.find({}, {
        sort: {
            date_created: -1
        }
    })
})

UI.registerHelper('messagesCombined', function() {
  var grouped = _.groupBy(Messages.find({}, {
    sort: {
      from: 1
    }, fields: { from:1 }
  }).fetch(),'from');
  return _.map(Object.keys(grouped),function(key){
    return {
      from: key,
      count: grouped[key].length
    }
  })
})

UI.registerHelper('messagesUnreadWithUserId', function(uid){
  return Messages.find({from:uid,read:false}).count()
})

UI.registerHelper('userMessagesUnreadCount', function(){
  return Messages.find({read:false}).count()
})

UI.registerHelper('messagesFromUserWithId',function(userId){
  if (!userId && Session.get('MessageGroupSelected')) userId = Session.get('MessageGroupSelected')
  return Messages.find({$or:[{from:userId},{to:userId}]},{sort:{date_created:1}})
})

UI.registerHelper('sessionMessageGroupSelected',function(){
  return Session.get('MessageGroupSelected')
})

Template.user_messages.events({
  'click .messageGroupItem': function(e,t){
    Session.set('MessageGroupSelected',this.from)
    const template = this;
    e.stopPropagation();
    setTimeout(function(){
      var itm = t.find('.messageWindow')
      itm.scrollTop = itm.scrollHeight
      _.each(Messages.find({from:template.from,read:false}).fetch(), function(msg){
        Messages.update(msg._id,{$set:{read:true}})
      })
    },100)
    return false;
  },
  'click .removeMessage': function(e, t) {
    // console.log(this._id)
      Messages.remove(this._id)
  },
  'scroll .messageWindow': function(e,t){
    Session.set('messageWindowLock', false)
    var win = t.find('.messageWindow')

    var winHeight = $('.messageWindow').height()

    if (win.scrollTop + winHeight === win.scrollHeight) {
      Session.set('messageWindowLock',true)
    }
  }
})
Template.user_messages.onRendered(function(){
  Session.set('messageWindowLock', true)
  const template = this;
  const cursor = Messages.find();
  const handle = cursor.observeChanges({
    added() {
      if (Session.get('messageWindowLock')) {
        let itm = template.find('.messageWindow')
        itm.scrollTop = itm.scrollHeight - 300
      }
    },
    removed() {
      if (Session.get('messageWindowLock')) {
        let itm = template.find('.messageWindow')
        itm.scrollTop = itm.scrollHeight - 300
      }
    }
  });

  // var template = this;
  // var timer = setInterval(function(){
  //   let itm = template.find('.messageWindow')
  //   console.log(itm.scrollTop, itm.scrollHeight)
  //   itm.scrollTop = itm.scrollHeight - 300
  //   console.log(itm.scrollTop, itm.scrollHeight)
  // },1000)
})
Template.user_messages.onDestroyed(function(){
  if (this.timer) clearInterval(this.timer)
})

Template.messageSendInput.events({
    'click .messageSend': function(e, t) {
        var text = t.find('.text').value
        Meteor.call('sendMessage', this.to, text, this.related)
        t.find('.text').value = ""
    }
})

Template.messagesListed.events({
    'click .removeMessage': function(e, t) {
        Messages.remove(this._id)
    }
})

Router.map(function() {
    this.route('messages', {
        path: '/:username/messages',
        template: 'user_messages',
        layoutTemplate: 'layout_default',
        yieldTemplates: {
            'menubar': {
                to: 'top'
            },
            'user_menu': {
                to: 'left'
            }
        },
        waitOn: function() {
            return Meteor.subscribe('messages');
        },
        data: function() {
            return {
                messages: Messages.find({
                    owner: Meteor.userId()
                }, {
                    sort: {
                        date_created: -1
                    }
                })
            }
        }
    })
})
