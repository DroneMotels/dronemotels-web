import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

Comments = new Mongo.Collection('comments');
Comments.attachSchema(new SimpleSchema({
  postId: {
    type: String,
    label: "postId",
    max: 80,
    optional: false
  },
  owner: {
    type: String,
    label: "Owner",
    optional: false
  },
  text: {
    type: String,
    label: "Comment Text (max 512 characters)",
    optional: false,
    max: 512
  },
  date_created: {
    type: Date,
    label: "Date Created",
    optional: false
  },
  date_edited: {
    type: Date,
    label: "Date Edited",
    optional: false
  },
  flags: {
    type: Number,
    label: "Flags counter",
    optional: true
  }
}));
