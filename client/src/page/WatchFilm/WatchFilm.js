import { Container, Row, Col } from "react-bootstrap";
import TextInformation from "../../components/Text/TextInformation";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import classNames from "classnames/bind";
import styles from "./WatchFilm.module.scss";
import Footer from "../../components/Footer/Footer";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);
const WatchFilm = ({ user, setIsSignUp }) => {
  const { filmName } = useParams();
  const [searchParams] = useSearchParams();
  const episodeID = searchParams.get("episode");
  const [film, setFilm] = useState();
  const [isHasData, setIsHasData] = useState(false);
  const [episodeFilm, setEpisodeFilm] = useState();
  const [urlEpisodeFilm, setUrlEpisodeFilm] = useState("");
  const getDataFilm = async () => {
    setIsHasData(false);
    const res = await axios.get("/api/film/getFilm/" + filmName);
    setFilm(res.data);
  };

  const getDataEpisodeFilm = async () => {
    if (film) {
      const res2 = await axios.get(
        "/api/episodeFilm/getEpisodeFilm/" + film?.filmID
      );
      setEpisodeFilm(res2.data);
    }
  };

  const getUrlEpisodeFilm = async () => {
    if (episodeFilm) {
      const res = await axios.get(
        "/api/episodeFilm/getUrlEpisodeFilm/" +
          film.filmID +
          "?episodeID=" +
          episodeID
      );
      setUrlEpisodeFilm(res.data[0].url);
      setIsHasData(true);
    }
  };
  useEffect(() => {
    getDataFilm();
    document.title = filmName + " tập " + episodeID;
  }, []);

  useEffect(() => {
    getDataEpisodeFilm();
  }, [film]);

  useEffect(() => {
    getUrlEpisodeFilm();
  }, [episodeFilm]);
  return (
    <div>
      <Header user={user} setIsSignUp={setIsSignUp}></Header>
      {isHasData ? (
        <div className={cx("layout")}>
          <div className={cx("layout_video", "container")}>
            <iframe
              className={cx("video")}
              src={urlEpisodeFilm}
              allowFullScreen
            ></iframe>
          </div>

          <Navbar
            className={cx("navbar")}
            user={user}
            episodeFilm={episodeFilm}
            film={film}
            episodeID={episodeID}
          ></Navbar>
        </div>
      ) : (
        <div className={cx("loading-wrapper")}>
          <LoadingOutlined className={cx("loading-icon")} />
        </div>
      )}
      <Footer></Footer>
    </div>
  );
};

export default WatchFilm;
