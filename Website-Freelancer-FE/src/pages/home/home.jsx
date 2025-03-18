import scss from "./home.module.scss";
import { Row, Col, Button, Carousel, Card } from "antd";
import {
  CustomerServiceFilled,
  CarryOutFilled,
  FundFilled,
  PieChartFilled,
  TrademarkCircleFilled,
  BoxPlotFilled,
  ProjectFilled,
  SafetyCertificateFilled,
} from "@ant-design/icons";
import FancyText from "@carefully-coded/react-text-gradient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoins,
  faUserTie,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
function Home() {
  return (
    <>
      <div className="position-relative">
        <Carousel className={scss.banner} arrows autoplay infinite={true}>
          <div>
            <video className={scss.video} autoPlay loop muted playsInline>
              <source src="src/assets/video/banner.mp4" type="video/mp4" />
              Trình duyệt của bạn không hỗ trợ video.
            </video>
          </div>
          <div>
            <img src="src/assets/images/header2.jpg" />
          </div>
          <div>
            <img src="src/assets/images/header3.jpg" />
          </div>
          <div>
            <img src="src/assets/images/banner1.jpg" />
          </div>
        </Carousel>
        <div className={scss["context-banner"]}>
          <div className={scss["container-banner"]}>
            <FancyText
              className={scss.logo}
              gradient={{ from: "#cb5eee", to: "#4be1ec", type: "linear" }}
              animateTo={{ from: "#4be1ec", to: "#cb5eee" }}
              animateDuration={1500}
            >
              FREELANCER
            </FancyText>
            <h3>
              Chào mừng đến với{" "}
              <span className={scss.highlight}>Freelancer</span> Nền tảng kết
              nối <span className={scss.highlight}>chuyên gia</span> và
              <span className={scss.highlight}> doanh nghiệp</span> hàng đầu. Dù
              bạn là freelancer tìm kiếm cơ hội mới hay nhà tuyển dụng muốn hợp
              tác với những tài năng xuất sắc, chúng tôi mang đến một không gian{" "}
              <span className={scss.highlight}>chuyên nghiệp, linh hoạt</span>{" "}
              và <span className={scss.highlight}>hiệu quả</span>. <br />
              Hãy bắt đầu hành trình của bạn ngay hôm nay và tạo dựng dấu ấn
              mạnh mẽ trong lĩnh vực của mình!
            </h3>
          </div>
        </div>
      </div>

      <div className={"container mt-5 " + scss["view"]}>
        <div className={scss.card2}>
          <p className={scss.title}>Nâng Tầm Công Việc Của Bạn</p>
          <Row justify="space-around">
            <Col span={6}>
              <Card
                className={scss.cardContent}
                hoverable
                cover={
                  <FontAwesomeIcon icon={faCoins} className={scss.icon2} />
                }
              >
                <p className={scss.title2}>Miễn phí tham gia</p>
                <p className={scss.description}>
                  Đăng ký và khám phá hồ sơ của những tài năng hàng đầu, tìm
                  kiếm dự án hoặc thậm chí đặt lịch tư vấn.
                </p>
              </Card>
            </Col>
            <Col span={6}>
              <Card
                className={scss.cardContent}
                hoverable
                cover={
                  <FontAwesomeIcon icon={faUserTie} className={scss.icon3} />
                }
              >
                <p className={scss.title2}>Tuyển dụng nhân tài hàng đầu</p>
                <p className={scss.description}>
                  Tìm kiếm nhân tài không còn là nỗi lo. Bạn có thể tự đăng
                  tuyển hoặc để chúng tôi giúp tìm kiếm cho bạn!
                </p>
              </Card>
            </Col>
            <Col span={6}>
              <Card
                className={scss.cardContent}
                hoverable
                cover={
                  <FontAwesomeIcon icon={faBriefcase} className={scss.icon2} />
                }
              >
                <p className={scss.title2}>Làm việc với chuyên gia</p>
                <p className={scss.description}>
                  Freelancer giúp bạn tối ưu hóa chi phí với mức phí giao dịch
                  thấp, mang lại cơ hội hợp tác hiệu quả và tiết kiệm.
                </p>
              </Card>
            </Col>
          </Row>
        </div>

        <div className={scss.card}>
          <Row>
            <Col span={10}>
              <div className={scss.cardContent}>
                <p className={scss.title}>Doanh Nghiệp</p>
                <p className={scss.title2}>
                  Tìm <span className={scss.highlight}>nhân tài</span> xuất sắc
                  dễ dàng hơn bao giờ hết. Hợp tác cùng
                  <span className={scss.highlight}> chuyên gia</span> để bứt phá
                  <span className={scss.highlight}> doanh nghiệp.</span>
                </p>
                <div className={scss.item}>
                  <PieChartFilled className={scss.icon} />
                  <p className={scss.text}>
                    Kết nối với nhóm 1% nhân tài hàng đầu trên{" "}
                    <span className={scss.name}> Freelancer </span>và tận dụng
                    trọn bộ công cụ quản lý nhân sự hiện đại.
                  </p>
                </div>
                <div className={scss.item}>
                  <FundFilled className={scss.icon} />
                  <p className={scss.text}>
                    Lấp đầy mọi khoảng trống kỹ năng với các chuyên gia phù hợp,
                    giúp doanh nghiệp vận hành hiệu quả hơn.
                  </p>
                </div>
                <div className={scss.item}>
                  <CarryOutFilled className={scss.icon} />
                  <p className={scss.text}>
                    Kiểm soát toàn bộ quy trình làm việc – từ tuyển dụng, phân
                    công nhiệm vụ đến quản lý thanh toán, tất cả trong một nền
                    tảng.
                  </p>
                </div>
                <div className={scss.item}>
                  <CustomerServiceFilled className={scss.icon} />
                  <p className={scss.text}>
                    Đồng hành cùng{" "}
                    <span className={scss.name}> Freelancer </span> để nhận hỗ
                    trợ toàn diện, giúp bạn tối ưu hóa nguồn lực và tập trung
                    vào phát triển chiến lược.
                  </p>
                </div>
                <Button className={scss.btn}>Xem Thêm</Button>
              </div>
            </Col>
            <Col span={14}>
              <div className={scss.cardImg}>
                <img src="src/assets/images/tuyendung.jpg" alt="image" />
              </div>
            </Col>
          </Row>
        </div>

        <div className={scss.card + " mt-5"}>
          <Row>
            <Col span={14}>
              <div className={scss.cardImg}>
                <img src="src/assets/images/contain3.jpg" alt="image" />
              </div>
            </Col>
            <Col span={10}>
              <div className={scss.cardContent}>
                <p className={scss.title}>Freelancer</p>
                <p className={scss.title2}>
                  Chinh phục sự nghiệp{" "}
                  <span className={scss.highlight}>tự do</span> với các dự án{" "}
                  <span className={scss.highlight}>chất lượng</span> cao, thu
                  nhập <span className={scss.highlight}>ổn định và cơ hội</span>{" "}
                  phát triển không giới hạn.
                </p>
                <div className={scss.item}>
                  <TrademarkCircleFilled className={scss.icon} />
                  <p className={scss.text}>
                    Làm việc với khách hàng hàng đầu – Cơ hội hợp tác với những
                    thương hiệu lớn, mở rộng tầm ảnh hưởng.
                  </p>
                </div>
                <div className={scss.item}>
                  <ProjectFilled className={scss.icon} />
                  <p className={scss.text}>
                    Chọn dự án phù hợp – Chủ động thời gian và công việc bạn yêu
                    thích.
                  </p>
                </div>
                <div className={scss.item}>
                  <SafetyCertificateFilled className={scss.icon} />
                  <p className={scss.text}>
                    Thanh toán nhanh chóng, bảo vệ quyền lợi – Hệ thống thanh
                    toán minh bạch, an toàn.
                  </p>
                </div>
                <Button className={scss.btn}>Xem Thêm</Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default Home;
