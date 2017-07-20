import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

Motels = new Mongo.Collection('motels');
Motels.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "Name",
    max: 200
  },
  owner: {
    type: String,
    label: "Owner",
    optional: false
  },
  type: {
    type: String,
    label: "Types",
    optional:true,
    // allowedValues: ['static','dynamic'],
    // autoform: {
    //   options: {
    //     static: "Static Location",
    //     dynamic: "Dynamic Location"
    //   }
    // }
  },
  status: {
    type: String,
    label: "Status",
    optional:false,
    allowedValues:['hidden','open','closed'],
    autoform: {
      options: {
        hidden: "Hidden",
        open: "Open",
        closed: "Closed"
      }
    }
  },
  room_size_x: {
    type: Number,
    label: "Room Width (mm)",
    optional: true
  },
  room_size_y: {
    type: Number,
    label: "Room Height (mm)",
    optional: true
  },
  room_size_z: {
    type: Number,
    label: "Room Depth (mm)",
    optional: true
  },
  room_features: {
    type: Array,
    optional: true,
    autoform:{
      allowedValues:['enclosed','light','heat','network','security','camera','power'],
      multiple: true,
      type: "select2",
      options:{
        enclosed: "Enclosed",
        light: "Light",
        heat: "Heated",
        network: "Network",
        security: "Security",
        camera: "Camera",
        power: "Power"
      }
    }
  },
  'room_features.$': {
    type: String,
    optional: true
  },
  description: {
    type: String,
    label: "Description (markdown)",
    optional: true,
    max: 1000
  },
  location_lat: {
    type: String,
    label: "Latitude",
    optional: true,
    max: 20
  },
  location_lng: {
    type: String,
    label: "Longitude",
    optional: true,
    max: 20
  },
  location_mag: {
    type: String,
    label: "Magnitude",
    optional: true,
    max: 20
  },
  date_created: {
    type: Date,
    label: "Date Created",
    optional: false
  },
  date_changed: {
    type: Date,
    label: "Date Changed",
    optional: false
  },
  flags: {
    type: Number,
    label: "Flags counter",
    optional: true
  }
}));
