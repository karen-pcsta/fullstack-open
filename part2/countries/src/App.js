import { getAll } from "./services/countries";
import { Form } from "./components/Form";
import { Country } from "./components/Country";
import { ErrorDisplay } from "./components/ErrorDisplay";
import { useEffect, useState } from "react";

function App() {
  const [newValue, setNewValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [searchedCountry, setSearchedCountry] = useState([]);

  useEffect(() => {
    getAll().then((response) => {
      setCountries(response.data);
    });
  }, [searchedCountry]);

  function handleFormChange(e) {
    setNewValue(e.target.value);
    searchCountry();
  }

  function searchCountry() {
    const filteredCountryList = countries.filter((country) => {
      return country.name.common.toLowerCase().includes(newValue.toLowerCase());
    });
    console.log(filteredCountryList);
    setSearchedCountry(filteredCountryList);
  }

  function handleSubmit(e) {
    e.prevent.default();
  }

  return (
    <div>
      <Form onSubmit={handleSubmit} value={newValue} onChange={handleFormChange} />;
      {searchedCountry.length > 10 ? (
        <ErrorDisplay />
      ) : searchedCountry.length >= 1 && searchedCountry.length <= 10 ? (
        searchedCountry.map((country) => (
          <Country key={country.name.common} countryName={country.name.common} countries={searchedCountry} />
        ))
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
