import classNames from "classnames/bind";
import styles from "./TableAccount.module.scss";

const cx = classNames.bind(styles);
const TableAccountAdmin = (props) => {
    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.name}</td>
            <td>{props.email}</td>
            <td>{props.password}</td>
            <td>{props.date}</td>
            <td className={cx("interactive")}><button>Sửa</button> <button>Xóa</button></td>
        </tr>
    );
};
export default TableAccountAdmin;