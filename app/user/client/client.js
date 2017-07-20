Meteor.subscribe('userData');


// user profile

Template.profile.events({
  'click .submit': function(e,t){
    e.preventDefault();
    var username = t.find('input.username').value;
    var email = t.find('input.email').value;
    var bio = t.find('textarea.bio').value;
    console.log(bio);
    console.log(Meteor.user.bio)

    Meteor.call('updateUser',{
      username:username,
      email:email,
      bio:bio
    });
  }
})
Template.profile.helpers({
  'firstEmail': function(emails){
    return emails[0].address;
  }
})


// user home

// user menu
Template.user_menu.helpers({
  motelCount: function(){
    return Motels.find({owner:Meteor.userId()}).count()
  }
})


// user motels

Template.user_motels.helpers({
  motels: function () {
    return Motels.find({owner:Meteor.userId()});
  }
});

Template.user_motels.events({
  'click .add': function(){
    Meteor.call('addMotel');
  }
})


UI.registerHelper('activeIf',function(route){
  return (Router.current().route.getName() === route) ? 'active' : '';
})

UI.registerHelper('avatarUrlWithUserId', function(userId){
  var user = Meteor.users.findOne({_id:userId})
  return user && user.avatar || false
})

Router.map(function(){

  // this.route('user_home', {
  //   path: '/:username',
  //   template: 'user_home',
  //   data: function(){
  //     return {
  //       user_selected: Meteor.users.findOne({username:this.params.username})
  //     }
  //   }
  // });


  this.route('profile_reroute', {
    path: '/:username',
    template: 'user_dashboard',
    layoutTemplate: 'layout_default',
    yieldTemplates: {
      'menubar'   : {to: 'top'},
      'user_menu' : {to: 'left'},
      'footer'    : {to: 'footer'}
    },
    waitOn: function(){
      return  Meteor.subscribe('userData')
      && Meteor.subscribe('meta')
      && Meteor.subscribe('motels')
      && Meteor.subscribe('modules')
      && Meteor.subscribe('messages')
    },
    data: function(){
      var user = Meteor.users.findOne({username:this.params.username})
      if (!user){
        return {
          user_selected: null,
          modules: [],
          motels: []
        }
      } else {
        console.log(this.params)
        Motels.find({owner:user._id}).forEach(function(item){
          console.log(item.name)
        })
        return {
          user_selected: user,
          modules: Modules.find({owner:user._id}),
          motels: Motels.find({owner:user._id}),
          messages: Messages.find({owner:user._id})
        }
      }
    }
  });

  // this.route('profile', {
  //   path: '/:username/profile',
  //   template: 'profile',
  //   layoutTemplate: 'layout_user_home',
  //   yieldTemplates: {
  //     'menubar'   : {to: 'top'},
  //     'user_menu' : {to: 'left'},
  //     'profile'   : {to: 'right'},
  //     'footer'    : {to: 'footer'}
  //   },
  //   data: function(){
  //     return {
  //       user_selected: Meteor.users.findOne({username:this.params.username})
  //     }
  //   }
  // });
  //


});
