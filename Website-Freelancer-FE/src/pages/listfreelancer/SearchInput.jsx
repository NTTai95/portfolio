import React from "react";
import { Input, Button } from "antd";

const SearchInput = ({ onSearch }) => {
  return (
    <div>
      <Input.Search
        color="primary"
        placeholder="Họ tên..."
        onSearch={onSearch}
        enterButton
      />
    </div>
  );
};

export default SearchInput;
