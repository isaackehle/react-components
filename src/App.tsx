import { Container, Row, Col } from "react-bootstrap";

import "typeface-roboto";
import "./App.css";
import { StarRatings } from "./libs/";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Container fluid>
          <Row>
            <Col xs={3}>Ratings:</Col>
            <Col xs={9}>
              <StarRatings />
            </Col>
          </Row>
        </Container>
      </header>
    </div>
  );
}

export default App;
