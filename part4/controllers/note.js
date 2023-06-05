const Note = require('../model/note');

const getNote = async (req, res) => {
  const notes = await Note.find({}).populate('user', { username: 1, name: 1 });
  res.json(notes.map((blog) => blog.toJSON()));
};

const postNote = async (req, res) => {
  const body = req.body;
  const user = req.user;

  const note = new Note({
    content: body.content,
    user: user.id,
  });

  const savedNote = await note.save();
  user.notes = user.notes.concat(savedNote._id);
  await user.save();

  res.json(savedNote);
};

module.exports = { getNote, postNote };
