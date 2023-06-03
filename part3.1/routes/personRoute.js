const express = require('express');
const route = express.Router();

const Person = require('../models/person');

route.get('/persons', async (req, res) => {
  try {
    const data = await Person.find();

    if (data.length === 0) {
      res.status(204).json({ message: 'Phonebook is empty' });
      return;
    }

    console.log(data);
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

route.post('/persons', async (req, res) => {
  try {
    const { name, number } = req.body;
    if (!name || !number) {
      res.status(400).json({ message: 'Name or number cant be empty' });
      return;
    }

    if (name.length < 3 || name.length > 12) {
      res.status(400).json({ message: 'Name length should be between 3 and 12 characters' });
      return;
    }

    if (number.length < 8 || number.length > 12) {
      res.status(400).json({ message: 'Number length should be between 8 and 12 characters' });
      return;
    }

    const data = await Person.find();
    const existingUser = data.filter((item) => item.name.toLowerCase() === name.toLowerCase());
    if (existingUser.length > 0) {
      res.status(400).json({ message: 'Name already exists' });
      return;
    }

    const existingNumber = data.filter((item) => item.number === number);
    if (existingNumber.length > 0) {
      res.status(400).json({ message: 'Number already exists' });
      return;
    }

    const newId = data.length > 0 ? Math.max(...data.map((item) => item.id)) + 1 : 1;
    const newUser = { name: name, number: number, id: newId };

    await Person.create(newUser);
    console.log(newUser);
    res.status(200).json({ message: 'Item successfully saved to phonebook' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

route.get('/persons/:id', async (req, res) => {
  try {
    const idx = parseInt(req.params.id);
    const item = await Person.findOne({ id: idx }).exec();

    if (!item) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }

    console.log(item);
    res.status(200).json({ item });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

route.delete('/persons/:id', async (req, res) => {
  try {
    const idx = parseInt(req.params.id);
    const item = await Person.findOneAndDelete({ id: idx });

    if (!item) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }

    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = route;
