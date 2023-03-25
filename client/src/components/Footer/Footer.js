import imgLogo from "../../imgs/logo_hqbh.png";
import imgIconGooglePlay from "../../imgs/googleplay.png";
import imgIconSmartTV from "../../imgs/smartTV.png";
import imgIconAppStore from "../../imgs/appstore.png";

import styles from "./Footer.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const Footer = () => {
  return (
    // html
    <footer className={cx("footer")}>
      <div className={cx("footer_content")}>
        <div className={cx("footer_overview")}>
          <Link to="/">
            <img className={cx("footer_logo")} src={imgLogo} alt="" />
          </Link>
          <p>
            Mạng xã hội chia sẻ các nội dung video giải trí chất lượng cao, phù
            hợp mọi độ tuổi và an toàn cho trẻ em.
          </p>
          <div className={cx("footer_icon")}>
            <a href="#">
              <img src={imgIconAppStore} />
            </a>
            <a href="#">
              <img src={imgIconGooglePlay} />
            </a>
            <a href="#">
              <img src={imgIconSmartTV} />
            </a>
          </div>
        </div>
        <div className={cx("footer_category")}>
          <h6>Nội dung</h6>
          <div className={cx("flex-container")}>
            <div className={cx("footer_category_content")}>
              <ul>
                <li>
                  <a href="#">
                    <p>Trang Chủ</p>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <p>Truyện Tranh</p>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <p>Originals</p>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <p>Anime</p>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <p>Show</p>
                  </a>
                </li>
              </ul>
            </div>
            <div className={cx("footer_category_content")}>
              <ul>
                <li>
                  <a href="#">
                    <p>Âm nhạc</p>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <p>Series</p>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <p>Thiếu nhi</p>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <p>Giáo dục</p>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <p>Giải trí</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={cx("footer_category")}>
          <h6>Hỗ trợ</h6>
          <div className={cx("flex-container")}>
            <div className={cx("footer_category_content")}>
              <ul>
                <li>
                  <a href="#">
                    <p>FAQs</p>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <p>Chính Sách Về Quyền Riêng Tư</p>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <p>Điều Khoản Và Điều Kiện Sự Dụng</p>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <p>Điều Khoản Thanh Toán</p>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <p>Chính Sách Và Quy Trình Sử Lý Khiếu Nại</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={cx("footer_category")}>
          <h6>Thông tin liên hệ</h6>
          <div className={cx("flex-container")}>
            <div className={cx("footer_category_content")}>
              <ul>
                <li>
                  <a href="#">
                    <p>Add:</p>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <p>Tel:</p>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <p>Mail:</p>
                  </a>
                </li>
              </ul>
            </div>
            <div className={cx("footer_category_content")}>
              <ul>
                <li>
                  <a href="#">
                    <p>Hoàng Đạo Thúy, Thanh Xuân</p>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <p>0374 989 546</p>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <p>binhtrinh8122002@gmail.com</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
