import { Weather } from "./Weather";

export const Country = ({ countryName, country }) => {
  const countryFlag = `${country.flags.png}`;
  const { capital, area, languages } = country;

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
      <img src={countryFlag} alt={`${country.flags.alt}`}></img>
      <h2>Weather in {capital}</h2>
      <Weather capital={capital} />
    </div>
  );
};
