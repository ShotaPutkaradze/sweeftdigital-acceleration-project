/* eslint-disable react/prop-types */
import styles from "./CountryDetails.module.css";

function CountryDetails({
  selectedName,
  selectedShortName,
  selectedCapital,
  selectedCurrency,
  selectedRegion,
  selectedContinent,
  selectedPopulation,
  selectedBorders,
  selectedFlag,
}) {
  return (
    <div className={styles.country_detail_container}>
      <div className={styles.country_name}>
        <h1>{selectedName}</h1>
      </div>
      <div className={styles.country_data}>
        <div className={styles.country_details}>
          <label>Capital:</label>
          <p>{selectedCapital}</p>
        </div>
        <div className={styles.country_details}>
          <label>Currency:</label>
          <p>{selectedCurrency}</p>
        </div>
        <div className={styles.country_details}>
          <label>Region:</label>
          <p>{selectedRegion}</p>
        </div>
        <div className={styles.country_details}>
          <label>Continent:</label>
          <p>{selectedContinent}</p>
        </div>
        <div className={styles.country_details}>
          <label>Population:</label>
          <p>{selectedPopulation}</p>
        </div>
        <div className={styles.country_details}>
          <label>Borders:</label>
          <p>{selectedBorders}</p>
        </div>
      </div>
    </div>
  );
}

export default CountryDetails;
