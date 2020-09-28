import React, {useState, useEffect, FormEvent} from "react";
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

type Directions = "NORTH" | "SOUTH" | "EAST" | "WEST";

interface Position {
  x: number,
  y: number,
  face: Directions,
};

export default function Index(props: IndexProps) {
  const {} = props;

  const [success, showSuccess] = useState<boolean>(false);
  const [error, showError] = useState<boolean>(false);
  const [actionArr, setActionArr] = useState<string[]>([]);
  const [action, setAction] = useState("");
  const [position, setPosition] = useState<Position>({
    x: 0,
    y: 0,
    face: "NORTH",
  });

  useEffect(() => {
    if (actionArr.length > 0) {
      const [action, ...actions] = actionArr;
      evaluateCommand(action);
      return setActionArr(actions);
    }
  }, [actionArr]);

  function renderTable() : JSX.Element[] {
    let grid = [];
    for (let y = 4; y >= 0; y--) {
      for (let x = 0; x < 5; x++) {
        grid.push(
          <Border
            key={uuidv4()}
            selected={position}
            position={{x, y}}
            onClick={() => console.log("GRID POSITION >>> ", {x, y})}
          />
        );
      }
      grid.push(<br key={uuidv4()} />);
    }

    return grid;
  }

  function checkCoordinates(x : number, y : number) : boolean {
    if (y > 4 || y < 0 || x > 4 || x < 0) {
      console.log("INVALID >>> ", {x, y});
      return false;
    }

    console.log("VALID >>> ", {x, y});
    return true;
  }

  function getDirectionByValue(value : number) : Directions {
    let direction : string = "";
    switch (value) {
      case 0:
      case 360:
        direction = "NORTH";
        break;
      case 270:
        direction = "WEST";
        break;
      case 180:
        direction = "SOUTH";
        break;
      case 90:
        direction = "EAST";
        break;
    };

    return direction as Directions;
  }

  function getValueByDirection(direction : string) : number {
    let value : number = 0;
    switch (direction) {
      case "NORTH":
        value = 360;
        break;
      case "WEST":
        value = 270;
        break;
      case "SOUTH":
        value = 180;
        break;
      case "EAST":
        value = 90;
        break;
    };

    return value;
  }

  function getFace(face : string) : void {
    let value : number = getValueByDirection(position.face);
    switch (face) {
      case "LEFT":
        value -= 90;
        break;
      case "RIGHT":
        value += 90;
        break;
    };

    const newFace = getDirectionByValue(value);
    return setPosition({...position, face: newFace});
  }

  function evaluateCommand(action : string) : void {
    switch (action.split(" ")[0]) {
      case "PLACE":
        const [delX, delY, delZ] = action.split(" ")[1].split(",");
        const isValidCoordinates = checkCoordinates(parseInt(delX), parseInt(delY));
        if (isValidCoordinates) {
          return setPosition({
            x: parseInt(delX),
            y: parseInt(delY),
            face: delZ as Directions,
          });
        }

        return;
      case "MOVE":
        let x : number = position.x;
        let y : number = position.y;
        switch (position.face) {
          case "NORTH":
            y = y + 1;
            break;
          case "SOUTH":
            y = y - 1;
            break;
          case "EAST":
            x = x + 1;
            break;
          case "WEST":
            x = x - 1;
            break;
        };

        const valid = checkCoordinates(x, y);
        if (valid) {
          return setPosition({x, y, face: position.face});
        }

        return;
      case "LEFT":
        return getFace("LEFT");
      case "RIGHT":
        return getFace("RIGHT");
      case "REPORT":
        return showSuccess(true);
    };
  }

  function handleSubmit(e : FormEvent<HTMLElement>) : void {
    e.preventDefault();
    const actionArr = action.split("\n");
    const firstCommand = actionArr[0].split(" ");

    if (firstCommand[0] !== "PLACE") {
      return showError(true);
    } else {
      return setActionArr(actionArr);
    }
  }

  return (
    <Container>
      {success && (
        <Alert dismissible variant="success" onClose={() => {
          showSuccess(false);
          return setAction("");
        }}>
          <h3>{"Final Position"}</h3>
          <h5>{`X: ${position.x}`}</h5>
          <h5>{`Y: ${position.y}`}</h5>
          <h5>{`Face: ${position.face}`}</h5>
        </Alert>
      )}
      <Row>
        <Col>
          <div className="grid">
            {renderTable()}
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form onSubmit={(e : FormEvent<HTMLElement>) => handleSubmit(e)}>
            <TextArea
              onChange={(e) => setAction(e.target.value)}
              value={action}
              placeholder="Enter your actions here ..."
              rowCount={3}
              label="Actions"
            />
            {error && (
              <Alert
                dismissible
                variant="danger"
                onClose={() => showError(false)}>
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
