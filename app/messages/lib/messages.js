import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

Messages = new Mongo.Collection('messages');
Messages.attachSchema(new SimpleSchema({
  owner: {
    type: String,
    label: "owner",
    max: 80,
    optional: false
  },
  to: {
    type: String,
    label: "to user",
    max: 80,
    optional: false
  },
  from: {
    type: String,
    label: "from user",
    max: 80,
    optional: false
  },
  content: {
    type: String,
    label: "Message Text (max 5000 characters)",
    optional: false,
    max: 5000
  },
  date_created: {
    type: Date,
    label: "Date Created",
    optional: false
  },
  related: {
    type: String,
    label: "related to",
    optional: true,
    max: 80
  },
  read: {
    type: Boolean,
    label: "read status",
    optional: true
  }
}))
