import { Component } from "react";
import { Form } from "react-bootstrap";
import { countries } from "countries-list";

const MIN = 3;

// TODO: create generic Autocomplete class

class CountryAutocomplete extends Component {
  state = {
    search: "",
    results: [],
  };

  constructor(props: any) {
    super(props);
    this.state = {
      search: "",
      results: [],
    };
  }

  isEnough = (x: string) => x.length >= MIN;

  filterCountries = (search: string): string[] => {
    if (!this.isEnough(search)) return [];

    let abbr: keyof typeof countries;

    const filtered = [];
    for (abbr in countries) {
      const country = countries[abbr];
      if (country.name.toLowerCase().includes(search)) filtered.push(`${abbr}: ${country.name}`);
    }

    return filtered;
  };

  handleChange = (e: any) => {
    e.preventDefault(); // prevent the default action

    const search = e.target.value;
    const results = this.filterCountries(search.toLowerCase());
    this.setState({ search, results });
  };

  render() {
    return (
      <div>
        <Form>
          <Form.Group>
            <Form.Control value={this.state.search} type="text" onChange={this.handleChange}></Form.Control>
          </Form.Group>
        </Form>
        <p>
          Search value: '{this.state.search}' (minimum of {MIN} characters)
        </p>
        {this.isEnough(this.state.search) ? (
          <p>
            <strong>Result(s): {this.state.results.length} </strong>
          </p>
        ) : (
          <div></div>
        )}

        {/** TODO: something prettier than this, as a component*/}
        {this.state.results.map((str, index) => (
          <p key={index}>{str}</p>
        ))}
      </div>
    );
  }
}

export default CountryAutocomplete;
