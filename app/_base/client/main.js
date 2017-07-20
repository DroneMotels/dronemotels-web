
Template.menubar.onRendered(function(){
  $('.ui.dropdown')
    .dropdown({
      //transition: 'fly down' //'drop'
    })
  ;

  // fix menu when passed
  $('.masthead')
    .visibility({
      once: false,
      onBottomPassed: function() {
        $('.fixed.menu').transition('fade in');
      },
      onBottomPassedReverse: function() {
        $('.fixed.menu').transition('fade out');
      }
    })
  ;

  // create sidebar and attach to menu open
  $('.ui.sidebar')
    .sidebar('attach events', '.toc.item')
  ;
})

// semantic fix
Template.div.onRendered(function() {
  $(this.firstNode).get(0).className = this.data.class;
  $(this.firstNode).get(0).style = this.data.style;
});
