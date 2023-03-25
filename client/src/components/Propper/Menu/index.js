import classNames from "classnames/bind";
import Tippy from "@tippyjs/react/headless";
import { useNavigate } from "react-router-dom";

import { Wrapper as PopperWrapper } from "../../Propper";
import styles from "./Menu.module.scss";
import MenuItem from "./MenuItem";
import Header from "./Header";
import { useState } from "react";

const cx = classNames.bind(styles);

const defaultFn = () => {};

function Menu({
  children,
  items = [],
  hideOnClick = false,
  onChange = defaultFn,
  callBack,
}) {
  const navigate = useNavigate();
  const [history, setHistory] = useState([{ data: items }]);
  const current = history[history.length - 1];

  const renderItems = () => {
    return current.data.map((item, index) => {
      const isParent = !!item.children;

      return (
        <MenuItem
          key={index}
          data={item}
          onClick={() => {
            if (item.title === "Log out") callBack();
            else if (item.title === "Change Password")
              navigate("/ChangePassword");
            else if (item.title === "Login") navigate("/Login");
            else if (item.title === "Register") navigate("/Register");
            else if (isParent) {
              setHistory((prev) => [...prev, item.children]);
            } else {
              onChange(item);
            }
          }}
        ></MenuItem>
      );
    });
  };

  return (
    <Tippy
      interactive
      delay={[0, 700]}
      appendTo={document.body}
      placement="bottom"
      hideOnClick={hideOnClick}
      render={(attrs) => (
        <div className={cx("menu-list")} tapindex="-1" {...attrs}>
          <PopperWrapper className={cx("menu-popper")}>
            {history.length > 1 && (
              <Header
                title={current.title}
                onBack={() => {
                  setHistory((prev) => prev.slice(0, prev.length - 1));
                }}
              ></Header>
            )}
            <div className={cx("menu-body")}>{renderItems()}</div>
          </PopperWrapper>
        </div>
      )}
      onHide={() => {
        setHistory((prev) => prev.slice(0, 1));
      }}
    >
      {children}
    </Tippy>
  );
}

export default Menu;
