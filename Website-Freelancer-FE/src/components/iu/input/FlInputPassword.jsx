import React, { useState } from "react";
import scss from "./FlInput.module.scss"; // Tùy chọn: Thêm file CSS để chỉnh kiểu dáng
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

const FlInputPassword = ({ icon, label, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState("");

  function handleOnChange(e) {
    setValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  }

  return (
    <div>
      <div className={scss.flInput}>
        <div className={scss["floating-icon"]}>
          {icon && React.cloneElement(icon, { className: "icon" })}
        </div>
        <div className={scss["floating-label-input"]}>
          <label className={` ${isFocused || value ? scss["focused"] : ""}`}>
            {label}
          </label>
          <input
            type={showPassword ? "text" : "password"}
            className={scss["input-field"]}
            value={value}
            onChange={handleOnChange}
            autoComplete="off"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </div>

        <div
          className={scss.togglePassword}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOutlined className={scss["icon"]} />
          ) : (
            <EyeInvisibleOutlined className={scss["icon"]} />
          )}
        </div>
      </div>
    </div>
  );
};

export default FlInputPassword;
