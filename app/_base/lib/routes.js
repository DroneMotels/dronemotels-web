Router.configure({
  layoutTemplate: 'layout_default',
  loadingTemplate: 'loading',
  yieldTemplates: {
    'menubar' : {to: 'top'},
    'footer'  : {to: 'footer'}
  },
  onBeforeAction: function(){
    window.scrollTo(0,0);
    this.next();
  }
});
