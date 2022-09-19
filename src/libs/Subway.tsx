import { useState } from "react";
import { Col, Container, Row, Stack } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Autocomplete from "./Autocomplete";

interface TrainStation {
  id: string;
  location: number[];
  name: string;
  stops: any;
}

interface StationArrival {
  route: string;
  time: string;
}

interface StationArrivalPerDirection extends StationArrival {
  dir: "N" | "S";
}

interface StationArrivalData {
  routes: string[];
  N: StationArrival[];
  S: StationArrival[];
  id: string;
  last_update: string;
  location: any;
  name: string;
  stops: any[];
}

interface StationArrivalResponse {
  data: StationArrivalData[];
  updated: string;
}

export default function Subway() {
  const [trainStations, setTrainStationList] = useState<TrainStation[]>([]);
  const [stationNames, setStationNames] = useState<string[]>([]);
  const [stationArrivalTimes, setStationArrivalTimes] = useState<StationArrivalPerDirection[]>([]);

  const getTrainStations = async () => {
    const data = await fetch("https://raw.githubusercontent.com/jonthornton/MTAPI/master/data/stations.json", { method: "GET" });
    const json = await data.json();

    const stations = Object.keys(json).reduce((accum, key) => {
      const k = key as keyof typeof json;
      const station = json[k];
      accum.push(station);
      return accum;
    }, [] as TrainStation[]);

    console.log(stations);

    setTrainStationList(stations);

    setStationNames(stations.map((station) => station.name));
  };

  const stationClicked = (value: string) => {
    console.log(value);

    const station = trainStations.find((x) => x.name === value);
    if (station) showArrivalTimes(station);
  };

  const showArrivalTimes = async (station: TrainStation) => {
    console.log(station.id);

    const data = await fetch(`https://api.wheresthefuckingtrain.com/by-id/${station.id}`, { method: "GET" });
    const json: StationArrivalResponse = await data.json();

    const arrivalTimes: StationArrivalPerDirection[] = json.data.reduce((accum, d) => {
      const times: StationArrivalPerDirection[] = [];

      for (const x of d.N) {
        const time: StationArrivalPerDirection = { ...x, dir: "N" };
        times.push(time);
      }
      for (const x of d.S) {
        const time: StationArrivalPerDirection = { ...x, dir: "S" };
        times.push(time);
      }

      accum.push(...times);

      return accum;
    }, [] as StationArrivalPerDirection[]);

    // console.log({ arrivalTimes });
    setStationArrivalTimes(arrivalTimes);
  };

  return (
    <div>
      <Container fluid>
        <Row>
          <Col xs={12}>
            <Button variant="primary" onClick={getTrainStations}>
              Get Trains
            </Button>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <Autocomplete input={stationNames} min_len={0} handler={stationClicked}></Autocomplete>
          </Col>

          {/* <Col xs={6}>
            <Stack gap={3}>
              {trainStations.map((station, key) => (
                <div key={key} className="bg-light border" onClick={() => showArrivalTimes(station)}>
                  {station.name}
                </div>
              ))}
            </Stack>
          </Col> */}
          <Col xs={6}>
            <Stack gap={3}>
              {stationArrivalTimes.map((arrivalTime, key) => (
                <div key={key} className="bg-light border">
                  {arrivalTime.dir}: [{arrivalTime.route}] {arrivalTime.time}
                </div>
              ))}
            </Stack>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

// const FilterInputs = (val: string, min: number, input: string[]) => {
//   const [filtered, setFiltered] = useState<string[]>([]);

//   useEffect(() => {
//     if (!val) {
//       if (min) return setFiltered([]);
//       return setFiltered(input);
//     }

//     if (min && val.length < min) return setFiltered([]);
//     return setFiltered(input.filter((str: string) => str.toLowerCase().includes(val.toLowerCase())));
//   }, [val, min, input]);

//   return filtered;
// };

// const [searchVal, setSearchVal] = useState("");
// const filtered = FilterInputs(searchVal, min_len, input);
