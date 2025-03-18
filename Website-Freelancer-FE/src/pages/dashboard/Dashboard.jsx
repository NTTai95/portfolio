import scss from "./Dashboard.module.scss";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faPenToSquare, faCommentDollar } from "@fortawesome/free-solid-svg-icons";
import { Statistic, Result } from "antd";
import CountUp from "react-countup";
import { motion } from "motion/react";
import Leaderboard from "@components/iu/leaderboard/Leaderboard";
import profileApi from "../../api/profileApi";
import jobspostApi from "../../api/jobspostApi";
import RecruiterApi from "../../api/recruiterApi";
import freelancerApi from "../../api/freelancerApi";

function Dashboard() {
  const formatter = (value) => <CountUp start={0} end={value} separator="," />;
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const [totalChange, setTotalChange] = useState(0);
  const [totalPost, setTotalPost] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [pieSeries, setPieSeries] = useState([0, 0, 0]);
  const [dataRecuiter, setDataRecuiter] = useState([]);
  const [dataFreelancer, setDataFreelancer] = useState([]);

  const [series] = useState([{
    name: "Doanh thu",
    data: [82300000, 58200000, 49700000, 68200000, 72700000, 61560000, 67300000, 65200000, 57230000, 56200000, 58300000, 66905000]
  }]);

  const [chartOptions] = useState({
    chart: { id: "bar-chart" },
    xaxis: { categories: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"] },
    yaxis: {
      labels: {
        formatter: (value) => value.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
      }
    },
    dataLabels: { enabled: false },
    markers: { size: 5 }
  });

  const [pieOptions] = useState({
    chart: { type: "pie" },
    tooltip: { enabled: true },
    legend: { position: "bottom" },
    labels: ["Hoàn thành", "Đang thực hiện", "Chờ duyệt"],
    dataLabels: {
      enabled: true,
      formatter: (val) => `${Math.round(val)} %`
    }
  });

  const columns = [
    { title: "Xếp hạng", dataIndex: "rank", key: "rank" },
    { title: "Tên", dataIndex: "name", key: "name" },
    { title: "Tổng bài tuyển dụng", dataIndex: "total", key: "total" }
  ];

  const columnsFreelancer = [
    { title: "Xếp hạng", dataIndex: "rank", key: "rank" },
    { title: "Tên", dataIndex: "name", key: "name" },
    { title: "Tổng bài ứng tuyển", dataIndex: "total", key: "total" }
  ];

  const fetchData = async () => {
    try {
      const [userCount, postCount, pieData, recruiterData, freelancerData] = await Promise.all([
        profileApi.getCount(),
        jobspostApi.countInCurrentMonth(),
        Promise.all([
          jobspostApi.countFinishedInCurrentMonth(),
          jobspostApi.countPendingInCurrentMonth(),
          jobspostApi.countWorkingInCurrentMonth()
        ]),
        RecruiterApi.getTop10(),
        freelancerApi.getTop10()
      ]);

      setTotalUser(userCount.data);
      setTotalPost(postCount.data);
      setPieSeries([pieData[0].data, pieData[1].data, pieData[2].data]);

      setDataRecuiter(recruiterData.data.map((item, index) => ({
        ...item,
        key: index,
        rank: index + 1
      })));

      setDataFreelancer(freelancerData.data.map((item, index) => ({
        ...item,
        key: index,
        rank: index + 1
      })));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="d-flex">
      <div className="container mt-4">
        <div className="row">
          <motion.div className="col-4" animate={{ opacity: [0, 1], y: [-50, 0] }} transition={{ duration: 0.5 }}>
            <div className={"card rounded-0 " + scss["border-top-3"]}>
              <div className="card-body text-center">
                <h5>Tổng số người dùng</h5>
                <div className="d-flex align-items-center justify-content-center mt-1">
                  <FontAwesomeIcon className="me-2" icon={faUsers} size="xl" beatFade />
                  <Statistic value={totalUser} formatter={formatter} />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div className="col-4" animate={{ opacity: [0, 1], y: [-50, 0] }} transition={{ duration: 0.5, delay: 0.1 }}>
            <div className={"card rounded-0 " + scss["border-top-3"]}>
              <div className="card-body text-center">
                <h5>Số bài đăng tháng <span className="text-info">{currentMonth}</span></h5>
                <div className="d-flex align-items-center justify-content-center mt-1">
                  <FontAwesomeIcon className="me-2" icon={faPenToSquare} size="xl" beatFade />
                  <Statistic value={totalPost} formatter={formatter} />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div className="col-4" animate={{ opacity: [0, 1], y: [-50, 0] }} transition={{ duration: 0.5, delay: 0.2 }}>
            <div className={"card rounded-0 " + scss["border-top-3"]}>
              <div className="card-body text-center">
                <h5>Số giao dịch tháng <span className="text-info">{currentMonth}</span></h5>
                <div className="d-flex align-items-center justify-content-center mt-1">
                  <FontAwesomeIcon className="me-2" icon={faCommentDollar} size="xl" beatFade />
                  <Statistic value={totalChange} formatter={formatter} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="row my-4">
          <motion.div className="col-6" animate={{ opacity: [0, 1], y: [100, 0] }} transition={{ duration: 0.7 }}>
            <div className="card d-flex align-items-center rounded-0">
              <h3 className="text-center my-3">Tiến độ công việc tháng <span className="text-info">{currentMonth}</span></h3>
              {pieSeries.some((value) => value > 0) ? (
                <Chart options={pieOptions} series={pieSeries} type="pie" width="470px" />
              ) : (
                <Result status="404" subTitle="Chưa có dữ liệu thống kê" />
              )}
            </div>
          </motion.div>

          <motion.div className="col-6" animate={{ opacity: [0, 1], y: [100, 0] }} transition={{ duration: 0.7 }}>
            <div className="h-100 card rounded-0">
              <h3 className="text-center mt-3">Thống kê doanh thu năm {currentYear}</h3>
              <Chart options={chartOptions} series={series} type="area" />
            </div>
          </motion.div>
        </div>

        <div className="card py-5 rounded-0">
          <div className="row">
            <div className="col-6 px-5">
              <Leaderboard title="Freelancer nổi bật" columns={columnsFreelancer} data={dataFreelancer} />
            </div>
            <div className="col-6 px-5">
              <Leaderboard title="Nhà tuyển dụng nổi bật" columns={columns} data={dataRecuiter} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;