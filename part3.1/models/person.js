const { model, Schema } = require('mongoose');

const PersonSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  number: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = model('Person', PersonSchema);
