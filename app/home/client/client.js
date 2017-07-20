Template.mapHome.onRendered(function() {
    mapInitHome(this)
})

var mapInitHome = function(template) {
    var defaultZoom = 4
    var flyToOptions = {
        animate: true,
        duration: 1
    }
    var circleOptions = {
        stroke: true,
        weight: 1,
        color: 'black',
        fillColor: '#eeee33',
        fillOpacity: 0.8,
    }

    var p1 = [-30, -120]
    var p2 = [75, 140]

    var map = L.map('map-home', {
        scrollWheelZoom: false,
        minZoom:2,
        maxZoom:16,
        worldCopyJump: true
    }).fitBounds([ p1, p2 ],{maxZoom:8,padding:[50,50]});
    map.on('click',function(){
      this.scrollWheelZoom.enable()
    })
    template.map = map

    var markers = []
    map.spin(true)
    map.whenReady(function() {
        map.spin(false)
    })

    // L.circleMarker(p1).addTo(map)
    // L.circleMarker(p2).addTo(map)

    L.tileLayer.provider('Stamen.TonerBackground').addTo(map);
    // L.tileLayer.provider('Stamen.TonerLabels').addTo(map);
    // L.tileLayer.provider('Hydda.RoadsAndLabels').addTo(map);
    // L.tileLayer.provider('Stamen.TonerLines').addTo(map);
    // L.tileLayer.provider('CartoDB.PositronOnlyLabels').addTo(map);
    // L.tileLayer.provider('CartoDB.DarkMatterNoLabels').addTo(map);

    var query = Motels.find({
        location_lat: {
            $exists: true
        },
        location_lng: {
            $exists: true
        }
    });
    query.observe({
        added: function(document) {
            var latlng = [document.location_lat, document.location_lng]
            var marker = L.circleMarker(latlng, circleOptions).addTo(map)
            marker.on('click',function(){
              var ownerName = Meteor.users.findOne({_id:document.owner}).username;
              var imagePath = Images.findOne({postId:document._id}).url()
              var popup = L.popup()
                .setLatLng(latlng)
                .setContent('<h3><a href="/'+ownerName+'/motel/'+document._id+'">'+document.name+'</a></h3><img src="'+imagePath+'" width=100 />')
                .openOn(map);
            })
            marker.docid = document._id;
            markers.push(marker)
        },
        removed: function(oldDoc) {
            layers = markers;
            var key, marker;
            for (key in layers) {
                marker = layers[key];
                if (marker.docid === oldDoc._id) {
                    marker.remove();
                }
            }
        },
        changed: function(newDoc, oldDoc) {
            layers = markers;
            var key, val;
            for (key in layers) {
                val = layers[key];
                if (val.docid === oldDoc._id) {
                    val.setLatLng([newDoc.location_lat, newDoc.location_lng])
                }
            }
        }
    });


}
