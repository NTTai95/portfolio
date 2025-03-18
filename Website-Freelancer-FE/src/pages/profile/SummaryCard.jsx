import { Card, Badge, Rate, Flex } from "antd";
import { useState } from "react";
import scss from "./SummaryCard.module.scss";

const tabList = [
  { key: "tab1", tab: "Công việc" },
  { key: "tab2", tab: "Đánh giá" },
];

const desc = ["Lừa đảo", "Không khuyến khích", "Bình thường", "Tốt", "Tuyệt cà là vời"];

const SummaryCard = () => {
  const [value, setValue] = useState(1);
  const [activeTabKey1, setActiveTabKey1] = useState("tab1");

  const getColor = (val) => (val <= 2 ? "red" : val <= 3 ? "orange" : "green");

  const getTooltip = (val) => {
    if (val === 0.5) return "Siêu lừa đảo";
    const index = Math.floor(val);
    return desc[index - 1];
  };

  const contentList = {
    tab1: (
      <>
        <div className="row">
          <div className="col-lg-5">Việc đã đăng:</div>
          <div className="col-lg-2">
            <Badge count={25} color="blue" />
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-lg-5">Việc làm:</div>
          <div className="col-lg-2">
            <Badge count={25} color="green" />
          </div>
          <div className="col-lg-5">việc đã làm</div>
        </div>
        <hr />
        <div className="row">
          <div className="col-lg-5">Khách hàng:</div>
          <div className="col-lg-2">
            <Badge count={25} color="#4096ff" />
          </div>
          <div className="col-lg-5">khách</div>
        </div>
        <hr />
      </>
    ),
    tab2: (
      <div className="row">
        <div className="col-lg-4">
          <p>Đánh giá:</p>
        </div>
        <div className="col-lg-8">
          <Flex gap="middle" vertical align="center">
            <Rate allowHalf tooltips={desc} onChange={setValue} value={value} />
            {value && (
              <span style={{ color: getColor(value), fontWeight: "bold" }}>
                {getTooltip(value)}
              </span>
            )}
          </Flex>
        </div>
      </div>
    ),
  };

  return (
    <Card
      className={scss.card}
      title="Tóm lược"
      tabList={tabList}
      activeTabKey={activeTabKey1}
      onTabChange={setActiveTabKey1}
    >
      {contentList[activeTabKey1]}
    </Card>
  );
};

export default SummaryCard;
