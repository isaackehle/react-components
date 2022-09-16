import { countries } from "countries-list";
import Autocomplete from "./Autocomplete";

const MIN_LEN = 3;

export default function CountryAutocomplete() {
  const countriesToStrings = (): string[] => {
    return Object.keys(countries).reduce((accum, abbr) => {
      const key = abbr as keyof typeof countries;
      const country = countries[key];
      accum.push(`${key}: ${country.name}`);
      return accum;
    }, [] as string[]);
  };

  // const filteredCountries = (search?: string) => {};

  return (
    <div>
      <Autocomplete min_len={MIN_LEN} input={countriesToStrings()}></Autocomplete>
    </div>
  );
}
