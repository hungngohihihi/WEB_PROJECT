import { Carousel } from "react-bootstrap";
import classNames from "classnames/bind";
import styles from "./SlideHome.module.scss";

import ItemSlide from "./ItemSlide/ItemSlide";
import imgSlideHome from "../../../imgs/slideHome/one-piece.jpg";
import imgSlideHome2 from "../../../imgs/slideHome/hinh-anh-kimetsu-no-yaiba.jpg";
import imgSlideHome3 from "../../../imgs/slideHome/asta-black-clover-4k-uhdpaper.com-497.0_b-thumbnail.jpg";

const cx = classNames.bind(styles);
const SlideHome = (props) => {
  return (
    <div className={cx("slide")}>
      <Carousel interval={2000} fade controls={false} pause={false}>
        <Carousel.Item>
          <ItemSlide
            img={imgSlideHome}
            filmName={"One Piece"}
            year={1999}
            href={"/ListEpisode/One Piece"}
          ></ItemSlide>
        </Carousel.Item>
        <Carousel.Item>
          <ItemSlide
            img={imgSlideHome2}
            filmName={"Kimetsu no yaiba"}
            year={2020}
            href={"/ListEpisode/Kimetsu no yaiba"}
          ></ItemSlide>
        </Carousel.Item>
        <Carousel.Item>
          <ItemSlide
            img={imgSlideHome3}
            filmName={"Black Clover"}
            year={2017}
            href={"/ListEpisode/Black Clover"}
          ></ItemSlide>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default SlideHome;
