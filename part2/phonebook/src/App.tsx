import { useState } from 'react';

interface PersonFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  inputName: string;
  setInputName: (name: string) => void;
  inputPhoneNumber: string;
  setInputPhoneNumber: (phoneNumber: string) => void;
}

const PersonForm: React.FC<PersonFormProps> = ({
  handleSubmit,
  inputName,
  setInputName,
  inputPhoneNumber,
  setInputPhoneNumber,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        Name: <input type="text" value={inputName} onChange={(e) => setInputName(e.target.value)} />
      </div>
      <div>
        Phone number:
        <input
          type="text"
          value={inputPhoneNumber}
          onChange={(e) => setInputPhoneNumber(e.target.value)}
        />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

type Person = {
  id: number;
  name: string;
  number: string;
};

const PersonList: React.FC<{ persons: Person[] }> = ({ persons }) => {
  return (
    <ul>
      {persons.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}
        </li>
      ))}
    </ul>
  );
};

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => {
  return message && <p style={{ color: 'red' }}>{message}</p>;
};

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '830-322-42-12',
      id: 1,
    },
  ]);

  const [inputName, setInputName] = useState('');
  const [inputPhoneNumber, setInputPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isNameExists = persons.some((person) => person.name === inputName);
    const isNumberExists = persons.some((person) => person.number === inputPhoneNumber);

    if (isNameExists) {
      setErrorMessage('Name is already registered');
      return;
    }

    if (isNumberExists) {
      setErrorMessage('Phone number is already registered');
      return;
    }

    const newId = persons[persons.length - 1].id + 1;
    const newPerson = {
      name: inputName,
      number: inputPhoneNumber,
      id: newId + 1,
    };

    setPersons((prevPersons) => [...prevPersons, newPerson]);
    setInputName('');
    setInputPhoneNumber('');
    setErrorMessage('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        inputName={inputName}
        setInputName={setInputName}
        inputPhoneNumber={inputPhoneNumber}
        setInputPhoneNumber={setInputPhoneNumber}
      />
      <ErrorMessage message={errorMessage} />
      <h2>Numbers:</h2>
      <PersonList persons={persons} />
    </div>
  );
};

export default App;
