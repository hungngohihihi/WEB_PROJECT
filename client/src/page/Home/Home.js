import { Row, Col } from "antd";
import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import { Link, useParams, useSearchParams } from "react-router-dom";

import styles from "./Home.module.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import HotSlide from "../../components/Home/HotSlide/HotSlide";
import CardFilm from "../../components/Home/CardFilm/CardFilm";
import SlideHome from "../../components/Home/SlideHome/SlideHome";

import imgSlideUp1 from "../../imgs/HotSlide/one_piece.png";
import imgSlideUp2 from "../../imgs/HotSlide/doraemon.png";
import imgSlideUp3 from "../../imgs/HotSlide/naruto.png";
import imgSlideUp4 from "../../imgs/HotSlide/demon_slayder.png";
import imgSlideUp5 from "../../imgs/HotSlide/conan.png";
import imgSlideUp6 from "../../imgs/HotSlide/pokemon.png";

const cx = classNames.bind(styles);

const Home = ({ user, setIsSignUp }) => {
  let { page } = useParams();
  const [searchParams] = useSearchParams();
  const searchFilm = searchParams.get("Search");
  const category = searchParams.get("Category");
  if (page === undefined || Number(page) <= 0) page = "1";
  const [isHasData, setIsHasData] = useState(false);
  const [films, setFilms] = useState();
  const [filterFilms, setFilterFilms] = useState();
  const [filterPage, setFilterPage] = useState("");
  const getDataFilms = async () => {
    setIsHasData(false);
    if (films === undefined) {
      const res = await axios.get("/api/film/getFilm");
      setFilms(res.data);
    }

    setIsHasData(true);
  };
  const funcFilterFilms = () => {
    if (films) {
      if (searchFilm) {
        const searchResult = films.filter((film) => {
          return film.filmName
            .toUpperCase()
            .includes(searchFilm.trim().toUpperCase());
        });
        setFilterFilms(searchResult);
        setFilterPage("?Search=" + searchFilm);
      } else if (category) {
        const categoryFilms = films.filter((film) => {
          return film.category
            .toUpperCase()
            .includes(category.trim().toUpperCase());
        });
        setFilterPage("?Category=" + category);
        setFilterFilms(categoryFilms);
      }
    }
  };

  const handleChangePage = () => {
    window.scroll(0, 995);
  };
  useEffect(() => {
    getDataFilms();
  }, []);
  useEffect(() => {
    funcFilterFilms();
  }, [searchFilm, category, films]);
  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <div>
      <Header
        user={user}
        setIsSignUp={setIsSignUp}
        category={category}
      ></Header>
      <div className={cx("home")}>
        <div className={cx("slider")}>
          <SlideHome></SlideHome>
          <div className={cx("slider-up", "container")}>
            <div className={cx("text-hot-series")}>
              <h3>
                <button disabled />
                <span>Hot Series</span>
              </h3>
            </div>
            <div className={cx("img-hot-series")}>
              <div className={cx("mySlides")}>
                <HotSlide
                  href="/ListEpisode/One%20Piece"
                  img={imgSlideUp1}
                  classname="first"
                />
                <HotSlide
                  href="/ListEpisode/Doraemon%20New%20TV%20Series"
                  img={imgSlideUp2}
                  classname="first"
                />
                <HotSlide
                  href="/ListEpisode/Naruto%20Shippuuden"
                  img={imgSlideUp3}
                  classname="first"
                />
                <HotSlide
                  href="/ListEpisode/Kimetsu%20no%20Yaiba"
                  img={imgSlideUp4}
                  classname="last"
                />
                <HotSlide to="#" img={imgSlideUp5} classname="last" />
                <HotSlide
                  href="/ListEpisode/Pocket%20Monsters%202019"
                  img={imgSlideUp6}
                  classname="last"
                />
              </div>
            </div>
          </div>
        </div>

        <div className={cx("content", "container")}>
          <div className={cx("text-content")}>
            <h3>
              <button disabled />
              <span>Phim Mới</span>
            </h3>
          </div>
          <Row gutter={[16, 6]} justify="space-around">
            {isHasData ? (
              filterFilms ? (
                filterFilms.length > 0 ? (
                  filterFilms.map((film, index) => {
                    if (index >= page * 30 - 30 && index <= 30 * page - 1)
                      return (
                        <Col className={cx("col1")} key={index} span={4}>
                          <CardFilm
                            href={"/ListEpisode/" + film.filmName}
                            imgUrl={film.url}
                            name={film.filmName}
                            episode={film.episodeCount}
                            duration={film.duration}
                          ></CardFilm>
                        </Col>
                      );
                  })
                ) : (
                  <span className={cx("Not-found")}>
                    Không tìm thấy kết quả
                  </span>
                )
              ) : (
                films.map((film, index) => {
                  if (index >= page * 30 - 30 && index <= 30 * page - 1)
                    return (
                      <Col className={cx("col1")} key={index}>
                        <CardFilm
                          href={"/ListEpisode/" + film.filmName}
                          imgUrl={film.url}
                          name={film.filmName}
                          episode={film.episodeCount}
                          duration={film.duration}
                        ></CardFilm>
                      </Col>
                    );
                })
              )
            ) : (
              <div className={cx("loading-wrapper")}>
                <LoadingOutlined className={cx("loading-icon")} />
              </div>
            )}
          </Row>
          {/* Param Search */}
          {isHasData ? (
            filterFilms && filterFilms.length > 0 ? (
              <div className={cx("pagination")}>
                <Link
                  to={"/" + (Number(page) - 1) + filterPage}
                  className={cx(
                    "page",
                    Number(page) > 1 &&
                      Number.parseInt(filterFilms.length / 30) + 1 > 4
                      ? ""
                      : "hide"
                  )}
                  onClick={handleChangePage}
                >
                  &lt;&lt;
                </Link>
                <Link
                  className={cx(
                    "page",
                    Number(page) <=
                      Number.parseInt(filterFilms.length / 30) + 1 - 3
                      ? "active"
                      : "",
                    Number.parseInt(filterFilms.length / 30) + 1 < 4
                      ? "hide"
                      : ""
                  )}
                  to={
                    "/" +
                    (Number(page) + 3 >
                    Number.parseInt(filterFilms.length / 30) + 1
                      ? Number.parseInt(filterFilms.length / 30) + 1 - 3
                      : Number(page)) +
                    filterPage
                  }
                  onClick={handleChangePage}
                >
                  {Number(page) + 3 >
                  Number.parseInt(filterFilms.length / 30) + 1
                    ? Number.parseInt(filterFilms.length / 30) + 1 - 3
                    : Number(page)}
                </Link>
                <Link
                  to={
                    "/" +
                    (Number(page) + 3 >
                    Number.parseInt(filterFilms.length / 30) + 1
                      ? Number.parseInt(filterFilms.length / 30) + 1 - 2
                      : Number(page) + 1) +
                    filterPage
                  }
                  className={cx(
                    "page",
                    Number(page) ===
                      Number.parseInt(filterFilms.length / 30) + 1 - 2
                      ? "active"
                      : "",
                    Number.parseInt(filterFilms.length / 30) + 1 < 3
                      ? "hide"
                      : ""
                  )}
                  onClick={handleChangePage}
                >
                  {Number(page) + 3 >
                  Number.parseInt(filterFilms.length / 30) + 1
                    ? Number.parseInt(filterFilms.length / 30) + 1 - 2
                    : Number(page) + 1}
                </Link>
                <Link
                  to={
                    "/" +
                    (Number(page) + 3 >
                    Number.parseInt(filterFilms.length / 30) + 1
                      ? Number.parseInt(filterFilms.length / 30) + 1 - 1
                      : Number(page) + 2) +
                    filterPage
                  }
                  className={cx(
                    "page",
                    Number(page) ===
                      Number.parseInt(filterFilms.length / 30) + 1 - 1
                      ? "active"
                      : "",
                    Number.parseInt(filterFilms.length / 30) + 1 < 2
                      ? "hide"
                      : ""
                  )}
                  onClick={handleChangePage}
                >
                  {Number(page) + 3 >
                  Number.parseInt(filterFilms.length / 30) + 1
                    ? Number.parseInt(filterFilms.length / 30) + 1 - 1
                    : Number(page) + 2}
                </Link>
                <Link
                  to={
                    "/" +
                    (Number(page) + 3 >
                    Number.parseInt(filterFilms.length / 30) + 1
                      ? Number.parseInt(filterFilms.length / 30) + 1
                      : Number(page) + 3) +
                    filterPage
                  }
                  className={cx(
                    "page",
                    Number(page) ===
                      Number.parseInt(filterFilms.length / 30) + 1
                      ? "active"
                      : "",
                    Number.parseInt(filterFilms.length / 30) + 1 < 1
                      ? "hide"
                      : ""
                  )}
                  onClick={handleChangePage}
                >
                  {Number(page) + 3 >
                  Number.parseInt(filterFilms.length / 30) + 1
                    ? Number.parseInt(filterFilms.length / 30) + 1
                    : Number(page) + 3}
                </Link>
                <Link
                  to={"/" + (Number(page) + 1) + filterPage}
                  className={cx(
                    "page",
                    Number(page) + 3 <
                      Number.parseInt(filterFilms.length / 30) + 1
                      ? ""
                      : "hide"
                  )}
                  onClick={handleChangePage}
                >
                  &gt;&gt;
                </Link>
              </div>
            ) : (
              <div className={cx("pagination")}>
                <Link
                  to={"/" + (Number(page) - 1) + filterPage}
                  className={cx(
                    "page",
                    Number(page) > 1 &&
                      Number.parseInt(films.length / 30) + 1 > 4
                      ? ""
                      : "hide"
                  )}
                  onClick={handleChangePage}
                >
                  &lt;&lt;
                </Link>
                <Link
                  className={cx(
                    "page",
                    Number(page) <= Number.parseInt(films.length / 30) + 1 - 3
                      ? "active"
                      : "",
                    Number.parseInt(films.length / 30) + 1 < 4 ? "hide" : ""
                  )}
                  to={
                    "/" +
                    (Number(page) + 3 > Number.parseInt(films.length / 30) + 1
                      ? Number.parseInt(films.length / 30) + 1 - 3
                      : Number(page)) +
                    filterPage
                  }
                  onClick={handleChangePage}
                >
                  {Number(page) + 3 > Number.parseInt(films.length / 30) + 1
                    ? Number.parseInt(films.length / 30) + 1 - 3
                    : Number(page)}
                </Link>
                <Link
                  to={
                    "/" +
                    (Number(page) + 3 > Number.parseInt(films.length / 30) + 1
                      ? Number.parseInt(films.length / 30) + 1 - 2
                      : Number(page) + 1) +
                    filterPage
                  }
                  className={cx(
                    "page",
                    Number(page) === Number.parseInt(films.length / 30) + 1 - 2
                      ? "active"
                      : "",
                    Number.parseInt(films.length / 30) + 1 < 3 ? "hide" : ""
                  )}
                  onClick={handleChangePage}
                >
                  {Number(page) + 3 > Number.parseInt(films.length / 30) + 1
                    ? Number.parseInt(films.length / 30) + 1 - 2
                    : Number(page) + 1}
                </Link>
                <Link
                  to={
                    "/" +
                    (Number(page) + 3 > Number.parseInt(films.length / 30) + 1
                      ? Number.parseInt(films.length / 30) + 1 - 1
                      : Number(page) + 2) +
                    filterPage
                  }
                  className={cx(
                    "page",
                    Number(page) === Number.parseInt(films.length / 30) + 1 - 1
                      ? "active"
                      : "",
                    Number.parseInt(films.length / 30) + 1 < 2 ? "hide" : ""
                  )}
                  onClick={handleChangePage}
                >
                  {Number(page) + 3 > Number.parseInt(films.length / 30) + 1
                    ? Number.parseInt(films.length / 30) + 1 - 1
                    : Number(page) + 2}
                </Link>
                <Link
                  to={
                    "/" +
                    (Number(page) + 3 > Number.parseInt(films.length / 30) + 1
                      ? Number.parseInt(films.length / 30) + 1
                      : Number(page) + 3) +
                    filterPage
                  }
                  className={cx(
                    "page",
                    Number(page) === Number.parseInt(films.length / 30) + 1
                      ? "active"
                      : "",
                    Number.parseInt(films.length / 30) + 1 < 1 ? "hide" : ""
                  )}
                  onClick={handleChangePage}
                >
                  {Number(page) + 3 > Number.parseInt(films.length / 30) + 1
                    ? Number.parseInt(films.length / 30) + 1
                    : Number(page) + 3}
                </Link>
                <Link
                  to={"/" + (Number(page) + 1) + filterPage}
                  className={cx(
                    "page",
                    Number(page) + 3 < Number.parseInt(films.length / 30) + 1
                      ? ""
                      : "hide"
                  )}
                  onClick={handleChangePage}
                >
                  &gt;&gt;
                </Link>
              </div>
            )
          ) : (
            <></>
          )}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};
export default Home;
