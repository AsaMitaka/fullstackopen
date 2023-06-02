import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './App.module.css';

const Country = ({ item }) => {
  const [country, setCountry] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get(
          `https://studies.cs.helsinki.fi/restcountries/api/name/${item}`,
        );
        const responseData = response.data;
        setCountry(responseData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError('Error');
      }
    };

    fetchCountry();
  }, []);

  return (
    <section className={styles.countryBlock}>
      {isError ? (
        <h2>Error</h2>
      ) : isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <div className={styles.country}>
          <div className={styles.countryLeft}>
            <h2>
              {country.region}, {country.capital}, {country.name.common}
            </h2>
            <p>
              Area: {country.area}, Population: {country.population}
            </p>
            {country.borders && <h4>Border Countries:</h4>}
            <ul className={styles.countryList}>
              {country.borders &&
                country.borders.map((item) => <li className={styles.countryListLi}>{item}</li>)}
            </ul>
          </div>
          <div className={styles.countryRight}>
            {country.flags && (
              <img alt={country.flags.alt} src={country.flags.png} className={styles.countryImg} />
            )}
          </div>
        </div>
      )}
    </section>
  );
};

const Filter = ({ setFilter, filter, handleCountryClick }) => {
  const handleFilterInput = (e) => {
    e.preventDefault();
    const value = e.target.value;

    setFilter(value);
    handleCountryClick();
  };

  return (
    <div>
      <label htmlFor="filterInput">Search Country</label>
      <input
        type="text"
        name="filterInput"
        value={filter}
        className="input"
        onChange={handleFilterInput}
      />
    </div>
  );
};

const CountriesList = ({ countries, handleCountryClick }) => {
  return countries.map((item, index) => (
    <div key={index}>
      {item.name.common} <button onClick={() => handleCountryClick(item.name.common)}>show</button>
    </div>
  ));
};

const App = () => {
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [isError, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://studies.cs.helsinki.fi/restcountries/api/all');
        const responseData = response.data;
        setCountries(responseData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    };

    fetchData();
  }, [countries]);

  const filteredCountries = filter
    ? countries.filter((item) => item.name.common.toLowerCase().includes(filter.toLowerCase()))
    : [];

  const handleCountryClick = (country) => {
    setCountry(country);
  };

  return (
    <div className={styles.wrapper}>
      {isError ? (
        <h2>Error</h2>
      ) : isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          <Filter filter={filter} setFilter={setFilter} handleCountryClick={handleCountryClick} />
          {country ? (
            <Country item={country} />
          ) : (
            <CountriesList handleCountryClick={handleCountryClick} countries={filteredCountries} />
          )}
        </div>
      )}
    </div>
  );
};

export default App;
