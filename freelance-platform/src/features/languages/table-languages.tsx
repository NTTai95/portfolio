"use client";
import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputRef,
  Popconfirm,
  Space,
  Table,
  Typography,
} from "antd";
import type { TableColumnType } from "antd";
import dynamic from "next/dynamic";
import React, { useRef, useState } from "react";
import { EditableCell } from "./edit-table-languages";
import { DataType } from "./constants";
import { useLanguages } from "./MockupData";
import {
  createLanguage,
  updateLanguage,
  deleteLanguage,
} from "../../api/languagesAPI";
const TableLanguages: React.FC = () => {
  const [form] = Form.useForm();
  const dataFromHook = useLanguages();
  const [data, setData] = useState<DataType[]>([]);

  const [editingKey, setEditingKey] = useState("");
  const [count, setCount] = useState(100);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  React.useEffect(() => {
    console.log("dataFromHook:", dataFromHook);
    setData(dataFromHook);
  }, [dataFromHook]);

  const isEditing = (record: DataType) => record.key === editingKey;

  const edit = (record: Partial<DataType> & { key: React.Key }) => {
    form.setFieldsValue({ iso: "", name: "", status: "", ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as DataType;
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        const updatedItem = { ...item, ...row };

        // Gửi request cập nhật lên server
        await updateLanguage(key as string, updatedItem);

        newData.splice(index, 1, updatedItem);
        setData(newData);
        setEditingKey("");
      }
    } catch (err) {
      console.log("Lỗi:", err);
    }
  };

  const deleteRecord = async (key: React.Key) => {
    try {
      await deleteLanguage(key as string);
      setData(data.filter((item) => item.key !== key));
    } catch (err) {
      console.log("Lỗi khi xóa:", err);
    }
  };

  const addNewRow = async () => {
    const newRow = {
      iso: "",
      name: "",
      status: "Hoạt động",
    };

    try {
      // Gửi request tạo mới
      const res = await createLanguage(newRow);
      const created = res.data;

      // Đảm bảo created có `key`, nếu server trả về `id` thì gán key = id
      created.key = created.id || created.key;

      setData([created, ...data]);
      form.setFieldsValue(created);
      setEditingKey(created.key);
      setCount(count + 1);
    } catch (err) {
      console.log("Lỗi khi thêm mới:", err);
    }
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: () => void,
    dataIndex: string
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const Highlighter = dynamic(() => import("react-highlight-words"), {
    ssr: false,
  });

  const getColumnSearchProps = (
    dataIndex: keyof DataType
  ): TableColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Tìm ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Tìm
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Lọc
          </Button>
          <Button type="link" size="small" onClick={() => close()}>
            Đóng
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    filterDropdownProps: {
      onOpenChange: (visible: boolean) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    render: (text: string) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "ISO",
      dataIndex: "iso",
      editable: true,
      width: "10%",
      ...getColumnSearchProps("iso"),
      // Cố định cột và cho phép tự động xuống dòng
      ellipsis: true,
      render: (text: string) => (
        <div style={{ whiteSpace: "normal", wordWrap: "break-word" }}>
          {text}
        </div>
      ),
    },
    {
      title: "Tên ngôn ngữ",
      dataIndex: "name",
      editable: true,
      width: "20%",
      ...getColumnSearchProps("name"),
      // Cố định cột và cho phép tự động xuống dòng
      ellipsis: true,
      render: (text: string) => (
        <div style={{ whiteSpace: "normal", wordWrap: "break-word" }}>
          {text}
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      editable: true,
      width: "15%",
      filters: [
        { text: "Hoạt động", value: "Hoạt động" },
        { text: "Không hoạt động", value: "Không hoạt động" },
      ],
      onFilter: (value: string | number | boolean, record: DataType) =>
        record.status === (value as string),
      render: (status: string) => status,
    },
    {
      title: "Hành động",
      dataIndex: "operation",
      width: "10%",
      render: (_: any, record: DataType) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Lưu
            </Typography.Link>
            <Popconfirm title="Bạn có chắc hủy?" onConfirm={cancel}>
              <a>Hủy</a>
            </Popconfirm>
          </span>
        ) : (
          <span>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              Sửa
            </Typography.Link>
            <Popconfirm
              title="Bạn có chắc muốn xóa?"
              onConfirm={() => deleteRecord(record.key)}
            >
              <Typography.Link style={{ color: "red", marginLeft: 8 }}>
                Xóa
              </Typography.Link>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!("editable" in col) || !col.editable) return col;
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        inputType: col.dataIndex === "status" ? "select" : "text",
        dataIndex: col.dataIndex,
        title: typeof col.title === "string" ? col.title : undefined,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div className="p-4">
      <Button type="primary" onClick={addNewRow} style={{ marginBottom: 16 }}>
        Thêm mới ngôn ngữ
      </Button>
      <Form form={form} component={false}>
        <Table
          components={{ body: { cell: EditableCell } }}
          bordered
          dataSource={data}
          columns={mergedColumns as TableColumnType<DataType>[]}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
            pageSize: 10,
          }}
        />
      </Form>
    </div>
  );
};

export default TableLanguages;
