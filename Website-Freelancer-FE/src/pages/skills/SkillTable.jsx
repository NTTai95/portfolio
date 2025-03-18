import React, { useState, useEffect, useRef } from "react";
import scss from "./SkillTable.module.scss";
import { useNavigate } from "react-router-dom";
import { Table, Button, Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import Highlighter from "react-highlight-words";
import skillApi from "@api/skillApi";
import { locale } from "moment/moment";

const SkillTable = () => {
  const navigate = useNavigate();
  const [hoveredRow, setHoveredRow] = useState(null);
  const [searchText, setSearchText] = useState("");
  const searchInput = useRef(null);
  const [data, setData] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchSkills = async () => {
    try {
      const res = await skillApi.getPage({
        page: pagination.current,
        size: pagination.pageSize,
        search: searchText,
      });
      const { content, totalElements } = res.data;

      setData(
        content.map((skill) => ({
          key: skill.id,
          name: skill.name,
          description: skill.description,
        }))
      );

      setPagination((prev) => ({
        ...prev,
        total: totalElements,
      }));
    } catch (error) {
      console.error("Error fetching skills:đâsdsadsdss", error);
    }
  };

  useEffect(() => {
    fetchSkills();
    window.scrollTo(0, 0);
  }, [pagination.current, pagination.pageSize, searchText]);

  const handleSearch = (selectedKeys, confirm) => {
    confirm();
    setSearchText(selectedKeys[0]);
  };

  const handleReset = (clearFilters, confirm) => {
    setSearchText("");
    clearFilters();
    confirm();
  };

  const getColumnSearchName = () => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder="Tìm kiếm..."
          style={{ marginBottom: 8, display: "block" }}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Tìm kiếm
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters, confirm)}
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
    onFilter: (value, record) =>
      `${record.name} ${record.description || ""}`
        .toLowerCase()
        .includes(value.toLowerCase()),
  });

  const columns = [
    {
      title: "Tên kỹ năng & Mô tả",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchName(),
      render: (text, record) => (
        <div
          onMouseEnter={() => setHoveredRow(record.key)}
          onMouseLeave={() => setHoveredRow(null)}
        >
          <b>
            <Highlighter
              highlightStyle={{ backgroundColor: "#94dffa", padding: 0 }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text || ""}
            />
          </b>
          <br />
          <AnimatePresence>
            <motion.p
              className={scss.description}
              initial={{ maxHeight: 0, opacity: 0 }}
              animate={{
                maxHeight: hoveredRow === record.key ? 200 : 24,
                opacity: hoveredRow === record.key ? 1 : 0.7,
                whiteSpace: hoveredRow === record.key ? "normal" : "nowrap",
              }}
              exit={{ maxHeight: 24, opacity: 0.7 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <Highlighter
                highlightStyle={{ backgroundColor: "#94dffa", padding: 0 }}
                searchWords={[searchText]}
                autoEscape
                textToHighlight={record.description || ""}
              />
            </motion.p>
          </AnimatePresence>
        </div>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate(`/admin/skills/edit/${record.key}`);
          }}
        >
          Chỉnh sửa
        </a>
      ),
    },
  ];

  const handleTableChange = (pagination) => {
    setPagination({
      ...pagination,
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  return (
    <div className={`${scss.employeeTable} p-3`}>
      <Button
        className="mb-3 float-end"
        type="primary"
        onClick={() => navigate("/admin/skills/add")}
        size="large"
      >
        Thêm kỹ năng
      </Button>
      <Table
        pagination={{
          ...pagination,
          locale: { items_per_page: " mục / trang" },
        }}
        columns={columns}
        dataSource={data}
        loading={!data}
        showSorterTooltip={{ target: "sorter-icon" }}
        onChange={handleTableChange}
        rowKey={(record) => record.key}
      />
    </div>
  );
};

export default SkillTable;
