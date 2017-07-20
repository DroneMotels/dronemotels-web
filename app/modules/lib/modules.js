import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

Modules = new Mongo.Collection('modules');
Modules.attachSchema(new SimpleSchema({
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
  visible: {
    type: Boolean,
    label: "Visible",
    optional:true
  },
  size_x: {
    type: Number,
    label: "Width (mm)",
    optional: true,
    min: 0
  },
  size_y: {
    type: Number,
    label: "Height (mm)",
    optional: true,
    min: 0
  },
  size_z: {
    type: Number,
    label: "Depth (mm)",
    optional: true,
    min: 0
  },
  dependencies: {
    type: Array,
    label: "Sub-modules (Contains other modules)",
    optional: true
  },
  'dependencies.$': {
    type: String
  },
  description: {
    type: String,
    label: "Description (markdown)",
    optional: true,
    max: 1000
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
