const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/api/persons', (req, res) => {
  fs.readFile('db.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading db.json:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    const parseData = JSON.parse(data);
    res.json(parseData);
  });
});

app.get('/api/persons/:id', (req, res) => {
  const { id } = req.params;
  console.log('User id: ', id);

  fs.readFile('db.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading db.json:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    const parsedData = JSON.parse(data);
    const isUser = parsedData.find((person) => {
      console.log(person);

      return person.id === +id;
    });

    if (!isUser) {
      return res.json({ message: 'User is not found' });
    }
    console.log('User', isUser);
    res.json(isUser);
  });
});

app.delete('/api/persons/:id', (req, res) => {
  const { id } = req.params;

  fs.readFile('db.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading db.json:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    const parsedData = JSON.parse(data);
    const isUser = parsedData.find((person) => person.id === +id);

    if (!isUser) {
      return res.json({ message: 'User is not found' });
    }

    const newUserList = parsedData.filter((person) => person.id !== +id);

    fs.writeFile('db.json', JSON.stringify(newUserList, null, 2), (err) => {
      if (err) {
        console.error('Error writing to db.json:', err);
        res.status(500).send('Internal Server Error');
        return;
      }

      res.json(isUser);
    });
  });
});

app.post('/api/persons', (req, res) => {
  const newPerson = req.body;

  if (!newPerson.name || !newPerson.number) {
    return res.status(400).json({ message: 'Name or number is missing' });
  }

  fs.readFile('db.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading db.json:', err);
      return res.status(500).send('Internal Server Error');
    }

    const parsedData = JSON.parse(data);

    const isDuplicate = parsedData.some((person) => person.name === newPerson.name);
    if (isDuplicate) {
      return res.status(400).json({ message: 'Name already exists in the phonebook' });
    }

    const newData = [...parsedData, newPerson];

    fs.writeFile('db.json', JSON.stringify(newData, null, 2), (err) => {
      if (err) {
        console.error('Error writing to db.json:', err);
        return res.status(500).send('Internal Server Error');
      }

      res.json(newData);
    });
  });
});

app.get('/api/info', (req, res) => {
  fs.readFile('db.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading db.json:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.send(data);
  });
});

app.listen(port, () => {
  console.log('Listening on port ' + port);
});
