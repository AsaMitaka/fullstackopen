import { useEffect, useState } from 'react';
import './App.css';
import services from './service';

const App = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [isLogin, setIsLogin] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (username.length < 3 || password.length < 3 || name.length < 3) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      return;
    }

    try {
      const userData = await services.register({ username, name, password });
      console.log(userData);

      window.localStorage.setItem('userData', JSON.stringify(userData));
      setUsername('');
      setName('');
      setPassword('');
      setUser(userData);
      services.setToken(userData.token);
    } catch (error) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userData = await services.login({ username, password });

      setUsername('');
      setName('');
      setPassword('');
      setUser(userData);
    } catch (error) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();

    setUser(null);
    window.localStorage.removeItem('userData');
  };

  useEffect(() => {
    const getData = async () => {
      const blogs = await services.getPost();
      setBlogs(blogs);
    };

    getData();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('userData');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      services.setToken(user.token);
    }
  }, []);

  return (
    <>
      <div>
        {user === null ? (
          isLogin ? (
            <form className="form" action="POST" onSubmit={handleLogin}>
              <label className="form__label" htmlFor="username">
                Username:
              </label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label className="form__label" htmlFor="password">
                Password:
              </label>
              <input
                type="text"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div>{errorMessage}</div>
              <button className="form__btn" type="submit">
                Login
              </button>
              <p>
                U dont have an account <button onClick={() => setIsLogin(true)}>register</button>
              </p>
            </form>
          ) : (
            <form className="form" action="POST" onSubmit={handleRegister}>
              <label className="form__label" htmlFor="username">
                Username:
              </label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label className="form__label" htmlFor="name">
                Name:
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label className="form__label" htmlFor="password">
                Password:
              </label>
              <input
                type="text"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div>{errorMessage}</div>
              <button className="form__btn" type="submit">
                Register
              </button>
              <p>
                U already have an account <button onClick={() => setIsLogin(true)}>login</button>
              </p>
            </form>
          )
        ) : (
          <div className="user">
            <h3>Username: {user.username}</h3>
            <h3>Name: {user.name}</h3>
            <button onClick={handleLogout}>logout</button>
            {blogs.length > 0 ? (
              <ul>
                {user.blogs.map((blog) => (
                  <li key={blog._id}>{blog.title}</li>
                ))}
              </ul>
            ) : (
              <div>Blogs is empty</div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default App;
