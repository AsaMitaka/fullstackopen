import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_USERS, GET_ONE_USER } from './query/user';
import { CREATE_USER } from './mutations/user';

const App = () => {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS, { pollInterval: 5000 });
  const { data: oneUser, loading: loadingOneUser } = useQuery(GET_ONE_USER, {
    variables: {
      id: '1',
    },
  });

  console.log(oneUser);

  const [newUser] = useMutation(CREATE_USER);
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [age, setAge] = useState(12);

  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers);
    }
  }, [data]);

  const addUser = (e) => {
    e.preventDefault();

    if (username.length === 0) return;
    if (age.length <= 0) return;

    newUser({
      variables: {
        input: {
          username: username,
          age: age,
        },
      },
    }).then(({ data }) => {
      console.log(data);
      setUsername('');
      setAge(0);
    });
  };

  const getAll = (e) => {
    e.preventDefault();
    refetch();
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h2>Error</h2>;
  }

  return (
    <>
      <div>
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '300px',
            gap: '5px',
            marginBottom: '10px',
          }}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="age">Age: </label>
          <input type="number" name="age" value={age} onChange={(e) => setAge(e.target.value)} />

          <button onClick={(e) => addUser(e)}>Add</button>
          <button onClick={(e) => getAll(e)}>Get</button>
        </form>
        <div>
          {users.length > 0 &&
            users.map((user) => (
              <div key={user.id}>
                ID: {user.id} USERNAME: {user.username} AGE: {user.age}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default App;
