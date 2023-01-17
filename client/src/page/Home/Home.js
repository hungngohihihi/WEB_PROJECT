import { Container, Row, Col } from "react-bootstrap";
import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";

import styles from "./Home.module.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import HotSlide from "./HotSlide/HotSlide";
import CardFilm from "../Home/CardFilm/CardFilm";
import SlideHome from "../Home/SlideHome/SlideHome";

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
  if (page === undefined) page = "1";
  const [isHasData, setIsHasData] = useState(false);
  const [films, setFilms] = useState();
  const getDataFilms = async () => {
    setIsHasData(false);
    const res = await axios.get("/api/user/getFilm");
    if (searchFilm) {
      const searchResult = res.data.filter((film) => {
        return film.filmName
          .toUpperCase()
          .includes(searchFilm.trim().toUpperCase());
      });
      setFilms(searchResult);
    } else setFilms(res.data);
    setIsHasData(true);
  };

  useEffect(() => {
    getDataFilms();
  }, []);

  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <div>
      <Header user={user} setIsSignUp={setIsSignUp}></Header>
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
                  href="http://localhost:3000/ListEpisode/One%20Piece"
                  img={imgSlideUp1}
                  classname="first"
                />
                <HotSlide
                  href="http://localhost:3000/ListEpisode/Doraemon%20New%20TV%20Series"
                  img={imgSlideUp2}
                  classname="first"
                />
                <HotSlide
                  href="http://localhost:3000/ListEpisode/Naruto%20Shippuuden"
                  img={imgSlideUp3}
                  classname="first"
                />
                <HotSlide
                  href="http://localhost:3000/ListEpisode/Kimetsu%20no%20Yaiba"
                  img={imgSlideUp4}
                  classname="last"
                />
                <HotSlide href="#" img={imgSlideUp5} classname="last" />
                <HotSlide
                  href="http://localhost:3000/ListEpisode/Pocket%20Monsters%202019"
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
          <Container fluid="md">
            <Row>
              {isHasData ? (
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
              ) : (
                <div className={cx("loading-wrapper")}>
                  <LoadingOutlined className={cx("loading-icon")} />
                </div>
              )}
            </Row>
          </Container>
          {/* Param Search */}
          {isHasData ? (
            <div className={cx("pagination")}>
              <a href={"/" + (Number(page) - 1)}>&lt;&lt;</a>
              <a className={page === "1" ? cx("active") : <></>} href="/1">
                1
              </a>
              <a href="/2" className={page === "2" ? cx("active") : <></>}>
                2
              </a>
              <a href="/3" className={page === "3" ? cx("active") : <></>}>
                3
              </a>
              <span>...</span>
              {page !== "1" && page !== "2" && page !== "3" ? (
                <>
                  <a href={"/" + page}>{page}</a>
                  <span>...</span>
                </>
              ) : (
                <></>
              )}
              <a href={"/" + (Number(page) + 1)}>&gt;&gt;</a>
            </div>
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
