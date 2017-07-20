Meteor.subscribe('modules');


Router.map(function() {

    this.route('modules', {
        path: '/:username/modules',
        template: 'user_modules',
        layoutTemplate: 'layout_default',
        yieldTemplates: {
            'menubar': {
                to: 'top'
            },
            'user_menu': {
                to: 'left'
            },
            'footer': {
                to: 'footer'
            }
        },
        waitOn: function() {
            return Meteor.subscribe('modules');
        },
        data: function() {
            return {
                modules: Modules.find({owner:Meteor.userId()},{sort:{date_created:-1}})
            }
        }
    });

    this.route('modules_insert', {
        path: '/:username/module/insert',
        template: 'module_insert',
        layoutTemplate: 'layout_default',
        yieldTemplates: {
            'menubar': {
                to: 'top'
            },
            'user_menu': {
                to: 'left'
            },
            'footer': {
                to: 'footer'
            }
        }
    });

    this.route('module_show', {
        path: '/:username/module/:moduleid',
        template: 'module_show',
        layoutTemplate: 'layout_default',
        yieldTemplates: {
            'menubar': {
                to: 'top'
            },
            'user_menu': {
                to: 'left'
            },
            'footer': {
                to: 'footer'
            }
        },
        waitOn: function() {
            Session.set('gallerySelectedImage', null)
            return Meteor.subscribe('modules');
        },
        data: function() {
            return {
                module: Modules.findOne({
                    _id: this.params.moduleid
                })
            }
        },
        onAfterAction: function() {
        }
    })

    this.route('module_edit', {
        path: '/:username/module/edit/:moduleid',
        template: 'module_edit',
        layoutTemplate: 'layout_default',
        yieldTemplates: {
            'menubar': {
                to: 'top'
            },
            'user_menu': {
                to: 'left'
            },
            'footer': {
                to: 'footer'
            }
        },
        waitOn: function() {
            return Meteor.subscribe('modules');
        },
        data: function() {
            return {
                module: Modules.findOne({
                    _id: this.params.moduleid
                })
            }
        },
        onAfterAction: function() {
            console.log(this)
            setTimeout(function(){
              $('.dropdown').dropdown()
              console.log('dropdown triggered')
            }, 1000)
        }
    })
})


var moduleInsertHook = {
    before: {
        insert: function(doc) {
            console.log('before insert', doc);
            doc.owner = Meteor.userId();
            doc.date_created = new Date()
            doc.date_changed = doc.date_created;
            console.log('before insert changed', doc);
            this.result(doc);
            console.log(doc)
        }
    },
    after: {
        insert: function(error, result) {
            if (error) console.error(error);
            if (result) {
                console.log('insert success')
                Router.go('/' + Meteor.user().username + '/module/' + result);
            }
        }
    }
};

var moduleUpdateHook = {
    before: {
        update: function(doc) {
            console.log('before update', doc);
            if (!doc['$set']) doc['$set'] = {}
            doc['$set'].date_changed = new Date()
            console.log('before update cahnged', doc);
            this.result(doc);
        }
    },
    after: {
        update: function(error, result) {
            //$('.menu .item').tab()
            // Router.go('/' + Meteor.user.username + '/modules');
        }
    },
    onSuccess: function(err, res) {
        console.log('onSuccess');
        // $('.menu .item').tab()
        // return;
    }
};

AutoForm.addHooks(['insertModule'], moduleInsertHook, true);
AutoForm.addHooks(['editModule'], moduleUpdateHook, true);

Template.registerHelper("moduleList", function() {
    return _.map(Modules.find().fetch(), function(m) {
      return {value: m._id, label: m.name || 'non name'}
    })
})
Template.registerHelper("moduleWithId", function(m) {
    return Modules.findOne(m)
})


Template.module_edit.onRendered(function() {
    $('.menu .item').tab()
    console.log('model_edit rendered');
    // mapInitEdit(this)


})

Template.module_show.events({
  'click .image-selector': function(e, t) {
    Session.set('gallerySelectedImage',this._id)
  },
  'click .flag-module': function(e,t){
    Meteor.call('flagModule',this._id)
  }
})

Template.module_edit.events({
    'click .map-update': function(e, t) {
        var lat = t.find('input[data-schema-key=location_lat]').value
        var lng = t.find('input[data-schema-key=location_lng]').value
        Modules.update(this.module._id, {
            $set: {
                location_lat: lat,
                location_lng: lng
            }
        })
    },
    'click button.add-dependency': function(e, t) {
      var sm = $('.item.active.selected').attr('data-value')
      if (sm && Modules.find(sm).count()) {
        Meteor.call('addDependency',this.module._id, sm)
      }
    },
    'click button.remove-submodule': function(e, t){
      var submoduleId = this._id
      var parentId = t.data.module._id
      Meteor.call('removeDependency',parentId, submoduleId)
    },
    'click .remove': function() {
        if (confirm('Really delete ' + this.module.name + '?')) {
            Modules.remove(this.module._id);
            Router.go('/' + Meteor.user.username + '/modules');
        }
    }
});
