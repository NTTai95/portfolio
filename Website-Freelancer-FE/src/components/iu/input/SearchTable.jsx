import React, { useState, useRef } from "react";
import { Input, Space, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const SearchTable = ({dataIndex, searchText,setSearchText}) => {
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm) => {
    confirm();
    setSearchText(selectedKeys[0]);
  };

  const handleReset = (clearFilters, setSelectedKeys ,confirm) => {
    clearFilters();
    setSearchText("");
    setSelectedKeys([]);
    confirm();
  };

  return {
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder="Tìm kiếm..."
          value={selectedKeys[0] || ""}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Tìm
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters, setSelectedKeys ,confirm)}
            size="small"
            style={{ width: 90 }}
          >
            Đặt lại
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) => record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
    render: (text) => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#94dffa", padding: 0 }}
        searchWords={[searchText]}
        autoEscape
        textToHighlight={text ? text.toString() : ""}
      />
    ),
  };
};

export default SearchTable;
