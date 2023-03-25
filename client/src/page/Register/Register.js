import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import userImg from "../../imgs/user_default.png";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { Button } from "antd";
import styles from "./Register.module.scss";
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import imgLogo from "../../imgs/logo_hqbh.png";

const cx = classNames.bind(styles);

const Register = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [accountExist, setAccountExist] = useState(false);
  const [isHidePass, setIsHidePass] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isRightDate, setIsRightDate] = useState(true);

  const handleChangeAccount = (e) => {
    setAccount(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeUserName = (e) => {
    setUserName(e.target.value);
  };
  const handleChangeDateOfBirth = (e) => {
    setDateOfBirth(e.target.value);
  };

  const checkDate = (date) => {
    const inputDate = date.split("-");
    const curDate = new Date();
    if (parseInt(inputDate[0]) > curDate.getFullYear()) return false;
    if (parseInt(inputDate[0]) === curDate.getFullYear()) {
      if (parseInt(inputDate[1]) > curDate.getMonth() + 1) return false;
      if (parseInt(inputDate[1]) === curDate.getMonth() + 1) {
        if (parseInt(inputDate[2]) >= curDate.getDate()) return false;
      }
    }
    return true;
  };
  const handleClickSubmit = async (e) => {
    e.preventDefault();
    if (account && userName && password && dateOfBirth) {
      if (!checkDate(dateOfBirth)) {
        setIsRightDate(false);
        setAccountExist(false);
        return;
      } else setIsRightDate(true);
      setIsRegistering(true);
      const res = await axios.post("/api/user/register", {
        account: account,
        password: password,
        userName: userName,
        dateOfBirth: dateOfBirth,
        avatarUrl: userImg,
      });
      setIsRegistering(false);
      if (!res?.data?.register) {
        setAccountExist(true);
      } else {
        setAccountExist(false);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Đăng ký thành công",
          confirmButtonText: '<div class="fa fa-thumbs-up"}>OK</div>',
        }).then((result) => {
          if (result.isConfirmed) setSuccess(true);
        });
      } 
    }
  };
  const handleClickLogin = () => {
    navigate("/login", { state: { isHistoryUrlRegister: true } });
  };
  useEffect(() => {
    success ? handleClickLogin() : <></>;
  }, [success]);

  useEffect(() => {
    document.title = "Register";
  }, []);

  return (
    <div className={cx("background-register")}>
      <Link className={cx("logo_link")} to="/">
        <img src={imgLogo} alt="logo" />
      </Link>
      <div className={cx("register")}>
        <h1 className={cx("register_heading")}>Đăng ký</h1>
        {accountExist ? (
          <p className={cx("notify")}>Tài khoản đã tồn tại!</p>
        ) : (
          <></>
        )}
        {!isRightDate ? (
          <p className={cx("notify")}>Vui lòng nhập lại ngày sinh!</p>
        ) : (
          <></>
        )}
        <form className={cx("register_form")} onSubmit={handleClickSubmit}>
          <label htmlFor="username" className={cx("register_label")}>
            Tên người dùng
          </label>
          <input
            type="text"
            id="username"
            required
            name="username"
            className={cx("register_input")}
            minLength={3}
            maxLength={200}
            placeholder="Nguyễn Văn A"
            onChange={handleChangeUserName}
          />
          <label htmlFor="email" className={cx("register_label")}>
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            name="email"
            className={cx("register_input")}
            minLength={3}
            maxLength={200}
            placeholder="user@gmail.com"
            onChange={handleChangeAccount}
          />
          <label htmlFor="password" className={cx("register_label")}>
            Mật khẩu
          </label>
          <div className={cx("password_input")}>
            <input
              type={isHidePass ? "password" : "text"}
              id="password"
              required
              name="password"
              className={cx("register_input")}
              minLength={6}
              maxLength={30}
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
          <label htmlFor="dateOfBirth" className={cx("register_label")}>
            Ngày sinh
          </label>
          <input
            type="date"
            id="dateOfBirth"
            required
            name="dateOfBirth"
            className={cx("register_input_date")}
            minLength={3}
            maxLength={200}
            onChange={handleChangeDateOfBirth}
          />
          {!isRegistering ? (
            <button
              className={cx(
                "register_submit",
                account && userName && password && dateOfBirth ? "primary" : ""
              )}
            >
              Đăng ký
            </button>
          ) : (
            <Button
              type="Call to Action"
              className={cx(
                "register_submit",
                account && password ? "primary" : ""
              )}
              loading
            >
              <></>
            </Button>
          )}
        </form>
        <p className={cx("register_already")}>
          <span>Bạn đã có tài khoản?</span>
          <a href="#" onClick={handleClickLogin} className={cx("login_link")}>
            Đăng nhập
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
