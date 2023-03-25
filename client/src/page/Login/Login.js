import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "antd";
import React from "react";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import styles from "./Login.module.scss";
import classNames from "classnames/bind";
import { useNavigate, useLocation, Link } from "react-router-dom";
import imgLogo from "../../imgs/logo_hqbh.png";

const cx = classNames.bind(styles);

const Login = ({ setIsSignUp }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [account, setAccount] = useState();
  const [password, setPassword] = useState();
  const [isLoginSucces, setIsLoginSucces] = useState(true);
  const [isLogining, setIsLogining] = useState(false);
  const [isHidePass, setIsHidePass] = useState(true);

  const handleChangeAccount = (e) => {
    setAccount(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleClickSubmit = async (e) => {
    e.preventDefault();
    if (account && password) {
      setIsLogining(true);
      const res = await axios.post("/api/user/signUp", {
        account: account,
        password: password,
      });
      setIsLogining(false);
      if (res.data.login) {
        localStorage.setItem("userId", res.data.id);
        localStorage.setItem("userName", res.data.userName);
        localStorage.setItem("avatar", res.data.avatar);
        setIsSignUp(true);
        const text = "Welcome " + res.data.userName;
        if(!location.state?.isHistoryUrlRegister) navigate(-1);
        else navigate("/")
        setIsLoginSucces(true);
      } else setIsLoginSucces(false);
    }
  };

  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <div className={cx("background-login")}>
      <Link className={cx("logo_link")} to="/">
        <img src={imgLogo} alt="logo" />
      </Link>
      <form id="form" className={cx("login")} onSubmit={handleClickSubmit}>
        <h1 className={cx("login_heading")}>Đăng nhập</h1>
        {!isLoginSucces ? (
          <p className={cx("notify")}>Tài khoản hoặc mật khẩu không đúng!</p>
        ) : (
          <></>
        )}
        <div className={cx("login_form")}>
          <label htmlFor="account" className={cx("login_label")}>
            Tên đăng nhập
          </label>
          <input
            type="email"
            id="account"
            required
            name="account"
            className={cx("login_input")}
            placeholder="user@gmail.com"
            onChange={handleChangeAccount}
          />
          <label htmlFor="password" className={cx("login_label")}>
            Mật khẩu
          </label>
          <div className={cx("password_input")}>
            <input
              type={isHidePass ? "password" : "text"}
              id="password"
              required
              name="password"
              className={cx("login_input")}
              placeholder="*********"
              onChange={handleChangePassword}
            />
            <div className={cx("hide_icon")}>
              {isHidePass ? (
                <EyeFilled onClick={() => setIsHidePass(false)} />
              ) : (
                <EyeInvisibleFilled onClick={() => setIsHidePass(true)} />
              )}
            </div>
          </div>
          {!isLogining ? (
            <button
              className={cx(
                "login_submit",
                account && password ? "primary" : ""
              )}
            >
              Đăng nhập
            </button>
          ) : (
            <Button
              type="Call to Action"
              className={cx(
                "login_submit",
                account && password ? "primary" : ""
              )}
              loading
            >
              <></>
            </Button>
          )}
        </div>
        <div className={cx("login_already")}>
          <Link to="#" className={cx("forgotpass_link")}>
            Quên mật khẩu?
          </Link>
          <span>Bạn chưa có tài khoản?</span>
          <Link to="/Register" className={cx("register_link")}>
            Đăng ký
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
