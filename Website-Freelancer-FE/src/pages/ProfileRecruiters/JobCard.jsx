import React from "react";
import { Card, Tag, Row, Col, Button, Tooltip, message } from "antd";
import {
  CopyOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import State from "@utils/State";
import scss from "./JobCard.module.scss";
import applyApi from "@api/applyApi";
import productApi from "@api/productApi";

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);

  const [messageApi, contextHolder] = message.useMessage();
  const [apply, setApply] = useState(null);
  const [product, setProduct] = useState(null);

  const handleCopy = async () => {
    if (!product?.link) return;
    try {
      await navigator.clipboard.writeText(product.link);
      messageApi.open({
        type: "success",
        content: "Đã sao chép liên kết sản phẩm!",
      });
    } catch (err) {
      messageApi.open({
        type: "error",
        content: "Không thể sao chép liên kết sản phẩm!",
      });
    }
  };

  const fetchApply = async () => {
    try {
      const res = await (job?.status !== State.JobPost.FINISHED
        ? applyApi.getWorkingByJobPostId(job?.id)
        : applyApi.getFinishedByJobPostId(job?.id));

      setApply(res.data);

      if (res.data.productId) {
        const resProduct = await productApi.getById(res.data.productId);
        setProduct(resProduct.data);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleAppoved = async () => {
    try {
      const res = await applyApi.finish(apply?.id);
      messageApi.open({
        type: "success",
        content: res.data,
      });
      fetchApply();
    } catch (error) {
      messageApi.open({
        type: "error",
        content: error.response.data,
      });
      console.error("Error approving apply:", error);
    }
  };

  const handleReturn = async () => {
    try {
      const res = await productApi.update(product.id, {
        status: State.Product.EDITING,
      });
      fetchApply();
    } catch (error) {
      messageApi.open({
        type: "error",
        content: error.response.data,
      });
      console.error("Error approving apply:", error);
    }
  };

  useEffect(() => {
    fetchApply();
    console.log(job);

    switch (job?.status) {
      case State.JobPost.PENDING:
        setStatus({ text: "Chờ xác nhận", color: "blue" });
        break;
      case State.JobPost.WORKING:
        setStatus({ text: "Đang làm", color: "success" });
        break;
      case State.JobPost.EDITING:
        setStatus({ text: "Đang chỉnh sửa", color: "warning" });
        break;
      case State.JobPost.PUBLISHED:
        setStatus({ text: "Đang đăng", color: "purple" });
        break;
      case State.JobPost.STARTED:
        setStatus({ text: "Đang làm", color: "orange" });
        break;
      case State.JobPost.FINISHED:
        setStatus({ text: "Hoàn thành", color: "#87d068" });
        break;
      default:
        setStatus({ text: "Không xác định" });
    }
  }, []);

  return (
    <Card className={scss.card} loading={!job}>
      {contextHolder}
      <Row>
        <Col span={20}>
          <p
            className={scss.title}
            onClick={() => navigate(`/jobpostdetail/${job.id}`)}
          >
            {job?.title ?? "Không xác định"}
          </p>
          <div className={scss.budgetContainer}>
            <span className={scss.bold}>Ngân sách: </span>
            <span className={scss.text}>
              {job.budget?.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              }) ?? "Không xác định"}
            </span>
          </div>
          <div className={scss.datePostedContainer}>
            <span className={scss.bold}>Ngày đăng: </span>
            <span className={scss.text}>
              {dayjs(job?.datePosted).format("DD/MM/YYYY") ?? "Không xác định"}
            </span>
          </div>
        </Col>
        <Col span={4}>
          <div className={scss.statusContainer}>
            <Tag className={scss.tag} color={status?.color}>
              {status?.text}
            </Tag>
            {job?.status === State.JobPost.EDITING && (
              <Button
                type="primary"
                onClick={() => navigate(`/jobpost/edit/${job?.id}`)}
              >
                Chỉnh sửa
              </Button>
            )}

            {job?.status === State.JobPost.PUBLISHED && (
              <Button
                type="primary"
                onClick={() => navigate(`/applies/jobpost/${job.id}`)}
              >
                Danh sách ứng tuyển
              </Button>
            )}
            {apply && (
              <div className={scss.divWorker}>
                <Tooltip title="Xem thông tin hồ sơ đã ứng tuyển vào công việc này!">
                  <Button
                    className={scss.btn}
                    type="primary"
                    onClick={() => navigate(`/jobpost/apply/${apply.id}`)}
                  >
                    Ứng tuyển
                  </Button>
                </Tooltip>
                {product ? (
                  (() => {
                    switch (product?.status) {
                      case State.Product.EDITING:
                        return (
                          <Tooltip title="Freelancer đang chỉnh sửa sản phẩm!">
                            <Button className={scss.btn} disabled>
                              Sản phẩm
                            </Button>
                          </Tooltip>
                        );
                      case State.Product.BLOCKED:
                        return (
                          <Tooltip
                            title={
                              <div>
                                <b>Sản phẩm Freelancer đã nộp</b>
                                <p className={"m-0"}>{product?.link}</p>
                                <div className={scss.copy}>
                                  <Tooltip title="Sao chép">
                                    <CopyOutlined
                                      onClick={handleCopy}
                                      className={scss.icon}
                                    />
                                  </Tooltip>
                                </div>
                              </div>
                            }
                            color="geekblue"
                          >
                            <Button
                              className={scss.btn}
                              href={product?.link}
                              target="_blank"
                            >
                              Sản phẩm
                            </Button>
                          </Tooltip>
                        );
                      default:
                        return (
                          <Tooltip
                            title={
                              <div>
                                <p className={"m-0"}>{product?.link}</p>
                                <div className={scss.copy}>
                                  <Tooltip title="Yêu cầu freelancer chỉnh sửa sản phẩm.">
                                    <CloseCircleOutlined
                                      onClick={handleReturn}
                                      className={scss.icon}
                                    />
                                  </Tooltip>
                                  <Tooltip title="Chấp nhận sản phấm.">
                                    <CheckCircleOutlined
                                      onClick={handleAppoved}
                                      className={scss.icon}
                                    />
                                  </Tooltip>
                                  <Tooltip title="Sao chép">
                                    <CopyOutlined
                                      onClick={handleCopy}
                                      className={scss.icon}
                                    />
                                  </Tooltip>
                                </div>
                              </div>
                            }
                            color="geekblue"
                          >
                            <Button
                              className={scss.btn}
                              href={product?.link}
                              target="_blank"
                            >
                              Sản phẩm
                            </Button>
                          </Tooltip>
                        );
                    }
                  })()
                ) : (
                  <Tooltip title="Freelancer chưa nộp sản phẩm nào!">
                    <Button className={scss.btn} disabled>
                      Sản phẩm
                    </Button>
                  </Tooltip>
                )}
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default JobCard;
