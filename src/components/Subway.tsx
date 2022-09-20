import { useState } from "react";
import { Col, Container, Row, Stack } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Autocomplete, AutocompleteInputData, SimpleMap, MapLocation } from "../libs";

interface TrainStation {
  id: string;
  location: number[];
  name: string;
  stops: any;
}

interface SelectedTrainStation {
  id: string;
  location: MapLocation;
  name: string;
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
  const [selectedStation, setSelectedStation] = useState<SelectedTrainStation>();
  const [trainStations, setTrainStations] = useState<TrainStation[]>([]);
  const [stationList, setStationList] = useState<AutocompleteInputData[]>([]);
  const [stationArrivalTimes, setStationArrivalTimes] = useState<StationArrivalPerDirection[]>([]);

  const getTrainStations = async () => {
    const data = await fetch("https://raw.githubusercontent.com/jonthornton/MTAPI/master/data/stations.json", { method: "GET" });
    const json = await data.json();

    const stations = Object.keys(json)
      .reduce((accum, key) => {
        const k = key as keyof typeof json;
        return accum.concat(json[k]);
      }, [] as TrainStation[])
      .sort((a, b) => (a.name > b.name ? 1 : -1));

    setTrainStations(stations);

    setStationList(stations.map((station) => ({ key: station.id, val: `[id: 0x${station.id}] ${station.name}` })));
  };

  const stationSelected = (id: string) => {
    const station = trainStations.find((x) => x.id === id);
    if (station) {
      setSelectedStation({
        id: station.id,
        name: station.name,
        location: { lat: station.location[0], lng: station.location[1], address: station.name },
      });
      showArrivalTimes(station);
    }
  };

  const showArrivalTimes = async (station: TrainStation) => {
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

    setStationArrivalTimes(arrivalTimes);
  };

  return (
    <div>
      <Container fluid>
        <Row>
          <Col xs={6}>
            <Container fluid>
              <Row>
                <Col xs={12}>
                  <Button variant="primary" onClick={getTrainStations}>
                    Get Trains
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <Autocomplete input={stationList} min_len={0} handler={stationSelected}></Autocomplete>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col xs={6}>
            {selectedStation && (
              <Container fluid>
                <Row>
                  <Col>
                    <strong>Station Name:</strong> {selectedStation.name}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <strong>0x{selectedStation.id}</strong>
                  </Col>
                </Row>
                <Row>
                  <Col>latitude: {selectedStation.location.lat}</Col>
                  <Col>longitude: {selectedStation.location.lng}</Col>
                </Row>
                <Row>
                  <Col>
                    <SimpleMap location={selectedStation.location} zoomLevel={14}></SimpleMap>
                  </Col>
                </Row>
                <Row>
                  <Stack gap={3}>
                    {stationArrivalTimes.map((arrivalTime, key) => (
                      <div key={key} className="bg-light border">
                        {arrivalTime.dir}: [{arrivalTime.route}] {arrivalTime.time}
                      </div>
                    ))}
                  </Stack>
                </Row>
              </Container>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
