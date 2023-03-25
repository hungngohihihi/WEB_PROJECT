import { Container, Row, Col } from "react-bootstrap";
import classNames from "classnames/bind";
import styles from "./AccountAdmin.module.scss";
import { useOutletContext } from "react-router-dom";

const cx = classNames.bind(styles);
const AddAccountAdmin = () => {
  const adminToken = useOutletContext();
  return (
    <div>
      <div className={cx("main-container")}>
        <div className={cx("card")}>
          <section className={cx("container")}>
            <form action="#" className={cx("form")}>
              <h1>Thêm tài khoản admin</h1>
              <div className={cx("input-box")}>
                <label>Avatar</label>
                <input type="file" name="imageEpisode" id="imageEpisode" required />
              </div>
              <div className={cx("input-box")}>
                <label>Tên người dùng</label>
                <input type="text" name="adminName" id="adminName" placeholder="Tên người dùng" required />
              </div>

              <div className={cx("input-box")}>
                <label>Email</label>
                <input type="email" name="account" id="account" placeholder="Email" required />
              </div>

              <div className={cx("input-box")}>
                <label>Password</label>
                <input type="text" name="password" id="password" equired minLength={8} maxLength={16} placeholder="Password" required />
              </div>

              <div className={cx("input-box")}>
                <label>Ngày tạo</label>
                <input type="date" name="createAt" id="createAt" required />
              </div>

              <button type="submit" name="sumbmit_add_film">Lưu</button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};
export default AddAccountAdmin;
