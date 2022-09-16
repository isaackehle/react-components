import { Form, Stack } from "react-bootstrap";
import { useState, useEffect } from "react";
import ResultsHelper from "./ResultsHelper";
import SearchHelper from "./SearchHelper";

type AutocompleteHandler = (value: string) => void;

interface AutocompleteProps {
  input: string[];
  min_len?: number;
  handler?: AutocompleteHandler | null;
}

export default function Autocomplete({ input = [], min_len = 0, handler = null }: AutocompleteProps) {
  const FilterInputs = (val: string, min: number, input: string[]) => {
    const [filtered, setFiltered] = useState<string[]>([]);

    useEffect(() => {
      if (!val) {
        if (min) return setFiltered([]);
        return setFiltered(input);
      }

      if (min && val.length < min) return setFiltered([]);
      return setFiltered(input.filter((str: string) => str.toLowerCase().includes(val.toLowerCase())));
    }, [val, min, input]);

    return filtered;
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
      <ResultsHelper value={searchVal} min_len={min_len} list={filtered}></ResultsHelper>

      <Stack gap={3}>
        {filtered.map((str, key) => (
          <div key={key} className="bg-light border" onClick={() => setSearchVal(str)}>
            {str}
          </div>
        ))}
      </Stack>
    </div>
  );
}
