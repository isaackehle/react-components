import { Form, Stack } from "react-bootstrap";
import { useState, useEffect } from "react";
import ResultsHelper from "./ResultsHelper";
import SearchHelper from "./SearchHelper";

type AutocompleteHandler = (value: string) => void;

interface AutocompleteProps {
  input: string[];
  min_search_len?: number;
  handler?: AutocompleteHandler | null;
}

export default function Autocomplete({ input = [], min_search_len = 0, handler = null }: AutocompleteProps) {
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

  // const [filtered, setFiltered] = useState<string[]>([]);
  const [searchVal, setSearchVal] = useState("");

  const onListItemClick = (value: string) => setSearchVal(value);

  const onSearchChange = (e: any) => setSearchVal(e.target.value);

  const filtered = FilterInputs(searchVal, min_search_len, input);

  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Control value={searchVal} type="text" onChange={onSearchChange}></Form.Control>
        </Form.Group>
      </Form>

      <SearchHelper value={searchVal} min_search_len={min_search_len}></SearchHelper>
      <ResultsHelper value={searchVal} min={min_search_len} list={filtered}></ResultsHelper>

      <Stack gap={3}>
        {filtered.map((str, key) => (
          <div key={key} className="bg-light border" onClick={() => onListItemClick(str)}>
            {str}
          </div>
        ))}
      </Stack>
    </div>
  );
}
