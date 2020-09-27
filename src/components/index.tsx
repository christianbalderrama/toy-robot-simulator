import React, {useState, FormEvent} from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { v4 as uuidv4 } from "uuid";

import TextArea from "./bootstrap/text-area";
import Button from "./bootstrap/button";
import Border from "./border";

interface IndexProps {};

export default function Index(props: IndexProps) {
  const {} = props;
  const [action, setAction] = useState("");
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  function renderTable(): JSX.Element[] {
    let grid = [];
    for (let row = 4; row >= 0; row--) {
      for (let col = 4; col >= 0; col--) {
        grid.push(
          <Border
            selected={position}
            position={{x: row, y: col}}
            key={uuidv4()}
            onClick={() => console.log("HEY >>> ", {row, col})}
          />
        );
      }
      grid.push(<br key={uuidv4()} />);
    }

    return grid;
  }

  function handleSubmit(e : FormEvent<HTMLElement>) : void {
    e.preventDefault();
    console.log(action);
  }

  return (
    <Container>
      <Row>
        <Col>
          <div className="grid">
            {renderTable()}
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <TextArea
              onChange={(e) => setAction(e.target.value)}
              placeholder="Enter your actions here ..."
              rowCount={3}
              label={"Actions"}
            />
            <Button
              label="Submit"
              type="submit"
              variant="primary"
            />
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

Index.propTypes = {};
