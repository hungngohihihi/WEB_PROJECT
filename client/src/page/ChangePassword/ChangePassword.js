import axios from "axios";
import { useState, useEffect } from "react";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import classNames from "classnames/bind";
import Swal from "sweetalert2";
import styles from "./ChangePassword.module.scss";
import imgLogo from "../../imgs/logo_hqbh.png";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const ChangePassword = () => {
  const [account, setAccount] = useState();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");
  const [isHideOldPass, setIsHideOldPass] = useState(true);
  const [isHideNewPass, setIsHideNewPass] = useState(true);
  const [isHideReNewPass, setIsHideReNewPass] = useState(true);
  const [isChanging, setIsChanging] = useState(false);
  const [isEqualPassword, setIsEqualPassword] = useState(true);
  const [isEqualOldNewPassword, setIsEqualOldNewPassword] = useState(true);

  const handleChangeAccount = (e) => {
    setAccount(e.target.value);
  };
  const handleChangeOldPassword = (e) => {
    setOldPassword(e.target.value);
  };
  const handleChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
  };
  const handleChangeReNewPassword = (e) => {
    setReNewPassword(e.target.value);
  };
  const handleClickSubmit = async (e) => {
    e.preventDefault();
    if (account && oldPassword && newPassword && reNewPassword) {
      if (newPassword !== reNewPassword) {
        setIsEqualPassword(false);
        return;
      }
      if (oldPassword === newPassword) {
        setIsEqualOldNewPassword(false);
        return;
      }
      setIsChanging(true);
      const req = await axios.post("/api/user/changePassword", {
        account: account,
        oldPassword: oldPassword,
        newPassword: newPassword,
      });
      if (req.data.change) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Đổi mật khẩu thành công",
          confirmButtonText: '<div class="fa fa-thumbs-up"}>OK</div>',
        });
      }
      setIsChanging(false);
    }
  };
  useEffect(() => {
    document.title = "ChangePassword";
  }, []);

  return (
    <div className={cx("background-form")}>
      <Link className={cx("logo_link")} to="/">
        <img src={imgLogo} alt="logo" />
      </Link>
      <div className={cx("form")}>
        <h1 className={cx("form_heading")}>Đổi mật khẩu</h1>

        <form className={cx("form_form")} onSubmit={handleClickSubmit}>
          <label htmlFor="username" className={cx("form_label")}>
            Tên đăng nhập
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className={cx("form_input")}
            placeholder="user@gmail.com"
            onChange={handleChangeAccount}
          />
          <label htmlFor="oldPassword" className={cx("form_label")}>
            Mật khẩu cũ
          </label>
          <div className={cx("oldPassword_input")}>
            <input
              type={isHideOldPass ? "password" : "text"}
              id="oldPassword"
              required
              name="oldPassword"
              className={cx("form_input")}
              placeholder="*********"
              onChange={handleChangeOldPassword}
            />
            <div className={cx("hide_icon")}>
              {isHideOldPass ? (
                <EyeFilled onClick={() => setIsHideOldPass(false)} />
              ) : (
                <EyeInvisibleFilled onClick={() => setIsHideOldPass(true)} />
              )}
            </div>
          </div>
          {!isEqualOldNewPassword ? (
            <p className={cx("notify")}>Mật khẩu mới phải khác mật khẩu cũ!</p>
          ) : (
            <></>
          )}
          <div className={cx("newPassword_input")}>
            <label htmlFor="newPassword" className={cx("form_label")}>
              Mật khẩu mới
            </label>
            <input
              type={isHideReNewPass ? "password" : "text"}
              id="newPassword"
              required
              name="newPassword"
              className={cx("form_input")}
              minLength={6}
              maxLength={30}
              placeholder="*********"
              onChange={handleChangeNewPassword}
            />
            <div className={cx("hide_icon")}>
              {isHideReNewPass ? (
                <EyeFilled onClick={() => setIsHideReNewPass(false)} />
              ) : (
                <EyeInvisibleFilled onClick={() => setIsHideReNewPass(true)} />
              )}
            </div>
          </div>
          {!isEqualPassword ? (
            <p className={cx("notify")}>Mật khẩu mới phải giống nhau!</p>
          ) : (
            <></>
          )}
          <div className={cx("reNewPassword_input")}>
            <label htmlFor="reNewPassword" className={cx("form_label")}>
              Nhập lại mật khẩu mới
            </label>
            <input
              type={isHideNewPass ? "password" : "text"}
              id="reNewPassword"
              required
              name="reNewPassword"
              className={cx("form_input")}
              placeholder="*********"
              onChange={handleChangeReNewPassword}
            />
            <div className={cx("hide_icon")}>
              {isHideNewPass ? (
                <EyeFilled onClick={() => setIsHideNewPass(false)} />
              ) : (
                <EyeInvisibleFilled onClick={() => setIsHideNewPass(true)} />
              )}
            </div>
          </div>
          {!isChanging ? (
            <button
              className={cx(
                "form_submit",
                account && oldPassword && newPassword && reNewPassword
                  ? "primary"
                  : ""
              )}
            >
              Đổi mật khẩu
            </button>
          ) : (
            <Button
              type="Call to Action"
              className={cx(
                "form_submit",
                account && oldPassword && newPassword && reNewPassword
                  ? "primary"
                  : ""
              )}
              loading
            >
              <></>
            </Button>
          )}
          <Link to="/" className={cx("back-link")}>
            Quay Lại
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
