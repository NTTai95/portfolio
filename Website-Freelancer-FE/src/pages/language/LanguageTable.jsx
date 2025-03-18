import React, { useState, useEffect, useRef } from "react";
import scss from "./LanguageTable.module.scss";
import { useNavigate } from "react-router-dom";
import { Table, Button, Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { motion, AnimatePresence, m } from "framer-motion";
import Highlighter from "react-highlight-words";
import SearchTable from "@components/iu/input/SearchTable";
import languageApi from "@api/languageApi";

const LangugeTable = () => {
  const navigate = useNavigate();
  const [searchName, setSearchName] = useState("");
  const [searchISO, setSearchISO] = useState("");
  const [data, setData] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchData = async () => {
    try {
      const res = await languageApi.getAll({
        page: pagination.current,
        size: pagination.pageSize,
        name: searchName,
        iso: searchISO,
      });

      const { content, totalElements } = res.data;
      setData(
        content.map((item, index) => ({
          ...item,
          key: item.id,
        }))
      );

      setPagination((prev) => ({
        ...prev,
        total: totalElements,
      }));
    } catch (error) {
      console.error("Error fetching staff data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, [pagination.current, pagination.pageSize, searchName, searchISO]);

  const columns = [
    {
      title: "Ngôn ngữ",
      dataIndex: "name",
      key: "name",
      ...SearchTable({
        dataIndex: "name",
        searchText: searchName,
        setSearchText: setSearchName,
      }),
    },
    {
      title: "ISO",
      dataIndex: "iso",
      key: "iso",
      width: 150,
      ...SearchTable({
        dataIndex: "iso",
        searchText: searchISO,
        setSearchText: setSearchISO,
      }),
    },
    {
      title: "Hành động",
      key: "action",
      width: 300,
      render: (_, record) => (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate(`/admin/languages/edit/${record.key}`);
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
        onClick={() => navigate("/admin/languages/add")}
        size="large"
      >
        Thêm ngôn ngữ
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

export default LangugeTable;
