import axios from 'axios';
import styles from './App.module.css';
import { useEffect, useState } from 'react';

const Filter = ({ filter, setFilter }) => {
  const handleFilter = (e) => {
    const value = e.target.value;

    setFilter(value);
  };

  return (
    <div className={styles.inputRow}>
      <label htmlFor="filter" className={styles.label}>
        Filter:
      </label>
      <input
        className={styles.input}
        name="filter"
        type="text"
        value={filter}
        onChange={(e) => handleFilter(e)}
        placeholder="filter by name"
      />
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

  const handleSubmit = async (e) => {
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

    const isValidPerson = !personData.some(
      (item) => item.name === newPerson.name && item.number === newPerson.number,
    );

    if (isValidPerson) {
      const existingPerson = personData.find((item) => item.name === newPerson.name);

      if (existingPerson) {
        await axios.put(`http://localhost:3001/persons/${existingPerson.id}`, newPerson);

        setPersonData((prev) => {
          const updatedData = prev.map((item) => {
            if (item.id === existingPerson.id) {
              return newPerson;
            }
            return item;
          });
          return updatedData;
        });
      } else {
        await axios.post('http://localhost:3001/persons', newPerson);

        setPersonData((prev) => [...prev, newPerson]);
      }

      setNewPerson({ name: '', number: '' });
      setError('');
    } else {
      setError('Name or Number already exists');
    }
  };

  return (
    <form action="submit" onSubmit={handleSubmit}>
      {isError ? <h2>{isError}</h2> : null}
      <div className={styles.inputRow}>
        <label htmlFor="name" className={styles.label}>
          Name:
        </label>
        <input
          type="text"
          className={styles.input}
          name="name"
          placeholder="Name"
          value={newPerson.name}
          onChange={(e) => handlePerson(e, 'name')}
        />
      </div>
      <div className={styles.inputRow}>
        <label htmlFor="number" className={styles.label}>
          Number:
        </label>
        <input
          type="number"
          className={styles.input}
          name="number"
          placeholder="Number"
          value={newPerson.number}
          onChange={(e) => handlePerson(e, 'number')}
        />
      </div>
      <button type="submit" className={styles.btn}>
        Submit
      </button>
    </form>
  );
};

const Persons = ({ personData, setPersonData }) => {
  const deleteData = async (idx) => {
    try {
      await axios.delete(`http://localhost:3001/persons/${idx}`);
    } catch (error) {
      console.log(error);
    }
  };

  const personDeleteData = (idx) => {
    const filteredData = personData.filter((item) => item.id !== idx);
    deleteData(idx);
    setPersonData(filteredData);
  };

  return personData.map((item) => (
    <div key={item.id} className={styles.personBlock}>
      <p className={styles.personBlockP}>
        {item.name} {item.number}
      </p>
      <button onClick={() => personDeleteData(item.id)} className={styles.btn}>
        delete
      </button>
    </div>
  ));
};

const App = () => {
  const [filter, setFilter] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(null);
  const [personData, setPersonData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/persons');
        setLoading(false);
        setPersonData(response.data);
      } catch (error) {
        setLoading(false);
        setError('Error Loading');
      }
    };
    fetchData();
  }, []);

  const filterPersonData =
    filter.length === 0
      ? personData
      : personData.filter((item) => item.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      {isError ? (
        <h2>{isError}</h2>
      ) : isLoading ? (
        <h1>Loading</h1>
      ) : (
        <>
          <h2>Phonebook</h2>

          <Filter setFilter={setFilter} />

          <h3>Add a new</h3>

          <PersonForm personData={personData} setPersonData={setPersonData} />

          <h3>Numbers</h3>

          <Persons personData={filterPersonData} setPersonData={setPersonData} />
        </>
      )}
    </div>
  );
};

export default App;
