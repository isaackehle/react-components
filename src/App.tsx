import { Card, Col, Container, Row } from "react-bootstrap";
import "typeface-roboto";
import "./App.css";
import { CountryAutocomplete, StarRatings } from "./libs/";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Container fluid>
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
            <Col>
              <Card bg="light" text="dark" className="mb-2">
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
