const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let scoreModel = {};

// mongoose.Types.ObjectID is a function that
// converts string ID to real mongo ID
const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const scoreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trime: true,
    set: setName,
  },
  age: {
    type: Number,
    min: 0,
    required: true,
  },
  level: {
    type: Number,
    min: 1,
    required: true,
    default: 1,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdData: {
    type: Date,
    default: Date.now,
  },
});

DomoSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  age: doc.age,
  level: doc.level,
});

scoreSchema.statics.findAll = (callback) => {

  return scoreModel.find().select('team score streak').exec(callback);
};

scoreModel = mongoose.model('Score', scoreSchema);

module.exports.scoreModel = scoreModel;
module.exports.scoreSchema = scoreSchema;