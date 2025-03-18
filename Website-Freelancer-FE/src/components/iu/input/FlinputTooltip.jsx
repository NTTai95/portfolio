import React, { useState } from "react";
import scss from "./FlInput.module.scss"; // Tùy chọn: Thêm file CSS để chỉnh kiểu dáng
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

const FlInputTooltip = ({ icon, label, value, onChange, rules = [] }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const validate = (val) => {
    for (let rule of rules) {
      if (rule.required && !val) {
        setError(rule.message || "Trường này không được bỏ trống!");
        return;
      }
    }
    setError("");
  };

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
            autoComplete="off"
            onChange={(e) => {
              const val = e.target.value;
              onChange(e);
              validate(val);
            }}
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
      <p className={scss["error-text"]}>{error}</p>
    </div>
  );
};

export default FlInputTooltip;
