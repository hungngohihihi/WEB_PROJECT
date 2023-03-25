import classNames from "classnames/bind";
import styles from "./AccountAdmin.module.scss";
import { FaSearch } from "react-icons/fa";
import TableAccountUser from './TableAccount/TableAccountUser';
import { useOutletContext } from "react-router-dom";

const cx = classNames.bind(styles);
const ListAccountUser = () => {
  const adminToken = useOutletContext();
  return (
    <div>
      <div className={cx("main-container")}>
        <div className={cx("card")}>
          <section className={cx("attendance")}>
            <div className={cx("attendance-list")}>
              <h1>Tài khoản người dùng</h1>
              <div className={cx("header-table")}>
                <div className={cx("search")}>
                  <input type="text" placeholder="Search..."></input>
                  <a href='#'>
                    <FaSearch />
                  </a>
                </div>
              </div>
              <table className={cx("table")}>
                <thead>
                  <tr>
                  <th>ID</th>
                    <th>Tên người dùng</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Ngày sinh</th>
                    <th>Thời gian đăng ký</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  <TableAccountUser
                    id={1}
                    name={"Admin"}
                    email={"binhtrinh8122002@gmail.com"}
                    password={12345678}
                    date={"08/12/2002"}
                    dateRegister={"19:02 08/12/2002"}>
                  </TableAccountUser>
                  <TableAccountUser
                    id={2}
                    name={"Admin"}
                    email={"binhtrinh8122002@gmail.com"}
                    password={12345678}
                    date={"08/12/2002"}
                    dateRegister={"19:02 08/12/2002"}>
                  </TableAccountUser>
                  <TableAccountUser
                    id={3}
                    name={"Admin"}
                    email={"binhtrinh8122002@gmail.com"}
                    password={12345678}
                    date={"08/12/2002"}
                    dateRegister={"19:02 08/12/2002"}>
                  </TableAccountUser>
                </tbody>
              </table>
              <div className={cx("pagination")}>
                  <a class="active" href="#">1</a>
                  <a href="#">2</a>
                  <span>...</span>
                  <a href="#">3</a>
                  <a href="#">4</a>
                </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
export default ListAccountUser;
