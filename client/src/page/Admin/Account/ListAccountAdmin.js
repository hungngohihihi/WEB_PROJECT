import classNames from "classnames/bind";
import styles from "./AccountAdmin.module.scss";
import { FaSearch } from "react-icons/fa";
import TableAccountAdmin from './TableAccount/TableAccountAdmin';
import { useOutletContext } from "react-router-dom";

const cx = classNames.bind(styles);
const ListAccountAdmin = () => {
  const adminToken = useOutletContext();
  return (
    <div>
      <div className={cx("main-container")}>
        <div className={cx("card")}>
          <section className={cx("attendance")}>
            <div className={cx("attendance-list")}>
              <h1>Tài khoản admin</h1>
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
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  <TableAccountAdmin
                    id={1}
                    name={"Admin"}
                    email={"binhtrinh8122002@gmail.com"}
                    password={12345678}
                    date={"08/12/2002"}>
                  </TableAccountAdmin>
                  <TableAccountAdmin
                    id={2}
                    name={"Admin 1"}
                    email={"binhtrinh8122002@gmail.com"}
                    password={12345678}
                    date={"08/12/2002"}>
                  </TableAccountAdmin>
                  <TableAccountAdmin
                    id={3}
                    name={"Admin 2"}
                    email={"binhtrinh8122002@gmail.com"}
                    password={12345678}
                    date={"08/12/2002"}>
                  </TableAccountAdmin>
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
export default ListAccountAdmin;
