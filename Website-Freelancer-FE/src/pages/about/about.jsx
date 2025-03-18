import CardAbout from "@components/card/card";
import scss from "./about.module.scss";
import { Row, Col, Image, Button } from "antd";
import React from "react";
import {
  CustomerServiceFilled,
  CarryOutFilled,
  FundFilled,
  PieChartFilled,
} from "@ant-design/icons";

const arrays = [
  {
    fullName: "Nguyễn Tấn Tài",
    description: "Là một lập trình viên backend giàu kinh nghiệm, tôi chuyên thiết kế, phát triển và tối ưu hóa hệ thống backend, API, đảm bảo hiệu suất và bảo mật cao. Với kỹ năng quản lý nhóm và tư duy chiến lược, tôi thường xuyên đảm nhận vai trò leader, dẫn dắt đội ngũ hoàn thành dự án đúng tiến độ, tối ưu workflow và đảm bảo chất lượng mã nguồn. Tôi luôn tìm kiếm giải pháp tối ưu để cải thiện hệ thống và nâng cao trải nghiệm người dùng.",
  },
  {
    fullName: "Nguyễn Thị Ngọc Nghi",
    description: "Là một lập trình viên frontend đam mê sáng tạo, tôi chuyên xây dựng giao diện trực quan, tối ưu trải nghiệm người dùng và phát triển các hiệu ứng tương tác mượt mà. Với nền tảng vững chắc về HTML, CSS, JavaScript và các framework hiện đại như Vue.js, React.js, tôi không chỉ tập trung vào giao diện mà còn đảm bảo logic frontend hoạt động hiệu quả, kết nối mượt mà với backend. ",
  },
  {
    fullName: "Nguyễn Long Nhi",
    description: "Tôi chuyên về cơ sở dữ liệu và kết nối API, đảm bảo hệ thống lưu trữ dữ liệu an toàn, tối ưu và hoạt động hiệu quả. Với kinh nghiệm làm việc trên SQL, NoSQL và tối ưu truy vấn, tôi giúp duy trì luồng dữ liệu ổn định giữa backend và frontend, hỗ trợ hệ thống mở rộng linh hoạt",
  },
  {
    fullName: "Trần Minh Tiến",
    description: "Tôi chuyên về lập trình, cơ sở dữ liệu, đảm bảo hệ thống lưu trữ và truy xuất dữ liệu nhanh, bảo mật. Thành thạo SQL, NoSQL và tối ưu truy vấn, tôi cũng chịu trách nhiệm kết nối API, giúp luồng dữ liệu hoạt động trơn tru giữa các hệ thống.",
  },
  {
    fullName: "Ngô Gia Huy",
    description: "Là một chuyên gia về cơ sở dữ liệu, tôi chịu trách nhiệm thiết kế, tối ưu và quản lý hệ thống dữ liệu, đảm bảo hiệu suất và bảo mật cao. Tôi có kinh nghiệm làm việc với các hệ quản trị cơ sở dữ liệu như MySQL, PostgreSQL, SQL Server và NoSQL. Bên cạnh đó, tôi cũng thành thạo trong việc kết nối và tương tác với API, đảm bảo luồng dữ liệu giữa backend và frontend diễn ra mượt mà, ổn định. Tôi luôn tìm cách tối ưu truy vấn, cải thiện tốc độ xử lý dữ liệu và xây dựng hệ thống lưu trữ linh hoạt, mở rộng dễ dàng.",
  },
  {
    fullName: "Nguyễn Khánh Duy",
    description: "Là một lập trình viên chuyên về cơ sở dữ liệu và kết nối hệ thống, tôi đảm nhận việc thiết kế, tối ưu hóa và bảo trì các hệ thống lưu trữ dữ liệu, đảm bảo hiệu suất cao và bảo mật chặt chẽ. Tôi có kinh nghiệm làm việc với các hệ quản trị như MySQL, PostgreSQL, SQL Server và NoSQL, giúp xây dựng kiến trúc dữ liệu linh hoạt, dễ mở rộng. Ngoài ra, tôi cũng phát triển và tối ưu API, đảm bảo luồng dữ liệu giữa các hệ thống backend và frontend diễn ra nhanh chóng, ổn định.",
  },
];
function About() {
  return (
    <div>
      <div className={"container"}>
        <Row className={"mb-5"} gutter={[16, 120]}>
          {arrays.map((item, index) => (
            <Col key={index} className={scss.div1} span={8}>
              <CardAbout
                image="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                context={item.fullName}
                context1={item.description}
              />
            </Col>
          ))}
        </Row>
        <div className={scss.cardimg + " mt-5"}>
          <img src="src/assets/images/img_about.webp" />
          <div className={scss.cardAbsolute}>
            <div className={scss.cardBody}>
              <p className={scss.title}>
                Freelancer – Kết nối nhanh, việc làm chất, thu nhập minh bạch!
              </p>
              <p className={scss.description}>
                Tìm kiếm cơ hội, làm chủ thời gian, nhận thanh toán an toàn –
                tất cả có tại Freelancer!
              </p>
            </div>
          </div>
        </div>

        <div className={scss.card}>
          <Row>
            <Col span={10}>
              <div className={scss.cardContent}>
                <p className={scss.title}>Về Chúng Tôi</p>
                <div className={scss.item}>
                  <PieChartFilled className={scss.icon} />
                  <div className={scss.context}>
                    <p className={scss.title2}>Tìm việc nhanh chóng</p>
                    <p className={scss.text}>
                      Không cần chờ đợi! Tìm việc làm phù hợp với kỹ năng của
                      bạn chỉ trong vài cú click. Kết nối ngay với nhà tuyển
                      dụng và bắt đầu hành trình mới của bạn hôm nay!
                    </p>
                  </div>
                </div>
                <div className={scss.item}>
                  <PieChartFilled className={scss.icon} />
                  <div className={scss.context}>
                    <p className={scss.title2}>Dòng tiền minh bạch</p>
                    <p className={scss.text}>
                      Mọi giao dịch đều rõ ràng, đảm bảo thanh toán công bằng và
                      đúng hạn. Hệ thống quản lý dòng tiền thông minh giúp bạn
                      yên tâm làm việc mà không lo rủi ro tài chính!
                    </p>
                  </div>
                </div>
                <div className={scss.item}>
                  <PieChartFilled className={scss.icon} />
                  <div className={scss.context}>
                    <p className={scss.title2}>
                      Bảo vệ quyền lợi Freelancer – Hợp tác chuyên nghiệp
                    </p>
                    <p className={scss.text}>
                      Chúng tôi cam kết xây dựng một môi trường làm việc công
                      bằng, minh bạch. Từ hợp đồng thông minh đến chính sách đảm
                      bảo thanh toán, bạn hoàn toàn yên tâm khi nhận dự án và
                      tập trung phát triển sự nghiệp của mình.
                    </p>
                  </div>
                </div>
                <div className={scss.item}>
                  <PieChartFilled className={scss.icon} />
                  <div className={scss.context}>
                    <p className={scss.title2}>
                      Nâng tầm sự nghiệp Freelancer với công nghệ AI
                    </p>
                    <p className={scss.text}>
                      Với hệ thống đề xuất công việc thông minh, đánh giá kỹ
                      năng chuẩn xác, chúng tôi giúp bạn dễ dàng tìm kiếm cơ hội
                      phù hợp nhất. Chỉ cần đăng ký, tạo hồ sơ – các dự án chất
                      lượng sẽ tự động tìm đến bạn!
                    </p>
                  </div>
                </div>
                <Button className={scss.btn}>Xem Thêm</Button>
              </div>
            </Col>
            <Col span={14}>
              <div className={scss.cardImg}>
                <img src="src/assets/images/header2.jpg" alt="image" />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default About;
