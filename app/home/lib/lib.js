Router.map(function() {

  this.route('home', {
      path: '/',
      template: 'home',
      layoutTemplate: 'layout_home',
      // onBeforeAction: function(pause) {
      //     this.subscribe('userData').wait();
      //     this.subscribe('meta').wait();
      //     if (this.ready()) {
      //         this.render();
      //     } else {
      //         this.render('loading');\
      //     }
      // },
      waitOn: function() {
          return
          Meteor.subscribe('meta')
          && Meteor.subscribe('userData')
          && Meteor.subscribe('motels')
          && Meteor.subscribe('modules')
          && Meteor.subscribe('commentsLatest');
      },
      data: function() {
          return {
              modules: Modules.find({},{sort:{date_created:-1}, limit: 8}),
              motels: Motels.find({},{sort:{date_created:-1}, limit: 8})
          }
      }
  });

  this.route('faq', {
      path: '/faq',
      template: 'faq',
      layoutTemplate: 'layout_home'
  });

});
