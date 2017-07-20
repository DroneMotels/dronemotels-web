
// ------------- Images
var ImagesStore = new FS.Store.GridFS('images-original');

Images = new FS.Collection('images', {
  stores: [ImagesStore],
  filter: {
    allow: {
      contentTypes: ['image/jpeg','image/gif','image/png','image/svg'],
      extensions: ['jpg','gif','png','svg']
    }
  }
});

Meteor.subscribe('images');

Template.images_upload.events({
  'click .upload': function(e,t){
    e.preventDefault()
    var postId = this.postId
    var images = t.find('.images').files;
    _.each(images,function(file){
      var fileObj = new FS.File(file);
      fileObj.postId = postId;
      fileObj.owner = Meteor.userId();
      fileObj['metadata'] = {userId:Meteor.userId()};
      Images.insert(fileObj);
    })
    t.find('.images').value = null
  }
})

Template.images_listing.helpers({
  images: function(e,t){
    return Images.find({postId:this.postId})
  },
  imagesCount: function(e,t){
    return Images.find({postId:this.postId}).count()
  }
})
Template.images_listing_item.events({
  'click img': function(e,t){
    if (e.shiftKey) {
      Images.remove(this.image._id)
    }
  }
})
