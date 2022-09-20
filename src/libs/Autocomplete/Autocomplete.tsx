import { Form, Stack } from "react-bootstrap";
import { useState, useEffect } from "react";
import ResultsHelper from "../ResultsHelper";
import SearchHelper from "../SearchHelper";

type AutocompleteHandler = (value: string) => void;

interface AutocompleteProps {
  input: AutocompleteInputData[];
  min_len?: number;
  handler?: AutocompleteHandler | null;
}

export interface AutocompleteInputData {
  key: string;
  val: string;
}

export default function Autocomplete({ input = [], min_len = 0, handler = null }: AutocompleteProps) {
  const matches = (data: AutocompleteInputData, val: string) =>
    data.key.toLowerCase().includes(val.toLowerCase()) || data.val.toLowerCase().includes(val.toLowerCase());

  const FilterInputs = (val: string, min: number, input: AutocompleteInputData[]) => {
    const [filtered, setFiltered] = useState<AutocompleteInputData[]>([]);

    useEffect(() => {
      if (!val) {
        if (min) return setFiltered([]);
        return setFiltered(input);
      }

      if (min && val.length < min) return setFiltered([]);
      return setFiltered(input.filter((x: AutocompleteInputData) => matches(x, val)));
    }, [val, min, input]);

    return filtered;
  };

  const itemClicked = (data: AutocompleteInputData) => {
    if (handler) handler(data.key);
    else setSearchVal(data.val);
  };

  const [searchVal, setSearchVal] = useState("");
  const filtered = FilterInputs(searchVal, min_len, input);

  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Control value={searchVal} type="text" onChange={(e) => setSearchVal(e.target.value)}></Form.Control>
        </Form.Group>
      </Form>

      <SearchHelper value={searchVal} min_len={min_len}></SearchHelper>
      <ResultsHelper value={searchVal} min_len={min_len} list_len={filtered.length}></ResultsHelper>

      <Stack gap={3}>
        {filtered.map((data, key) => (
          <div key={key} className="bg-light border" onClick={() => itemClicked(data)}>
            {data.val}
          </div>
        ))}
      </Stack>
    </div>
  );
}
