const Countries = ({ countries }) => {
  return (
    <ul>
      {countries.map((country) => (
        <div key={`${country.area} ${country.name.common}`}>{country.name.common}</div>
      ))}
    </ul>
  );
};

export default Countries;
