import { Button } from "./Button";

export const CountryList = ({ countryName, showCountry, countryId }) => {
  return (
    <>
      <ul>
        <li key={countryName}>
          {countryName} <Button id={countryName} showCountry={showCountry} countryId={countryId} />
        </li>
      </ul>
    </>
  );
};
