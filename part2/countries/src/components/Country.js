export const Country = ({ countryName, countries }) => {
  const countryFlag = `${countries[0].flags.png}`;

  const { capital, area, languages } = countries[0];

  if (countries.length === 1) {
    console.log(countries);
    return (
      <div>
        <h1>{countryName}</h1>
        Capital: {capital}
        <br />
        Area: {area}
        <h3>Languages</h3>
        <ul>
          {Object.values(languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={countryFlag} alt={`${countries[0].flags.alt}`}></img>
        <h2>Weather in {capital}</h2>
      </div>
    );
  }

  return (
    <>
      <ul>
        <li>{countryName}</li>
      </ul>
    </>
  );
};
