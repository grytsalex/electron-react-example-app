import { useState } from "react";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import { validateLoadedFile } from "./utils";
import "./App.scss";
import logo from "./assets/logo.png";

function App() {
  const [files, setFiles] = useState([]);

  const handleSendFile = () => {
    console.log("myFile", files);
  };

  const handleChange = (e) => {
    validateLoadedFile(e.target.value);
    setFiles(e.target.files);
  };

  return (
    <Container className="App">
      <Form>
        <Row>
          <Col xs={4}>
            <Form.Group controlId="formFileLg" className="mb-3 file-input">
              <Form.Label className="label">
                Выберите файл для загрузки
              </Form.Label>
              <Form.Control
                accept=".xlsx"
                type="file"
                size="lg"
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Button
              variant="primary"
              type="submit"
              style={{
                marginTop: "62px",
                padding: "6px 10px",
                backgroundColor: "yellow",
                color: "black",
                border: "none",
              }}
            >
              Подтвердить
            </Button>
          </Col>
        </Row>
      </Form>
      <Row>
        <Col xs={2}>
          <Button
            variant="success"
            className="generate-btn"
            onClick={() => handleSendFile}
          >
            Сгенерировать номера
          </Button>
        </Col>
      </Row>
      <Container className="logo-container">
        <Row className="logo-row">
          <Col xs={6} md={4} className="logo-col">
            <div className="box">
              <div className="box-inner">
                <a href="https://stroycity.com.ua/" target="blank">
                <Image src={logo} className="logo-image" rounded />
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default App;
