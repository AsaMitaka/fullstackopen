const express = require('express');
const route = express.Router();

const Files = require('../file');
const files = new Files();

route.get('/persons', async (req, res) => {
  try {
    const data = files.getData();

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

    const data = files.getData();
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


    const newId = Math.max(...data.filter(item => item.id))++;
    const newUser = {name: name, number: number, id: newId}
    const newData = [...data, newUser];
    files.saveData(newData);
    console.log(newData);
    res.status(200).json({message: 'Item successfully save to phonebook'})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

route.get('/persons/:id', async (req, res) => {
  try {
    const idx = parseInt(req.params.id);
    const data = files.getData();
    const item = data.find((item) => item.id === idx);

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
    const data = files.getData();
    const itemIndex = data.findIndex((item) => item.id === idx);

    if (itemIndex === -1) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }

    const newData = data.filter((item) => item.id !== idx);
    files.saveData(newData);

    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = route;
