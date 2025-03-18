import { Input} from "antd";

const SidebarFilter = ({ onSearch }) => {
  return (
    <div>
      <Input.Search
        color="primary"
        placeholder="Nôi dung công việc..."
        onSearch={onSearch}
        enterButton
      />
    </div>
  );
};

export default SidebarFilter;
