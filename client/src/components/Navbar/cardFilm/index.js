import classNames from "classnames/bind";
import styles from "../Navbar.module.scss";

const cx = classNames.bind(styles);

function cardFilm({ props }) {
  return (
    <a key={props.filmID} href={"/ListEpisode/" + props.filmName} className={cx("more__content")}>
      <div className={cx("more__content-img")}>
        <img src={props.url} alt="" />
      </div>
      <div className={cx("more__content-info")}>
        <h3 className={cx("film-name")}>{props.filmName}</h3>
        <div className={cx("film-info")}>
          <span className={cx("film-info-label")}>Năm Phát Hành:</span>
          <span className={cx("film-info-item")}>{props.year}</span>
        </div>
        <div className={cx("film-info")}>
          <span className={cx("film-info-label")}>Xếp Hạng:</span>
          <span className={cx("film-info-item")}>{props.point}</span>
        </div>
        <p className={cx("film-des")} dangerouslySetInnerHTML={{ __html: props.description }}></p>
      </div>
    </a>
  );
}

export default cardFilm;
