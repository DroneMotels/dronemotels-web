Meteor.subscribe('motels');

MapMotelEditor = null

Router.map(function() {

    this.route('motels', {
        path: '/:username/motels',
        template: 'user_motels',
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
            return Meteor.subscribe('motels');
        },
        data: function() {
            return {
                motels: Motels.find({owner:Meteor.userId()},{sort:{date_created:-1}})
            }
        }
    });

    this.route('motels_insert', {
        path: '/:username/motel/insert',
        template: 'motel_insert',
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

    this.route('motel_show', {
        path: '/:username/motel/:motelid',
        template: 'motel_show',
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
            return Meteor.subscribe('motels');
        },
        data: function() {
            return {
                motel: Motels.findOne({
                    _id: this.params.motelid
                })
            }
        },
        onAfterAction: function() {
        }
    })
    this.route('motel_edit', {
        path: '/:username/motel/edit/:motelid',
        template: 'motel_edit',
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
            return Meteor.subscribe('motels');
        },
        data: function() {
            return {
                motel: Motels.findOne({
                    _id: this.params.motelid
                })
            }
        },
        onAfterAction: function() {
            setTimeout(function(){
              $('.ui .dropdown').dropdown()
            },200)
        }
    })
})


var motelInsertHook = {
    before: {
        insert: function(doc) {
            console.log('before insert', doc);
            doc.owner = Meteor.userId();
            doc.date_created = new Date()
            doc.date_changed = doc.date_created;
            doc.status = 'hidden';
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
                Router.go('/' + Meteor.user().username + '/motel/edit/' + result);
            }
        }
    }
};

var motelUpdateHook = {
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
          setTimeout(function(){
            $('.ui .dropdown').dropdown()
          },200)
            //$('.menu .item').tab()
            // Router.go('/' + Meteor.user.username + '/motels');
        }
    },
    onSuccess: function(err, res) {
        console.log('onSuccess');
        // $('.menu .item').tab()
        // return;
    }
};

AutoForm.addHooks(['insertMotel'], motelInsertHook, true);
AutoForm.addHooks(['editMotel'], motelUpdateHook, true);

Template.motel_map.onRendered(function(){
  var lat = this.data.location_lat || 0;
  var lng = this.data.location_lng || 0;
  L.Icon.Default.imagePath = '/img/leaflet/';
  var map = L.map('map-show', {
    center: [lat, lng],
    zoom: 10,
    scrollWheelZoom: false,
    minZoom:2,
    maxZoom:16,
    worldCopyJump: true
  });
  var scrollblock = true
  map.on('click',function(){
    scrollblock = !scrollblock
    scrollblock ? this.scrollWheelZoom.enable() : this.scrollWheelZoom.disable()
  })
  map.spin(true)
  map.whenReady(function() {
    map.spin(false)
  })
  L.tileLayer.provider('OpenStreetMap.Mapnik').addTo(map);
  // L.tileLayer.provider('Stamen.TonerBackground').addTo(map);

  var marker = L.marker([lat, lng], {draggable: false}).addTo(map)

})

var mapCreate = function(t,doc){
  var defaultZoom = 1
  var flyToOptions = {
      animate: true,
      duration: 1
  }

  // var circleOptions = {
  //     stroke: true,
  //     weight: 1,
  //     color: 'black',
  //     fillColor: '#eeee33',
  //     fillOpacity: 0.8,
  // }
  //
  var markerOptions = {
    draggable: true
  }
  var obj = t.data.motel || {}
  var lat = obj.location_lat || 1
  var lng = obj.location_lng || 1


  L.Icon.Default.imagePath = '/img/leaflet/';
  if (MapMotelEditor != null) MapMotelEditor.remove()
  MapMotelEditor = null
  console.log('creating map');
  MapMotelEditor = L.map('map-edit', {
    center: [lat, lng],
    zoom: defaultZoom
  });
  MapMotelEditor.spin(true)
  MapMotelEditor.whenReady(function() {
      MapMotelEditor.spin(false)
  })
  L.tileLayer.provider('OpenStreetMap.Mapnik').addTo(MapMotelEditor);
  // L.tileLayer.provider('Stamen.TonerBackground').addTo(map);

  var marker = L.marker([lat, lng], markerOptions).addTo(MapMotelEditor)



  if (doc && doc.location_lat && doc.location_lng){
    var latlng = [doc.location_lat || 1, doc.location_lng || 1]
    MapMotelEditor.flyTo(latlng, defaultZoom, flyToOptions)
    MapMotelEditor.removeLayer(marker);
    marker = L.marker(latlng, circleOptions).addTo(MapMotelEditor)
  }
  marker.on('moveend', function(m){
    var latlng = m.target.getLatLng()
    console.log(latlng)
    $('input[name=location_lat]').val(latlng.lat)
    $('input[name=location_lng]').val(latlng.lng)
  })

}

var mapInitEdit = function(t) {
    if (t.data && t.data.map) {
        t.data.map._onResize()
        console.log("mapInitEdit resizing");
        return;
    }
    console.log("mapInitEdit new");
    // console.log(template)

    var query = Motels.find({
        _id: t.data.motel._id
    });
    query.observe({
        insert: function(doc) {
            console.log('insert', doc)
        },
        changed: function(doc) {
            console.log('changed', doc)
            // mapCreate(t,doc)
        }
    });


}

Template.motel_edit.onRendered(function() {
    $('.menu .item').tab()
    console.log('model_edit rendered');
    // mapInitEdit(this)


})


Template.motel_show.events({
  'click .image-selector': function(e, t) {
    Session.set('gallerySelectedImage',this._id)
  },
  'click .flag-motel': function(e,t){
    Meteor.call('flagMotel',this._id)
    console.log(this)
  }
})

Template.motel_edit.events({
    'click .map-update': function(e, t) {
        var lat = t.find('input[data-schema-key=location_lat]').value
        var lng = t.find('input[data-schema-key=location_lng]').value
        Motels.update(this.motel._id, {
            $set: {
                location_lat: lat,
                location_lng: lng
            }
        })
    },
    'click a[data-tab=location]': function(e, t) {
      mapCreate(t,e.data)
    },
    'click .map-zoom-world': function(e,t){
      MapMotelEditor.flyTo([t.data.motel.location_lat,t.data.motel.location_lng], 1, {
          animate: true,
          duration: 1
      })
    },
    'click .map-zoom-area': function(e,t){
      MapMotelEditor.flyTo([t.data.motel.location_lat,t.data.motel.location_lng], 10, {
          animate: true,
          duration: 1
      })
    },
    'click .map-zoom-closeup': function(e,t){
      MapMotelEditor.flyTo([t.data.motel.location_lat,t.data.motel.location_lng], 19, {
          animate: true,
          duration: 1
      })
    },
    'click .remove': function() {
        if (confirm('Really delete ' + this.motel.name + '?')) {
            Motels.remove(this.motel._id);
            Router.go('/' + Meteor.user.username + '/motels');
        }
    }
});

UI.registerHelper('motelStatusOptions', function(){
  return [
    {value:'hidden', label:"Hidden"},
    {value:'closed', label:"Closed"},
    {value:'open', label:"Open"}
  ]
})
