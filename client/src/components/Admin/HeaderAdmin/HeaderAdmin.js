import imgLogo from "../../../imgs/logo_hqbh.png";
import classNames from "classnames/bind";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import styles from "./HeaderAdmin.module.scss";

import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa";

const cx = classNames.bind(styles);

const HeaderAdmin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/AdminLogin");
  };

  return (
    <>
      <header className={cx("header")}>
        <div className={cx("header-menu")}>
          <img className={cx("header-logo")} src={imgLogo}></img>
          <ul>
            <li>
              <a href="#">
                <p>
                  <FaBell />
                </p>
              </a>
            </li>
            <Tippy content="Đăng Xuất" theme="light-border">
              <li>
                <a href="#" onClick={handleLogout}>
                  <p>
                    <FaPowerOff />
                  </p>
                </a>
              </li>
            </Tippy>
          </ul>
        </div>
      </header>
    </>
  );
};

export default HeaderAdmin;
