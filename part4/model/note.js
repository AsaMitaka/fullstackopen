const { Schema, model } = require('mongoose');

const noteSchema = new Schema({
  content: {
    type: String,
    minLength: 5,
    required: true,
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = model('Note', noteSchema);
