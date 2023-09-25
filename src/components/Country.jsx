/* eslint-disable react/prop-types */
import styles from "./Country.module.css";

function Country({ country }) {
  return (
    <option className={styles.option} value={country}>
      {country}
    </option>
  );
}

export default Country;
