import React from "react";

function TextField({ value, onChange, name, label }) {
  return (
    <div className="space-y-2">
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        id={name}
        name={name}
        className="textField__input"
        autoComplete="off"
      />
    </div>
  );
}

export default TextField;
