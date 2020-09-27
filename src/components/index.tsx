import React from "react";
import { Container } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import Border from "./border";

interface IndexProps {};

export default function Index(props: IndexProps) {
  const {} = props;

  function renderTable(): JSX.Element[] {
    let grid = [];
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        grid.push(
          <Border
            key={uuidv4()}
            onClick={() => console.log("HEY >>> ", {row, col})}
          />
        );
      }
      grid.push(<br key={uuidv4()} />);
    }

    return grid;
  }

  return (
    <Container>
      <div className="grid">
        {renderTable()}
      </div>
    </Container>
  );
}

Index.propTypes = {};
