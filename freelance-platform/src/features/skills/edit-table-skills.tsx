import { Form, Input, InputNumber, Select } from "antd";
import React from "react";
import { EditableCellProps } from "./constants";
import { useIndustrie } from "./MockupData";

export const EditableCell: React.FC<
  React.PropsWithChildren<EditableCellProps>
> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const industries = useIndustrie();
  let inputNode;

  if (inputType === "select") {
    inputNode = (
      <Select>
        <Select.Option value="Hoạt động">Hoạt động</Select.Option>
        <Select.Option value="Không hoạt động">Không hoạt động</Select.Option>
      </Select>
    );
  } else if (inputType === "industry") {
    inputNode = (
      <Select value={record.industryId ?? industries[0]?.id ?? ""}>
        {industries.map((ind) => (
          <Select.Option key={ind.id} value={ind.id}>
            {ind.name}
          </Select.Option>
        ))}
      </Select>
    );
  } else if (inputType === "number") {
    inputNode = <InputNumber />;
  } else {
    inputNode = <Input />;
  }

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[{ required: true, message: `Vui lòng nhập ${title}!` }]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
