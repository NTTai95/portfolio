import React, { useState } from "react";
import scss from "./FlInput.module.scss"; // Tùy chọn: Thêm file CSS để chỉnh kiểu dáng
import { DatePicker } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";

const FlInputText = ({ icon, label, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState(null);

  function handleOnChange(date, dateString) {
    setValue(date);
    if (onChange) {
      onChange(date, dateString);
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
        <DatePicker
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={value}
          onChange={handleOnChange}
          style={{ padding: "1px 0px" }}
          variant="borderless"
          placeholder=""
          format={"DD/MM/YYYY"}
          suffixIcon={
            <CloseCircleFilled
              style={{
                display: value ? "block" : "none",
                fontSize: "14px",
                color: "gray",
                marginLeft: "10px",
              }}
            />
          }
        />
      </div>
    </div>
  );
};

export default FlInputText;
