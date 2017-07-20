T9n.setLanguage('en');

AccountsTemplates.configure({
  // Behaviour
  confirmPassword: true,
  enablePasswordChange: true,
  forbidClientAccountCreation: false,
  overrideLoginErrors: true,
  sendVerificationEmail: false,

  // Appearance
  showAddRemoveServices: false,
  showForgotPasswordLink: true,
  showLabels: true,
  showPlaceholders: true,

  // Client-side Validation
  continuousValidation: false,
  negativeFeedback: false,
  negativeValidation: true,
  positiveValidation: true,
  positiveFeedback: true,

  // Privacy Policy and Terms of Use
  privacyUrl: 'privacy',
  termsUrl: 'terms-of-use',

  // Redirects
  homeRoutePath: '/',
  redirectTimeout: 4000,

  // Texts
  // buttonText: {
  //   signUp: "Anmeldung versenden"
  // },
  // title: {
  //   forgotPwd: "Passw"
  // },
});

AccountsTemplates.addFields([
  {
    _id: 'username',
    type: 'text',
    displayName: "Username",
    required: true,
    minLength: 3
  }
]);

AccountsTemplates.configureRoute('forgotPwd', {
    name: 'forgot',
    path: '/forgot',
    layoutTemplate: 'formLayout',
    redirect: '/'
});

AccountsTemplates.configureRoute('enrollAccount', {
    name: 'enroll',
    path: '/enroll',
    layoutTemplate: 'formLayout',
    redirect: '/'
});

AccountsTemplates.configureRoute('signUp', {
    name: 'signup',
    path: '/signup',
    layoutTemplate: 'formLayout',
    redirect: '/'
});

AccountsTemplates.configureRoute('signIn', {
    name: 'signin',
    path: '/signin',
    layoutTemplate: 'formLayout',
    redirect: '/'
});


Router.plugin('ensureSignedIn', {
    only: ['profile']
});

Router.map(function(){

  this.route('logout', {
    path: '/logout',
    template: 'logout',
    onBeforeAction: function(){
      this.subscribe('userData').wait();
      if (this.ready()) {
        Meteor.logout();
        this.redirect('home');
      } else {
        this.render('loading');
      }
    }
  });

});
