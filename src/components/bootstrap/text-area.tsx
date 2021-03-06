import React, { ChangeEvent } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";

interface TextAreaProps {
  label: string,
  rowCount: number,
  placeholder: string,
  value: string,
  onChange: (e : ChangeEvent<any>) => void,
};

export default function TextArea(props : TextAreaProps) {
  const { value, onChange, label, placeholder = "lorem ipsum", rowCount = 3} = props;
  return (
    <Form.Group>
      <Form.Label>
        {label}
      </Form.Label>
      <Form.Control
        placeholder={placeholder}
        as="textarea"
        value={value}
        onChange={onChange}
        rows={rowCount}
        required
      />
    </Form.Group>
  );
}

TextArea.propTypes = {
  label: PropTypes.string.isRequired,
  rowCount: PropTypes.number,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
