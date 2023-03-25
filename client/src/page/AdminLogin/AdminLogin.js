import classNames from "classnames/bind";
import styles from "./AdminLogin.module.scss";
import { useNavigate } from "react-router-dom";

import imgLogo from "../../imgs/logo_hqbh.png";
import { useState } from "react";
import axios from "axios";

const cx = classNames.bind(styles);
const AdminLogin = ({ setIsAdminLogin }) => {
  const navigate = useNavigate();
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginSucces, setIsLoginSucces] = useState(true);
  const handleOnChangeAccount = (e) => {
    setAccount(e.target.value);
  }
  const handleOnChangePassword = (e) => {
    setPassword(e.target.value);
  }
  const handleSubmmit = async (e) => {
    e.preventDefault();
    if (account && password) {
      try {
        const res = await axios.post("/api/admin/login", {
          account: account,
          password: password,
        })
        const token = res.data;
        console.log(token);
        if (token) {
          localStorage.setItem("adminToken", token);
          setIsAdminLogin(true);
          navigate("/Admin");
        }
        else {
          setIsLoginSucces(false);
        }
      }
      catch (error) {
        if (error.response.status === 401)
          setIsLoginSucces(false);
        else console.log(error);
      }
    }
  }
  return (
    <div>
      <div className={cx("body")}>
        <section className={cx("wrapper")}>
          <div className={cx("form_header", "login")}>
            <p>Đăng Nhập Admin</p>
            {!isLoginSucces ? (
              <p className={cx("notify")}>Tài khoản hoặc mật khẩu không đúng!</p>
            ) : (
              <></>
            )}
            <form className={cx("form-admin")} action="#" onSubmit={handleSubmmit}>
              <input type="text" placeholder="Tài khoản" onChange={handleOnChangeAccount} required />
              <input type="password" placeholder="Mật khẩu" onChange={handleOnChangePassword} required />
              <div className={cx("checkbox")}>
                <input type="checkbox" id="loginCheck" />
                <label htmlFor="loginCheck">Nhớ mật khẩu ?</label>
              </div>
              <button className={cx("submit")} type="submit">Đăng nhập</button>
            </form>
          </div>
          <div className={cx("form_header", "logo")}>
            <img src={imgLogo} />
          </div>
        </section>
      </div>
    </div>
  );
};
export default AdminLogin;
