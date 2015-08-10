'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * <%= crud_name_upper %> Schema
 */
var <%= crud_name_upper %>Schema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  permissions: {
    type: Array
  },
  updated: {
    type: Array
  }
});

/**
 * Validations
 */
<%= crud_name_upper %>Schema.path('title').validate(function(title) {
  return !!title;
}, 'Title cannot be blank');

<%= crud_name_upper %>Schema.path('content').validate(function(content) {
  return !!content;
}, 'Content cannot be blank');

/**
 * Statics
 */
<%= crud_name_upper %>Schema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('<%= crud_name_upper %>', <%= crud_name_upper %>Schema);
