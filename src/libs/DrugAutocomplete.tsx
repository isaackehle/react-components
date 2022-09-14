import Autocomplete from "./Autocomplete";

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
  return (
    <div>
      <Autocomplete input={drugs}></Autocomplete>
    </div>
  );
}
