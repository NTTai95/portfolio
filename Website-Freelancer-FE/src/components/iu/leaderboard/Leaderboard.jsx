import { Table, Avatar } from "antd";
import { motion } from "framer-motion";
import scss from "./Leaderboard.module.scss";
import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";

const Leaderboard = ({ title, columns, data }) => {
  const safeColumns =
    Array.isArray(columns) && columns.length > 0
      ? columns
      : [
          { title: "Loading...", dataIndex: "loading", key: "loading" },
          { title: "Loading...", dataIndex: "loading", key: "loading" },
          { title: "Loading...", dataIndex: "loading", key: "loading" },
        ];

  const columnsData = [
    {
      title: safeColumns[0].title,
      dataIndex: safeColumns[0].dataIndex,
      key: safeColumns[0].key,
      width: "15%",
      render: (text) => {
        let color =
          text == 1
            ? "gold"
            : text == 2
            ? "silver"
            : text == 3
            ? "#cd7f32"
            : "gray";
        let fontSize = text <= 3 ? "20px" : "16px";
        let fontWeight = text <= 3 ? "bold" : "normal";

        return (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{ color, fontSize, fontWeight }}
          >
            {text}
          </motion.span>
        );
      },
    },
    {
      title: safeColumns[1].title,
      dataIndex: safeColumns[1].dataIndex,
      key: safeColumns[1].key,
      render: (text, record) => (
        <motion.div
          style={{ display: "flex", alignItems: "center", gap: 10 }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Avatar src={record.avatar} />
          <span>{text}</span>
        </motion.div>
      ),
    },
    {
      title: safeColumns[2].title,
      dataIndex: safeColumns[2].dataIndex,
      key: safeColumns[2].key,
      width: "20%",
      render: (text, record) => (
        <motion.span
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{ fontWeight: record.rank <= 3 ? "bold" : "normal" }}
        >
          {text}
        </motion.span>
      ),
    },
  ];

  const getRowClassName = (record) => {
    if (record.rank == 1) return scss["bg-gold"];
    if (record.rank == 2) return scss["bg-silver"];
    if (record.rank == 3) return scss["bg-bronze"];
    return scss["bg-gray"];
  };

  return (
    <div>
      <h2 className={"text-center"}>🏆 {title} 🏆</h2>
      <Table
        columns={columnsData}
        dataSource={data}
        pagination={false}
        rowClassName={getRowClassName}
      />
    </div>
  );
};

export default Leaderboard;
