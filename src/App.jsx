import { useEffect, useReducer } from "react";
import styles from "./App.module.css";
import useGeolocation from "./components/useGeolocation";
import Country from "./components/Country";
import CountryDetails from "./components/CountryDetails";

//api keys
const GEOCODINGAPI = "AIzaSyBe-c4f-7D49LjlflBXc_10uIYWuL-ere8";

//initial state
const initialState = {
  currentlatlng: null,

  //only choosen country data
  selectedCountry: {
    selectedName: null,
    selectedShortName: null,
    selectedCapital: null,
    selectedCurrency: null,
    selectedRegion: null,
    selectedContinent: null,
    selectedPopulation: null,
    selectedBorders: null,
    selectedFlag: null,
  },
  //selected country index from country list array
  countryIndex: null,
  //all countries data
  countries: {
    countryNames: [],
    countryShortNames: [],
    capitals: [],
    currencys: [],
    regions: [],
    continents: [],
    populations: [],
    borders: [],
    flags: [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "currentPosition":
      return {
        ...state,
        currentlatlng: action.payload,
      };
    case "selectCountry": {
      return {
        ...state,
        selectedCountry: {
          selectedName: action.payload,
          selectedShortName: "",
          selectedCapital: "",
          selectedCurrency: "",
          selectedRegion: "",
          selectedContinent: "",
          selectedPopulation: "",
          selectedBorders: "",
          selectedFlag: "",
        },
      };
    }
    case "countries":
      return {
        ...state,
        countries: {
          countryNames: [...action.payload.tempName],
          countryShortNames: [...action.payload.tempShortName],
          capitals: [...action.payload.tempCapital],
          currencys: [...action.payload.tempCurrency],
          regions: [...action.payload.tempRegion],
          continents: [...action.payload.tempContinent],
          populations: [...action.payload.tempPopulation],
          borders: [...action.payload.tempBorders],
          flags: [...action.payload.tempFlag],
        },
      };

    case "setSelectedCountryIndex":
      console.log(action.payload);
      return {
        ...state,
        countryIndex: action.payload,
      };
    default:
      throw new Error("Unknown status");
  }
}

function App() {
  const [
    {
      currentlatlng,
      selectedCountry: {
        selectedName,
        selectedShortName,
        selectedCapital,
        selectedCurrency,
        selectedRegion,
        selectedContinent,
        selectedPopulation,
        selectedBorders,
        selectedFlag,
      },
      countries: {
        countryNames,
        countryShortNames,
        capitals,
        currencys,
        regions,
        continents,
        populations,
        borders,
        flags,
      },
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const { getPosition } = useGeolocation();

  //set currentPosition
  useEffect(function () {
    function handleLocation() {
      getPosition(dispatch);
    }
    handleLocation();
  }, []);

  //set country list
  useEffect(function () {
    async function getCountryList() {
      if (countryNames) {
        const tempName = [];
        const tempShortName = [];
        const tempCapital = [];
        const tempCurrency = [];
        const tempRegion = [];
        const tempContinent = [];
        const tempPopulation = [];
        const tempBorders = [];
        const tempFlag = [];
        try {
          const res = await fetch(`https://restcountries.com/v3.1/all`);
          const data = await res.json();

          data.map((country) => {
            tempName.push(country.name.common);
            tempShortName.push(country.cca3);
            tempCapital.push(country.capital);
            tempCurrency.push(country.currencies);
            tempRegion.push(country.region);
            tempContinent.push(country.continents);
            tempPopulation.push(country.population);
            tempBorders.push(country.borders);
            tempFlag.push(country.flags.svg);
          });

          dispatch({
            type: "countries",
            payload: {
              tempName,
              tempShortName,
              tempCapital,
              tempCurrency,
              tempRegion,
              tempContinent,
              tempPopulation,
              tempBorders,
              tempFlag,
            },
          });
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
          }
        }
      }
    }
    getCountryList();
  }, []);

  //set currect country
  useEffect(
    function () {
      async function getCurrentCountry() {
        if (currentlatlng !== null) {
          try {
            const res = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${currentlatlng}&result_type=country&key=${GEOCODINGAPI}`
            );
            const data = await res.json();
            dispatch({
              type: "selectCountry",
              payload: data.results[0].formatted_address,
            });
          } catch (err) {
            if (err.name !== "AbortError") {
              console.log(err.message);
            }
          }
        }
      }
      getCurrentCountry();
    },
    [currentlatlng]
  );

  useEffect(
    function () {
      dispatch({
        type: "setSelectedCountryIndex",
        payload: countryNames.indexOf(selectedName),
      });
    },
    [countryNames, selectedName]
  );

  function handleCountryChange(e) {
    dispatch({
      type: "selectCountry",
      payload: e,
    });
  }

  return (
    <div className={styles.main_container}>
      <div className={styles.country_List_container}>
        <select
          className={styles.country_list}
          onChange={(e) => handleCountryChange(e.target.value)}
          value={selectedName ? selectedName : "default"}
        >
          <option value="default" disabled hidden>
            Choose Your Country
          </option>
          {countryNames &&
            countryNames.map((country, index) => (
              <Country country={country} key={index} />
            ))}
        </select>
      </div>

      <CountryDetails
        selectedName={selectedName}
        selectedShortName={selectedShortName}
        selectedCapital={selectedCapital}
        selectedCurrency={selectedCurrency}
        selectedRegion={selectedRegion}
        selectedContinent={selectedContinent}
        selectedPopulation={selectedPopulation}
        selectedBorders={selectedBorders}
        selectedFlag={selectedFlag}
      />
    </div>
  );
}

export default App;
