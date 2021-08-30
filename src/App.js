import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { validateFileLoadedInput, startProccess } from "./utils";
import "./App.css";

function App() {

  return (
    <Container className="App">
      <Row>
        <Col xs={4}>
          <Form.Group controlId="formFileLg" className="mb-3 file-input">
            <Form.Label className="label">Выберите файл для загрузки</Form.Label>
            <Form.Control
              accept=".xlsx"
              type="file"
              size="lg"
              onChange={(e) => validateFileLoadedInput(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col xs={4}>
          <Button variant="primary" className="generate-btn" onClick={() => startProccess}>Сгенерировать номера</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
