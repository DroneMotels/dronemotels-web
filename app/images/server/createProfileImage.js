// import Canvas from 'canvas'
const { createCanvas, loadImage, Image } = require('canvas')

Meteor.methods({
  createAvatarForUserWithId: function(userId){
    var imageData = createAvatar()
    console.log(imageData)
    Meteor.users.update(userId,{$set:{avatar:imageData}})
  },
  createAvatarForAllUsers: function(){
    Meteor.users.find().forEach(function(item){
      var imageData = createAvatar()
      Meteor.users.update(item._id,{$set:{avatar:imageData}})
    })
  }
})
createAvatar = function(){
  var randomColor = function(){
    return Math.floor(120+Math.random()*(255-120))
  }
  // var Image = Canvas.Image
  var canvas = new createCanvas(200, 200)
  , ctx = canvas.getContext('2d');

  // background
  ctx.fillStyle = 'rgba('+randomColor()+','+randomColor()+','+randomColor()+',1)';
  console.log(ctx.fillStyle)
  ctx.beginPath();
  ctx.lineTo(0, 0);
  ctx.lineTo(200, 0);
  ctx.lineTo(200, 200);
  ctx.lineTo(0, 200);
  ctx.lineTo(0, 0);
  ctx.fill();
  // square
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.beginPath();
  ctx.lineTo(100, 75);
  ctx.lineTo(150, 100);
  ctx.lineTo(100, 125);
  ctx.lineTo(50, 100);
  ctx.lineTo(100, 75);
  ctx.fill();

  return canvas.toDataURL();
}

Accounts.onCreateUser(function(options,user) {
  user['avatar'] = createAvatar()
  return user;
});
