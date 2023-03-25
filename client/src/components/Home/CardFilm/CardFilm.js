import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./CardFilm.module.scss";
const cx = classNames.bind(styles);
const CardFilm = (props) => {
  return (
    <a href={props.href} className={cx("film-card")}>
      <div className={cx("content-card")}>
        {props.duration?.includes("phút") ?
          <button className={cx("practice")}>{props.duration}</button>
          :
          <button className={cx("practice")}>{props.episode} / {props.duration}</button>
        }

      </div>
      <div className={cx("image-card")}>
        <img src={props.imgUrl} alt="" className={cx("film-img")} loading="lazy"/>
      </div>
      <div className={cx("text-card")}>
        <span className={cx("name")}>{props.name}</span>
      </div>
    </a>
  );
};
export default CardFilm;
