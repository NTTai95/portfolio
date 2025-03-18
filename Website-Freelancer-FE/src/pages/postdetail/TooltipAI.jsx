import {
  IdcardOutlined,
  FileTextOutlined,
  AlignLeftOutlined,
} from "@ant-design/icons";

const TooltipAI = () => {
  return (
    <div>
      <h6>AI hỗ trợ viết hồ sơ ứng tuyển</h6>
      <div>
        <p className={"m-0"}>AI tạo nội dung dựa trên:</p>
        <ul className="list-unstyled ms-2">
          <li>
            <IdcardOutlined />
            <span className={"ms-1"}>Hồ sơ freelancer của bạn.</span>
          </li>
          <li>
            <FileTextOutlined />
            <span className={"ms-1"}>Nộp dung bài tuyển dụng.</span>
          </li>
          <li>
            <AlignLeftOutlined />
            <span className={"ms-1"}>
              Nội dung ứng tuyển{" "}
              <span className="fst-italic text-decoration-underline">
                (nếu có)
              </span>
              .
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TooltipAI;
