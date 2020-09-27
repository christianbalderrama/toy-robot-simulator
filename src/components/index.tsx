import React, {useState, FormEvent} from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { v4 as uuidv4 } from "uuid";

import TextArea from "./bootstrap/text-area";
import Button from "./bootstrap/button";
import Border from "./border";

interface IndexProps {};

interface Position {
  x: number,
  y: number,
  face: string,
};

export default function Index(props: IndexProps) {
  const {} = props;
  const [error, setError] = useState(false);
  const [action, setAction] = useState("");
  const [position, setPosition] = useState<Position>({
    x: 0,
    y: 0,
    face: "NORTH",
  });

  function renderTable(): JSX.Element[] {
    let grid = [];
    for (let row = 4; row >= 0; row--) {
      for (let col = 4; col >= 0; col--) {
        grid.push(
          <Border
            selected={position}
            position={{
              x: row,
              y: col,
            }}
            key={uuidv4()}
            onClick={() => console.log("HEY >>> ", {row, col})}
          />
        );
      }
      grid.push(<br key={uuidv4()} />);
    }

    return grid;
  }

  function evaluateCommand(action : string) : void | string {
    switch (action.split(" ")[0]) {
      case "PLACE":
        const [delX, delY, delZ] = action.split(" ")[1].split(",");
        return setPosition({
          x: parseInt(delX),
          y: parseInt(delY),
          face: delZ,
        });
      case "MOVE":
        let x : number = position.x;
        let y : number = position.y;
        let face : string = position.face;

        switch (face) {
          case "NORTH":
            y = y + 1;
            break;
          case "SOUTH":
            y = y - 1;
            break;
          case "EAST":
            x = x - 1;
            break;
          case "WEST":
            x = x + 1;
            break;
        };

        console.log("MOVE >>> ", {x, y, face});

        return setPosition({
          x,
          y,
          face,
        });
      case "REPORT":
        return console.log("POSITION >>> ", position);
    };
  }

  function handleSubmit(e : FormEvent<HTMLElement>) : void {
    e.preventDefault();
    const actionArr = action.split("\n");
    const firstCommand = actionArr[0].split(" ");

    if (firstCommand[0] !== "PLACE") {
      return setError(true);
    } else {
      actionArr.map((action : string) => evaluateCommand(action));
    }
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
              label="Actions"
            />
            {error && (
              <Alert
                dismissible
                variant="danger"
                onClose={() => setError(false)}>
                <p>{"Invalid Command"}</p>
              </Alert>
            )}
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
