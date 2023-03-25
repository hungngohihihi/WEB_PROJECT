import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Menu.module.scss";

const cx = classNames.bind(styles);

function MenuItem({ data, onClick }) {
  const classes = cx("menu-item", {
    separate: data.separate,
  });
  return (
    <button className={classes} to={data.to} onClick={onClick}>
      <i className={cx("left-icon")}>{data.icon}</i>
      <span>{data.title}</span>
    </button>
  );
}

export default MenuItem;
