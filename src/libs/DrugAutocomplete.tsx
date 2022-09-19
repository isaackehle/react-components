import Autocomplete, { AutocompleteInputData } from "./Autocomplete";

const drugs = [
  "Abreva",
  "Acetaminophen",
  "Accolate",
  "Accuneb",
  "Accupril",
  "Accutane",
  "Claritin",
  "Hepatitis B Vaccine",
  "Ibuprofen",
  "Loratadine",
  "Simethicone",
  "Tylenol",
  "Tylenol PM",
  "Tylenox",
];

export default function DrugAutocomplete() {
  const buildInputData = (): AutocompleteInputData[] =>
    drugs.map((drug) => {
      const data: AutocompleteInputData = { key: drug, val: drug };
      return data;
    });

  return (
    <div>
      <Autocomplete input={buildInputData()}></Autocomplete>
    </div>
  );
}
