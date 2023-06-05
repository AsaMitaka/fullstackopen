const { model, Schema } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    unique: true,
  },
  name: String,
  password: {
    type: String,
    required: true,
  },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Note',
    },
  ],
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

userSchema.plugin(uniqueValidator);

module.exports = model('User', userSchema);
