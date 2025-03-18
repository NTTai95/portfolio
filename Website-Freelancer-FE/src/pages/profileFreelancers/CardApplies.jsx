import React from "react";
import { Card, Tag, Row, Col, Input, message, Button, Tooltip } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import jobspostApi from "@api/jobspostApi";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import State from "@utils/State";
import scss from "./CardApplies.module.scss";
import productApi from "@api/productApi";

const CardApplies = ({ apply }) => {
  const [jobPost, setJobPost] = useState(null);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const [statusApply, setStatusApply] = useState(null);
  const [statusProduct, setStatusProduct] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  const fetchJobPost = async () => {
    try {
      const response = await jobspostApi.getById(apply.jobPostId);
      setJobPost(response.data);
    } catch (error) {
      console.error("Error fetching job post:", error);
    }
  };

  const handleSatus = (status) => {
    switch (status) {
      case State.Product.REVIEWING:
        setStatusProduct({ text: "Đang xem xét", color: "blue" });
        break;
      case State.Product.EDITING:
        setStatusProduct({ text: "Chỉnh sửa", color: "orange" });
        break;
      default:
        setStatusProduct({ text: "Không xác định" });
    }
  };

  const fetchProduct = async () => {
    try {
      if (apply.productId) {
        const response = await productApi.getById(apply.productId);
        setProduct(response.data);

        handleSatus(response.data.status);
      }
    } catch (error) {
      console.error("Error fetching apply:", error);
    }
  };

  useEffect(() => {
    fetchJobPost();
    fetchProduct();

    switch (apply.status) {
      case State.Apply.PENDING:
        setStatusApply({ text: "Chờ xác nhận", color: "blue" });
        break;
      case State.Apply.WORKING:
        setStatusApply({ text: "Đang làm", color: "success" });
        break;
      case State.Apply.REJECTED:
        setStatusApply({ text: "Đã từ chối", color: "red" });
        break;
      case State.Apply.FINISHED:
        setStatusApply({ text: "Đã hoàn thành", color: "green" });
        break;
      default:
        setStatusApply({ text: "Không xác định" });
    }
  }, []);

  const onSubmit = async (value, _e, info) => {
    const res = await productApi.create({
      link: value,
      applyId: apply?.id,
    });

    if (res.status === 200) {
      messageApi.success("Thêm sản phẩm thành công!");
      setProduct(res.data);
      handleSatus(res.data.status);
    }
  };

  const onUpdate = async (value, _e, info) => {
    const res = await productApi.update(product.id, {
      link: value,
      status: State.Product.REVIEWING,
    });
    if (res.status === 200) {
      messageApi.success("Đã nộp lại sản phẩm!");
      setProduct(res.data);
      handleSatus(res.data.status);
    }
  };

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

  return (
    <Card className={scss.card} loading={!jobPost}>
      {contextHolder}
      <Row>
        <Col span={18}>
          <p
            className={scss.title}
            onClick={() => navigate(`/jobpostdetail/${jobPost?.id}`)}
          >
            {jobPost?.title}
          </p>
          <div className={scss.budgetContainer}>
            <span className={scss.bold}>Ngân sách: </span>
            <span className={scss.text}>
              {jobPost?.budget?.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </div>
          <div className={scss.dateCraetedContainer}>
            <span className={scss.bold}>Ngày nộp: </span>
            <span className={scss.text}>
              {dayjs(apply?.dateCreated).format("DD/MM/YYYY hh:mm")}
            </span>
          </div>
        </Col>
        <Col span={6}>
          <Tag className={scss.tag} color={statusApply?.color}>
            {statusApply?.text}
          </Tag>
          {apply?.status == State.Apply.WORKING && !product && (
            <Input.Search
              enterButton="Nộp"
              className="mt-3"
              onSearch={onSubmit}
            ></Input.Search>
          )}
          {product && product?.status == State.Product.EDITING && (
            <div>
              <Input.Search
                enterButton="Nộp"
                className="mt-3"
                onSearch={onUpdate}
                value={product?.link}
                onChange={(e) =>
                  setProduct({ ...product, link: e.target.value })
                }
              ></Input.Search>
              <Tag
                className={scss.tag + " mx-0 mt-2"}
                color={statusProduct.color}
              >
                {statusProduct.text}
              </Tag>
            </div>
          )}
          {product && product?.status != State.Product.EDITING && (
            <div className={scss.product}>
              {apply?.status != State.Apply.FINISHED && (
                <Tag className={scss.tag} color={statusProduct.color}>
                  {statusProduct.text}
                </Tag>
              )}
              <Tooltip
                title={
                  <div>
                    <p className={"m-0"}>{product?.link}</p>
                    <div className={scss.divCopy}>
                      <Tooltip title="Sao chép">
                        <CopyOutlined
                          onClick={handleCopy}
                          className={scss.copy}
                        />
                      </Tooltip>
                    </div>
                  </div>
                }
                color="geekblue"
              >
                <Button
                  type="primary"
                  className={scss.textN}
                  href={product?.link}
                  target="_blank"
                >
                  Truy cập
                </Button>
              </Tooltip>
            </div>
          )}
        </Col>
      </Row>
    </Card>
  );
};

export default CardApplies;
