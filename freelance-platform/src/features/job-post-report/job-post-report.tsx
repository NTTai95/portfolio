"use client";

import React from "react";
import { Table } from "antd";
import { TableColumnType, ColumnsType } from "./constants";
import ActionCell from "./ActionCell";
import sampleData from "./MockupData";

const JobPostReportTable = () => {
  const columns: TableColumnType[] = [
    {
      title: "Tiêu đề",
      dataIndex: "jobPostName",
      key: "jobPostName",
    },
    {
      title: "Người đăng",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Lý do",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Người báo cáo",
      dataIndex: "reporter",
      key: "reporter",
    },
    {
      title: "Ngày báo cáo",
      dataIndex: "datePosted",
      key: "datePosted",
    },
    {
      title: "Hành động",
      dataIndex: "key",
      key: "key",
      render: (_: any, record: ColumnsType) => <ActionCell id={record.key} />,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={sampleData}
      pagination={{ pageSize: 10 }}
    />
  );
};

export default JobPostReportTable;
