import React from "react";

function RadioInput({label, value, onChange, name, id, check}) {
  return (
    <div className="flex items-center gap-x-2 text-secondary-600">
      <input
        type="radio"
        name={name}
        id={id}
        value={value}
        className="radio-btn"
        onChange={onChange}
        checked={check}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export default RadioInput;
