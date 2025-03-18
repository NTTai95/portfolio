import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import SearchInput from "./SearchInput";
import { Pagination, Skeleton, Row, Col, Typography, Divider } from "antd";
import jobspostApi from "@api/jobspostApi";

const JobPost = () => {
  const [jobs, setJobs] = useState(null);
  const [search, setSearch] = useState("");

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchData = async () => {
    const res = await jobspostApi.getPageActive({
      page: pagination.current,
      size: pagination.pageSize,
      search: `keyword,${search}`,
    });

    const { content, totalElements } = res.data;

    setJobs(content);
    setPagination((prev) => ({
      ...prev,
      total: totalElements,
    }));
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
    <div className="container my-5">
      <Row gutter={24}>
        <Col span={6}>
          <div>
            <Typography.Title level={5}>Tìm kiếm</Typography.Title>
            <SearchInput onSearch={onSearch} />
            <Divider />
          </div>
        </Col>

        <Col span={18}>
          {jobs &&
            jobs.map((job, index) => (
              <JobCard key={index} job={job} hightLight={search} />
            ))}
          {jobs && (
            <Pagination
              pageSize={pagination.pageSize}
              align="end"
              current={pagination.current}
              total={pagination.total}
              onChange={handlePageChange}
            />
          )}
          {(!jobs || jobs?.length == 0) && (
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
        </Col>
      </Row>
    </div>
  );
};

export default JobPost;
