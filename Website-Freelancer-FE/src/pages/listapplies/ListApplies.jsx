import React, { useState, useEffect } from "react";
import AplicantCard from "./ApplicantCard";
import SearchInput from "./SearchInput";
import { Skeleton, Row, Col, Pagination, Divider, Typography } from "antd";
import applyApi from "@api/applyApi";
import { useParams } from "react-router-dom";

const ListApplicant = () => {
  const { id } = useParams();
  console.log("jobPostId:", id);
  const [applicant, setApplicant] = useState(null);
  const [search, setSearch] = useState("");

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchData = async () => {
    try {
      const res = await applyApi.getAppliesByJobPost({
        jobPostId: id,
        page: pagination.current,
        size: pagination.pageSize,
      });
      const { content, totalElements } = res.data;

      setApplicant(content);
      setPagination((prev) => ({
        ...prev,
        total: totalElements,
      }));
    } catch (error) {
      console.error("Lỗi khi lấy danh sách Apply:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pagination.current, pagination.pageSize, search]);

  const handlePageChange = (page, pageSize) => {
    setPagination((prev) => ({
      ...prev,
      current: page,
      pageSize: pageSize,
    }));
    window.scrollTo(0, 0);
  };

  const onSearch = (value) => {
    setSearch(value);
  };

  return (
    <div className="container">
      <Row gutter={24}>
        <Col span={6} className={"border-end mt-5"}>
          <div>
            <Typography.Title level={5}>Tìm kiếm</Typography.Title>
            <SearchInput className={"mt-5"} onSearch={onSearch} />
          </div>
          <Divider />
        </Col>

        <Col span={18}>
          <Row gutter={[16, 16]}>
            {applicant &&
              applicant.map((applicant, index) => (
                <Col key={applicant.id || index} span={6}>
                  <AplicantCard applicant={applicant} />
                </Col>
              ))}

            {!applicant && (
              <div>
                {Array.from({ length: 10 }).map((_, index) => (
                  <Skeleton
                    avatar
                    key={index}
                    active={true}
                    paragraph={{
                      rows: 4,
                    }}
                  />
                ))}
                <Skeleton.Input className={"ms-auto d-block"} active={true} />
              </div>
            )}
            {applicant?.length < 1 && (
              <div className="text-center">
                <h3>Không có ứng viên nào</h3>
              </div>
            )}
          </Row>
          {(applicant && applicant.length > 0) && (
            <Pagination
              pagination={pagination}
              align="end"
              onChange={handlePageChange}
            ></Pagination>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ListApplicant;
