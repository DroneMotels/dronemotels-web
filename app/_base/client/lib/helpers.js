UI.registerHelper('gallerySelectedImage', function() {
    return Session.get('gallerySelectedImage')
})

UI.registerHelper('isGallerySelectedImage', function(id) {
    return Session.equals('gallerySelectedImage', id)
})

UI.registerHelper('hasImagesWithMotelId', function(id) {
    return Images.find({
        postId: id
    }).count() > 1
})

UI.registerHelper('hasImagesWithModuleId', function(id) {
    return Images.find({
        postId: id
    }).count() > 1
})

UI.registerHelper('userWithId', function(id) {
    return Meteor.users.findOne(id)
})

UI.registerHelper('usernameWithId', function(id) {
    var user = Meteor.users.findOne(id)
    return user && user.username
})

UI.registerHelper('avatarWithId', function(id) {
    var user = Meteor.users.findOne(id)
    return user && user.avatar
})
UI.registerHelper('activeIf', function(name) {
    return Router.current().route.getName() === name ? "active" : "";
})
UI.registerHelper('isPage', function(name) {
    return Router.current().route.getName() === name || false;
})


UI.registerHelper('imageWithId', function(id) {
    return Images.findOne(id)
})

UI.registerHelper('moduleWithId', function(id) {
    return Modules.findOne(id)
})

UI.registerHelper('motelWithId', function(id) {
    return Motels.findOne(id)
})
UI.registerHelper('motelsWithOwnerId', function(owner) {
    return Motels.find({
        owner: owner
    })
})

UI.registerHelper('isMotel', function(id) {
    return Motels.findOne(id)
})

UI.registerHelper('moduleWithId', function(id) {
    return Modules.findOne(id)
})
UI.registerHelper('ratingsWithCommentId', function(id) {
    return Ratings.find({
        commentId: id
    })
})
UI.registerHelper('ratingsWithMotelId', function(id) {
    return Ratings.find({
        motelId: id
    })
})
UI.registerHelper('ratingsWithModuleId', function(id) {
    return Ratings.find({
        moduleId: id
    })
})
UI.registerHelper('ratingsCountWithCommentId', function(id) {
    return Ratings.find({
        commentId: id
    }).count()
})
UI.registerHelper('imageFirst', function(postId) {
    return _.first(Images.find({
        postId: postId
    }).fetch())
})

UI.registerHelper('ratingOfCommentWithId', function(commentId) {
    var rating = 0
    Ratings.find({
        commentId: commentId
    }).forEach(function(item) {
        rating = rating + item.rating
    })
    return rating
})
UI.registerHelper('ratingOfMotelWithId', function(id) {
    var rating = 0
    Ratings.find({
        motelId: id
    }).forEach(function(item) {
        rating = rating + item.rating
    })
    return rating
})
UI.registerHelper('ratingOfModuleWithId', function(id) {
    var rating = 0
    Ratings.find({
        moduleId: id
    }).forEach(function(item) {
        rating = rating + item.rating
    })
    return rating
})
UI.registerHelper('ratingColorWithRating', function(rating) {
    if (rating >= 1) return "green"
    if (rating <= -1) return "red"
    if (!rating) return "black"
})

UI.registerHelper('imagesOfItem', function(itemId) {
    return Images.find({
        postId: itemId
    }).fetch()
})

UI.registerHelper('niceDateAgo', function(date) {
    return moment.utc(date).fromNow()
})

UI.registerHelper("poep", function(obj) {
    return JSON.stringify(obj, null, 2)
})

UI.registerHelper("isEqual", function(a, b) {
    // console.log(a, b)
    return a === b
})

UI.registerHelper('textBreakSplits', function(txt) {
    return txt.split(/\r?\n|\r/g)
})
