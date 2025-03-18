import scss from "./Footer.module.scss";
import FancyText from "@carefully-coded/react-text-gradient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faPinterest,
  faSkype,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
function Footer() {
  return (
    <footer className={scss.footer_area}>
      <div className={scss.container}>
        <div className={scss.row}>
          {/* Single Widget */}
          <div className={`${scss.col} ${scss.colLg4}`}>
            <FancyText
              className={scss.logo}
              gradient={{ from: "#cb5eee", to: "#4be1ec", type: "linear" }}
              animateTo={{ from: "#4be1ec", to: "#cb5eee" }}
              animateDuration={1500}
              onClick={() => navigate("/")}
            >
              FREELANCER
            </FancyText>
            <div
              className={`${scss.single_footer_widget} ${scss.section_padding}`}
            >
              <div className={scss.footer_logo}></div>
              <p>
              Freelancer là nền tảng kết nối giữa doanh nghiệp và freelancer, mang đến cơ hội việc làm đa dạng,<br /> minh bạch và an toàn.
              </p>
              <div className={scss.copywrite_text}>
                <p>
                  Được thực hiện bởi
                  <a href="https://wrapbootstrap.com/user/DesigningWorld">
                    Bug-free Zone
                  </a>
                </p>
              </div>
              <div className={scss.footer_social_area}>
                <a href="#" title="Facebook">
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a href="#" title="Pinterest">
                  <FontAwesomeIcon icon={faPinterest} />
                </a>
                <a href="#" title="Skype">
                  <FontAwesomeIcon icon={faSkype} />
                </a>
                <a href="#" title="Twitter">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </div>
            </div>
          </div>

          {/* About Widget */}
          <div className={scss.col}>
            <div
              className={`${scss.single_footer_widget} ${scss.section_padding}`}
            >
              <h5 className={scss.widget_title}>Giới thiệu</h5>
              <div className={scss.footer_menu}>
                <ul>
                  <li>
                    <a href="#">Giới thiệu về chúng tôi</a>
                  </li>
                  <li>
                    <a href="#">Doanh nghiệp</a>
                  </li>
                  <li>
                    <a href="#">Điều khoản &amp; Chính sách</a>
                  </li>
                  <li>
                    <a href="#">Cộng đồng</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Support Widget */}
          <div className={scss.col}>
            <div
              className={`${scss.single_footer_widget} ${scss.section_padding}`}
            >
              <h5 className={scss.widget_title}>Hỗ trợ</h5>
              <div className={scss.footer_menu}>
                <ul>
                  <li>
                    <a href="#">Chính sách bảo mật</a>
                  </li>
                  <li>
                    <a href="#">Điều khoản &amp; Điều kiện</a>
                  </li>
                  <li>
                    <a href="#">Giúp đỡ &amp; Hỗ trợ</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Widget */}
          <div className={scss.col}>
            <div
              className={`${scss.single_footer_widget} ${scss.section_padding}`}
            >
              <h5 className={scss.widget_title}>Liên hệ</h5>
              <div className={scss.footer_menu}>
                <ul>
                  <li>
                    <a href="#">Trung tâm cuộc gọi</a>
                  </li>
                  <li>
                    <a href="#">Email</a>
                  </li>
                  <li>
                    <a href="#">Điều khoản &amp; Điều kiện</a>
                  </li>
                  <li>
                    <a href="#">Trung tâm trợ giúp</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
