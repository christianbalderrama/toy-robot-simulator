import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRobot } from '@fortawesome/free-solid-svg-icons'

interface Position {
  x: number,
  y: number
};

interface Props {
  onClick: () => void,
  selected: Position,
  position: Position,
}

export default function Border(props: Props) {
  const { onClick, selected, position } = props;
  console.log({selected, position}, selected.x === position.x && selected.y === position.y);
  return (
    <div
      className="item"
      onClick={onClick}>
      {(selected.x === position.x && selected.y === position.y) && (
        <FontAwesomeIcon style={{marginTop: 10}} icon={faRobot} size="3x" />
      )}
    </div>
  );
}


Border.propTypes = {
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }),
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }),
};
