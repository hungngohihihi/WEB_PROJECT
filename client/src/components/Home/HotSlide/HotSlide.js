import classNames from "classnames/bind";

import styles from "./HotSlide.module.scss";

const cx = classNames.bind(styles);

const HotSlide = (props) => {
  return (
    <a href={props.href} className={cx(props.classname)}>
      <img className={cx("mySlides-img")} src={props.img} />
    </a>
  );
};
export default HotSlide;
