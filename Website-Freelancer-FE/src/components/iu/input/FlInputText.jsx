import React, { useState } from "react";
import scss from "./FlInput.module.scss"; // Tùy chọn: Thêm file CSS để chỉnh kiểu dáng

const FlInputText = ({ icon, label, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");

  function handleOnChange(e) {
    setValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  }

  return (
    <div className={scss.flInput}>
      <div className={scss["floating-icon"]}>
        {icon && React.cloneElement(icon, { className: "icon" })}
      </div>
      <div className={scss["floating-label-input"]}>
        <label className={` ${isFocused || value ? scss["focused"] : ""}`}>
          {label}
        </label>
        <input
          className={scss["input-field"]}
          value={value}
          onChange={handleOnChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
    </div>
  );
};

export default FlInputText;
