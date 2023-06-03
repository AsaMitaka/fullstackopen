const fs = require('fs');

class Files {
  getData = () => {
    const data = fs.readFileSync('data.json');
    return JSON.parse(data);
  };

  saveData = (data) => {
    fs.writeFileSync('data.json', JSON.stringify(data));
  };
}

module.exports = Files;
