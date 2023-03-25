import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { RollbackOutlined } from "@ant-design/icons";

import styles from "./Menu.module.scss";

const cx = classNames.bind(styles);

function Header({ title, onBack }) {
  return (
    <header className={cx("header")}>
      <button className={cx("back-btn")} onClick={onBack}>
        <RollbackOutlined />
      </button>

      <h3 className={cx("header-title")}>{title}</h3>
    </header>
  );
}

export default Header;
