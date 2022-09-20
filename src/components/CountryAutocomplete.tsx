import { countries } from "countries-list";
import { Autocomplete, AutocompleteInputData } from "../libs";

const MIN_LEN = 3;

export default function CountryAutocomplete() {
  const countriesToData = (): AutocompleteInputData[] => {
    return Object.keys(countries).reduce((accum, abbr) => {
      const key = abbr as keyof typeof countries;
      const country = countries[key];
      const data: AutocompleteInputData = { key, val: `${key}: ${country.name}` };
      accum.push(data);
      return accum;
    }, [] as AutocompleteInputData[]);
  };

  // const filteredCountries = (search?: string) => {};

  return (
    <div>
      <Autocomplete min_len={MIN_LEN} input={countriesToData()}></Autocomplete>
    </div>
  );
}
