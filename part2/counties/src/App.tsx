import { useEffect, useState } from 'react';
import services from './services';
import Countries from './components/countries';
import Country from './components/country';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    const getData = async () => {
      const fetchedCountries = await services.getCountries();
      setCountries(fetchedCountries);
    };

    getData();
  }, []);

  const filteredCountries = countries.filter((country) => {
    const countryName = country.name.common.toLowerCase();
    const filter = filterName.toLowerCase();
    return countryName.includes(filter);
  });

  const renderCountries =
    filterName.length > 0 ? (
      filteredCountries.length > 0 ? (
        filteredCountries.length === 1 ? (
          <Country country={filteredCountries[0]} />
        ) : filteredCountries.length > 10 ? (
          `Found ${filteredCountries.length} countries. Specify another filter.`
        ) : (
          <Countries countries={filteredCountries} />
        )
      ) : (
        'No countries found.'
      )
    ) : (
      <Countries countries={countries} />
    );

  return (
    <>
      <label htmlFor="findcountries">Find countries:</label>
      <input
        id="findcountries"
        type="text"
        value={filterName}
        onChange={(e) => setFilterName(e.target.value)}
      />
      <div>{renderCountries}</div>
    </>
  );
};

export default App;
