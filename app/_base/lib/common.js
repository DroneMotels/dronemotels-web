
Router.map(function(){
  
  this.route('list', {
    path: '/list',
    template: 'list'
  });

  this.route('admin',{
    path: '/admin',
    template: 'admin',
    onBeforeAction: function(pause){
      this.subscribe('userData').wait();
      if (this.ready()) {
        if (!Meteor.user().admin) {
          this.redirect('home');
        } else {
          this.render();
        }
      } else {
        this.render('loading');
      }
    }
  })

});