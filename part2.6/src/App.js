import { useState } from 'react';

const Filter = ({ filter, setFilter }) => {
  const handleFilter = (e) => {
    const value = e.target.value;

    setFilter(value);
  };

  return (
    <div>
      <label htmlFor="filter">
        Filter:
        <input
          name="filter"
          type="text"
          value={filter}
          onChange={(e) => handleFilter(e)}
          placeholder="filter by name"
        />
      </label>
    </div>
  );
};

const PersonForm = ({ personData, setPersonData }) => {
  const [isError, setError] = useState('');
  const [newPerson, setNewPerson] = useState({ name: '', number: '' });

  const handlePerson = (e, type) => {
    const value = e.target.value;

    setNewPerson((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPerson.name || !newPerson.number) {
      setError('Name and Number must be filled');
      return;
    }

    if (!(newPerson.name.length >= 3 && newPerson.name.length <= 10)) {
      setError('Name length must be more than or equal to 3 and less than or equal to 10');
      return;
    }

    if (!(newPerson.number.length >= 8 && newPerson.number.length <= 10)) {
      setError('Number length must be more than or equal to 8 and less than or equal to 10');
      return;
    }

    const isValidName = !personData.some((item) => item.name === newPerson.name);
    const isValidNumber = !personData.some((item) => item.number === newPerson.number);

    if (isValidName && isValidNumber) {
      setPersonData((prev) => [...prev, newPerson]);
      setNewPerson({ name: '', number: '' });
      setError('');
    } else {
      setError('Name or Number already exists');
    }
  };

  return (
    <form action="submit" onSubmit={handleSubmit}>
      {isError ? <h2>{isError}</h2> : null}
      <input
        type="text"
        placeholder="Name"
        value={newPerson.name}
        onChange={(e) => handlePerson(e, 'name')}
      />
      <input
        type="number"
        placeholder="Number"
        value={newPerson.number}
        onChange={(e) => handlePerson(e, 'number')}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

const Persons = ({ personData }) => {
  return personData.map((item) => (
    <div key={item.id}>
      {item.name} {item.number}
    </div>
  ));
};

const App = () => {
  const [filter, setFilter] = useState('');
  const [personData, setPersonData] = useState([{ name: 'Ihor', number: '11-12-334455', id: 1 }]);

  const filterPersonData =
    filter.length === 0
      ? personData
      : personData.filter((item) => item.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter setFilter={setFilter} />

      <h3>Add a new</h3>

      <PersonForm personData={personData} setPersonData={setPersonData} />

      <h3>Numbers</h3>

      <Persons personData={filterPersonData} />
    </div>
  );
};

export default App;
