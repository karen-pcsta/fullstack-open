import { getAllCountries } from "./services/countries";
import { Form } from "./components/Form";
import { Country } from "./components/Country";
import { ErrorDisplay } from "./components/ErrorDisplay";
import { CountryList } from "./components/CountryList";

import { useEffect, useState } from "react";

function App() {
  const [newValue, setNewValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [searchedCountry, setSearchedCountry] = useState([]);
  const [display, setDisplay] = useState(false);
  const [countryId, setCountryId] = useState("");

  useEffect(() => {
    getAllCountries().then((response) => {
      setCountries(response.data);
    });
  }, []);

  function handleFormChange(e) {
    setNewValue(e.target.value);
    searchCountry();
    if (display) {
      setDisplay((previousValue) => !previousValue);
    }
  }

  function searchCountry() {
    const filteredCountryList = countries.filter((country) => {
      return country.name.common.toLowerCase().includes(newValue.toLowerCase());
    });
    setSearchedCountry(filteredCountryList);
  }

  function handleSubmit(e) {
    e.prevent.default();
  }

  function handleClick(id) {
    const selectedCountry = countries.find(
      (country) => country.name.common.toLowerCase() === id.toLowerCase()
    );
    return (
      <Country
        id={selectedCountry.name.common}
        status={display}
        countryName={selectedCountry.name.common}
        country={selectedCountry}
        countryId={countryId}
      />
    );
  }

  return (
    <div>
      <Form onSubmit={handleSubmit} value={newValue} onChange={handleFormChange} />
      {newValue.length !== 0 && searchedCountry.length > 10 ? (
        <ErrorDisplay />
      ) : searchedCountry.length > 1 && searchedCountry.length <= 10 && !display ? (
        searchedCountry.map((country) => (
          <CountryList
            key={country.name.common}
            countryName={country.name.common}
            showCountry={setDisplay}
            countryId={setCountryId}
          />
        ))
      ) : searchedCountry.length === 1 ? (
        <Country status={display} countryName={searchedCountry[0].name.common} country={searchedCountry[0]} />
      ) : (
        ""
      )}
      {display && handleClick(countryId)}
    </div>
  );
}

export default App;
