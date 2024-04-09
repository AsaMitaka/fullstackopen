const Country = ({ country }) => {
  console.log(country);
  return (
    <div>
      <h1>{country.name.common}</h1>
      <hr />
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <hr />
      <b>languages: </b>
      <ul>
        {Object.entries(country.languages).map(([code, name]) => (
          <li key={code}>
            <span>{name}</span> ({code})
          </li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
    </div>
  );
};

export default Country;
