if (Meteor.isClient) {
  Meteor.startup(function(){
    Session.setDefault('email_sent',false);
    Session.set('email_sent',false);
  })
  Template.newsletter.subscribed = function(){
    return Session.get('email_sent');
  }
  Template.newsletter.events({
    'click .submit': function (e,t) {
      var email = t.find('.email').value;
      Meteor.call('apply_newsletter',email);
      t.find('.email').value = '';
      Session.set('email_sent',true);
    }
  });
}

if (Meteor.isServer) {
  Newsletter = new Meteor.Collection('newsletter');
  Meteor.methods({
    'apply_newsletter' : function(email){
      Newsletter.insert({email:email});
      console.log('email added: ',email)
    }
  })
}
