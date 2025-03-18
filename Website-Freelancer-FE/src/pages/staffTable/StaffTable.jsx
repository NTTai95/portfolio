import React, { useEffect, useState } from "react";
import scss from "./StaffTable.module.scss";
import { Button, Table } from "antd";
import { useNavigate } from "react-router-dom";
import staffApi from "@api/staffApi";
import SearchTable from "@components/iu/input/SearchTable";

const StaffTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchFullName, setSearchFullName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [sort, setSort] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchData = async () => {
    try {
      const res = await staffApi.getPage({
        page: pagination.current,
        size: pagination.pageSize,
        fullName: searchFullName,
        email: searchEmail,
        phone: searchPhone,
        sort,
      });

      const { content, totalElements } = res.data;

      const formattedData = content.map((staff) => ({
        id: staff.id,
        fullName: staff.fullName,
        birthday: formatDate(staff.birthday),
        email: staff.email,
        phone: staff.phone,
        status: staff.status == 0 ? "Hoạt động" : "Vô hiệu hóa",
      }));

      setData(formattedData);

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
  }, [
    searchFullName,
    searchEmail,
    searchPhone,
    sort,
    pagination.current,
    pagination.pageSize,
  ]);

  const handleOnChange = (pagination, filters, sorter) => {
    setPagination({
      ...pagination,
      current: pagination.current,
      pageSize: pagination.pageSize,
    });

    handleSortChange(sorter);
  };

  const handleSortChange = (sorter) => {
    const sortField = sorter.field;
    const sortOrder = sorter.order === "ascend" ? "asc" : "desc";

    setSort(sortField ? `${sortField},${sortOrder}` : "");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const columns = [
    {
      title: "Họ tên",
      dataIndex: "fullName",
      sorter: true,
      ...SearchTable({
        dataIndex: "fullName",
        searchText: searchFullName,
        setSearchText: setSearchFullName,
      }),
    },
    {
      title: "Ngày sinh",
      dataIndex: "birthday",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      ...SearchTable({
        dataIndex: "email",
        searchText: searchEmail,
        setSearchText: setSearchEmail,
      }),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      ...SearchTable({
        dataIndex: "phone",
        searchText: searchPhone,
        setSearchText: setSearchPhone,
      }),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      sorter: true,
    },
    {
      title: "",
      key: "id",
      render: (text, record) => (
        <a href="#" onClick={() => navigate(`/admin/staff/edit/${record.id}`)}>
          Chỉnh sửa
        </a>
      ),
    },
  ];

  return (
    <div className={`${scss.employeeTable} p-3`}>
      <Button
        className="mb-3 float-end"
        type="primary"
        onClick={() => navigate("/admin/staff/add")}
        size="large"
      >
        Thêm nhân viên
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        loading={!data.length}
        pagination={{
          ...pagination,
          locale: { items_per_page: " mục / trang" },
        }}
        onChange={handleOnChange}
        showSorterTooltip={false}
        rowKey={(record) => record.id}
      />
    </div>
  );
};

export default StaffTable;
