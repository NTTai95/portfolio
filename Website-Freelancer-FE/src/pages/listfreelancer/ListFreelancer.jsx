import React, { useState, useEffect } from "react";
import FreelancerCard from "./FreelancerCard";
import SearchInput from "./SearchInput";
import { Skeleton, Row, Col, Pagination, Divider, Typography } from "antd";
import profileApi from "@api/profileApi";

const ListFreelancer = () => {
  const [profile, setProfile] = useState(null);
  const [search, setSearch] = useState("");

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchData = async () => {
    const res = await profileApi.getPageFreelancerNotNull({
      page: pagination.current,
      size: pagination.pageSize,
      search: `fullName,${search}`,
    });

    const { content, totalElements } = res.data;

    setProfile(content);
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
            {profile &&
              profile.map((profile, index) => (
                <Col key={profile.id || index} span={6}>
                  <FreelancerCard profile={profile} />
                </Col>
              ))}

            {(!profile || profile?.length == 0) && (
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
          </Row>
          {profile && (
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

export default ListFreelancer;
