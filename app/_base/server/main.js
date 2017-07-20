
// --- Startup -----------------------------------------------------------------------

Meteor.startup(function(){
  var adminEmail = "nooitaf@gmail.com";
  var adminUser = Meteor.users.findOne({username:'admin'});
  //console.log(adminUser);
  if (adminUser) {
    if (adminUser.admin) {
      console.log(adminUser.username + ' is admin.');
      // --remove admin
      // Meteor.users.update(adminUser._id, {$set:{admin:false}});
      // console.log('admin revoced');
    } else {
      Meteor.users.update(adminUser._id, {$set:{admin:true}});
      console.log('admin set');
    }
  } else {
    console.log('Admin with ' + adminEmail + ' does not exist.');
    var adminId = Accounts.createUser({
      username: "admin",
      email:adminEmail,
      // password:"123456",
      admin:true
    })
    console.log('Admin created.');
    Accounts.setPassword(adminId, '123456')
  }

});



// --- User Publications --------------------------------------------------------------

Meteor.methods({
  'updateUser': function(options) {
    console.log(this.userId, options);
    Meteor.users.update({_id:this.userId},
                          {$set:{
                            username:options.username,
                            bio:options.bio
                          }
                        });
    if (!Meteor.users.findOne({email:options.email})){
      Meteor.users.update({_id:this.userId},
                            {$set:{
                              'emails':[{address:options.email}]
                            }
                          });
    }
  },
  'nameOfUserWithId':function(userId){
    return Meteor.users.findOne({_id:userId}) && Meteor.users.findOne({_id:userId}).username;;
  }
})

Meteor.publish("userData", function () {
  return Meteor.users.find({},
                           {fields: {'username':1,'admin': 1, 'avatar': 1}});
});
