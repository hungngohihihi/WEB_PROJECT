import classNames from "classnames/bind";
import styles from "./TableFilm.module.scss";

const cx = classNames.bind(styles);
const TableFilm = (props) => {
  return (
    <tr>
      <td>{props.id}</td>
      <td>
        <img className={cx("list_img")} src={props.avatar}></img>
      </td>
      <td>{props.name}</td>
      <td>{props.category}</td>
      <td>{props.countEpisode}</td>
      <td>{props.time}</td>
      <td className={cx("interactive")}>
        <button>Sửa</button>
        <button onClick={() => props.callBack(props.id)}>Xóa</button>
      </td>
    </tr>
  );
};
export default TableFilm;
