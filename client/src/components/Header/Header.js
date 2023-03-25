import { useState, useEffect } from "react";
import axios from "axios";
import { CaretDownOutlined } from "@ant-design/icons";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import HeadlessTippy from "@tippyjs/react/headless";

import styles from "./Header.module.scss";
import imgLogo from "../../imgs/logo_hqbh.png";
import User from "./User/User";
import Search from "./Search";
import Category from "./Category/Category";

const cx = classNames.bind(styles);

const Header = ({ user, setIsSignUp, category }) => {
  const [films, setFilms] = useState();
  const [isHasData, setIsHasData] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [categoryState, setCategoryState] = useState("");
  const getDataFilms = async () => {
    setIsHasData(false);
    const res = await axios.get("/api/film/getFilm");
    setFilms(res.data);
    setIsHasData(true);
  };

  useEffect(() => {
    setCategoryState(category);
  }, [category]);

  useEffect(() => {
    getDataFilms();
    window.addEventListener("scroll", (e) => {
      if (window.pageYOffset > 0) {
        setScroll(true);
      } else setScroll(false);
    });
  }, []);
  return (
    <header
      className={
        scroll ? cx("header", "background-header-scroll") : cx("header")
      }
    >
      <div className={cx("logo")}>
        <a href="/">
          <img src={imgLogo} alt="logo" />
        </a>
      </div>
      <nav className={cx("container")}>
        <ul className={cx("header_nav_links")}>
          <Category
            categoryHome={categoryState}
            categoryName={"Hành động"}
          ></Category>
          <Category
            categoryHome={categoryState}
            categoryName={"Hài hước"}
          ></Category>
          <Category
            categoryHome={categoryState}
            categoryName={"Phiêu lưu"}
          ></Category>
          <Category
            categoryHome={categoryState}
            categoryName={"Tiên hiệp"}
          ></Category>
          <Category
            categoryHome={categoryState}
            categoryName={"Học đường"}
          ></Category>
        </ul>
        <HeadlessTippy
          interactive
          appendTo={document.body}
          placement="bottom"
          render={(attrs) => (
            <div className={cx("box")} tabIndex="-1" {...attrs}>
              <Category
                categoryHome={categoryState}
                categoryName={"Hành động"}
              ></Category>
              <Category
                categoryHome={categoryState}
                categoryName={"Hài hước"}
              ></Category>
              <Category
                categoryHome={categoryState}
                categoryName={"Phiêu lưu"}
              ></Category>
              <Category
                categoryHome={categoryState}
                categoryName={"Tiên hiệp"}
              ></Category>
              <Category
                categoryHome={categoryState}
                categoryName={"Học đường"}
              ></Category>
            </div>
          )}
        >
          <div className={cx("more")}>
            <span className={cx("more-name")}>Thể Loại</span>
            <CaretDownOutlined className={cx("more-icon")} />
          </div>
        </HeadlessTippy>
      </nav>
      <div className={cx("right-content")}>
        {isHasData ? <Search films={films}></Search> : <></>}
        {!user?.userId ? (
          <>
            <Link className={cx("cta")} to="/Register">
              <button className={cx("header_register")}>ĐĂNG KÝ</button>
            </Link>
            <Link className={cx("cta")} to="/Login">
              <button className={cx("header_login")}>ĐĂNG NHẬP</button>
            </Link>
            <User setIsSignUp={setIsSignUp}></User>
          </>
        ) : (
          <User user={user} setIsSignUp={setIsSignUp}></User>
        )}
      </div>
    </header>
  );
};

export default Header;
