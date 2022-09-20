import { Card, Col, Container, Row } from "react-bootstrap";
import "typeface-roboto";
import "./App.css";
import { CountryAutocomplete, DrugAutocomplete, StarRatings, Subway } from "./components";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Container fluid>
          <Row>
            <Col xs={12}>
              <Card bg="light" text="dark" className="mb-2">
                <Card.Body>
                  <Card.Title>Subway</Card.Title>
                  <Subway />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card style={{ width: "18rem" }} bg="light" text="dark" className="mb-2">
                <Card.Body>
                  <Card.Title>Ratings</Card.Title>
                  <StarRatings />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <Card bg="light" text="dark" className="mb-2">
                <Card.Title>Drug Autocomplete</Card.Title>
                <Card.Body>
                  <DrugAutocomplete />
                </Card.Body>
              </Card>
            </Col>
            <Col xs={6}>
              <Card bg="light" text="dark" className="mb-2">
                <Card.Title>Country Autocomplete</Card.Title>
                <Card.Body>
                  <CountryAutocomplete />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </header>
    </div>
  );
}

export default App;
