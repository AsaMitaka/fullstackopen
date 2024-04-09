import { useEffect, useState } from 'react';
import services from './services';
import Person, { PersonProps } from './components/person';

const App = () => {
  const [persons, setPersons] = useState<PersonProps[]>([]);
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [filtered, setFiltered] = useState('');
  const [notification, setNotification] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const fetchedPersons = await services.getAll();
      setPersons(fetchedPersons);
    };

    getData();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setNotification('');
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [notification]);

  const handleDelete = async (id: number) => {
    setPersons((prevPersons) => prevPersons.filter((person) => person.id !== id));
    await services.delete(id);
    setNotification('deleted successfull');
    setIsError(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isName = persons.some((person) => person.name === newName);
    const isNumber = persons.some((person) => person.number === newPhoneNumber);

    if (isName || isNumber) return;

    const newId = persons.length > 0 ? persons[persons.length - 1].id + 1 : 1;
    const newUser: PersonProps = {
      name: newName,
      number: newPhoneNumber,
      id: newId,
    };

    await services.create(newUser);
    setPersons((prevPersons) => [...prevPersons, newUser]);
    setNewName('');
    setNewPhoneNumber('');
    setNotification('add successfull');
    setIsError(false);
  };

  const filteredPerson = filtered ? persons.filter((person) => person.name === filtered) : persons;

  return (
    <div>
      <div>
        filter shown with
        <input type="text" value={filtered} onChange={(e) => setFiltered(e.target.value)} />
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <label htmlFor="phonenumber">Phone:</label>
        <input
          type="text"
          name="phonenumber"
          value={newPhoneNumber}
          onChange={(e) => setNewPhoneNumber(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      {notification.length > 0 && (
        <div
          style={
            isError
              ? { color: 'red', border: '1px solid red' }
              : { color: 'green', border: '1px solid green' }
          }>
          {notification}
        </div>
      )}
      <ul>
        {filteredPerson.map((person) => (
          <Person key={person.id} {...person} handleDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
};

export default App;
