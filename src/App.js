import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { validateFileLoadedInput } from "./utils";
import "./App.css";

function App() {
  return (
    <Container className="App">
      <Row>
        <Col>
          <Form.Group controlId="formFileLg" className="mb-3 file-input">
            <Form.Label className="label">Выберите файл для загрузки</Form.Label>
            <Form.Control
              type="file"
              size="lg"
              onChange={() => validateFileLoadedInput(this)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="primary">Сгенерировать номера</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
