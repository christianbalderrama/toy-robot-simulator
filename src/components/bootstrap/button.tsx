import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";

interface ButtonProps {
  label: string,
  type: string,
  variant: string,
};

export default function Wrapper(props: ButtonProps) : JSX.Element {
  const { label, type, variant } = props;
  return (
    <Button
      variant={variant || "primary"}
      type={type}>
      {label}
    </Button>
  );
}

Wrapper.propTypes = {
  label: PropTypes.string.isRequired,
  variant: PropTypes.string,
  type: PropTypes.string.isRequired,
};
