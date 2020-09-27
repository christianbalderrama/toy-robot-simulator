import React from "react";
import PropTypes from "prop-types";

interface Props {
  onClick: () => void,
}

export default function Border(props: Props) {
  const { onClick } = props;
  return (
    <div
      className="item"
      onClick={onClick}
    />
  );
}

Border.propTypes = {
  onClick: PropTypes.func.isRequired,
};
