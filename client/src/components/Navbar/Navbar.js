import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames/bind";
import {
  SendOutlined,
  CloseOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import Swal from "sweetalert2";

import styles from "./Navbar.module.scss";
import CardFilm from "./cardFilm";
import Comment from "./Comment";
import axios from "axios";
import Episode from "./episode/Episode";
import { Col, Row } from "antd";
import defaultUser from "../../imgs/user_default.png";
import EpisodeHeader from "./EpisodeHeader/EpisodeHeader";

const cx = classNames.bind(styles);

function Navbar({ user, episodeFilm, film, episodeID }) {
  const [key, setKey] = useState("episode");
  const [subKey, setSubKey] = useState(
    Number.parseInt(episodeFilm.length / 100)
  );
  const [comments, setComments] = useState([]);
  const [userComment, setUserComment] = useState("");
  const [commentParentID, setCommentParentID] = useState();
  const [isRepping, setIsRepping] = useState("");
  const [checkForComment, setCheckForComment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [top10Films, setTop10Films] = useState();
  const inputElement = useRef();

  const getComment = async () => {
    setIsLoading(false);
    try {
      const res = await (
        await axios.get(
          "/api/comment?filmID=" + film.filmID + "&episodeID=" + episodeID
        )
      ).data;
      setComments(res);
      setIsLoading(true);
    } catch (error) {
      console.log(error);
    }
  };
  const getDataFilms = async () => {
    try {
      setIsLoading(false);
      const res = await axios.get("/api/film/getFilm");
      let top10Film = [];
      for (let i = 0; i < 10; i++) {
        top10Film.push(res.data[i]);
      }
      setTop10Films(top10Film);
      setIsLoading(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSendComment = async (comment) => {
    if (user.userId) {
      const req = await axios.post("/api/comment", {
        userID: user.userId,
        commentParentID: commentParentID,
        comment: comment,
        filmID: film.filmID,
        likeCount: 0,
        episodeID: episodeID,
      });
      setCheckForComment(!checkForComment);

      setCommentParentID();
      setUserComment("");
      setIsRepping("");
    } else {
      Swal.fire({
        title: "Bạn Cần Đăng Nhập Để Comment!",
        icon: "warning",
        showCloseButton: true,
      });
    }
  };

  useEffect(() => {
    getComment();
  }, [checkForComment]);

  useEffect(() => {
    getDataFilms();
  }, []);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("Tabs")}>
        <div
          className={cx("Tab", key === "episode" ? "active" : "")}
          onClick={() => setKey("episode")}
        >
          <span className={cx("Label")}>Tập</span>
        </div>
        <div
          className={cx("Tab", key === "more" ? "active" : "")}
          onClick={() => setKey("more")}
        >
          <span className={cx("Label")}>Xem thêm</span>
        </div>
        <div
          className={cx("Tab", key === "comment" ? "active" : "")}
          onClick={() => setKey("comment")}
        >
          <span className={cx("Label")}>Bình luận ({comments.length})</span>
        </div>
      </div>

      <div className={cx("container")}>
        {key === "more" ? (
          top10Films.map((film) => {
            return <CardFilm key={film.filmID} props={film}></CardFilm>;
          })
        ) : (
          <></>
        )}
        {key === "comment" ? (
          <div>
            {!isLoading ? (
              <div className={cx("loading-wrapper")}>
                <LoadingOutlined className={cx("loading-icon")} />
              </div>
            ) : (
              <div>
                <div className={cx("user-comment")}>
                  <div className={cx("user-comment-avatar")}>
                    <img src={user.avatar || defaultUser} alt="Avatar" />
                  </div>
                  <div className={cx("user-comment-input")}>
                    <input
                      type="text"
                      placeholder="Gửi bình luận"
                      ref={inputElement}
                      onChange={(e) => setUserComment(e.target.value)}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") handleSendComment(userComment);
                      }}
                      value={userComment}
                    />
                  </div>
                  <div className={cx("user-comment-send_icon")}>
                    <SendOutlined
                      className={cx(userComment.trim() ? "active" : "")}
                      style={{ transform: "rotate(-45deg)" }}
                      onClick={
                        userComment.trim()
                          ? () => handleSendComment(userComment)
                          : null
                      }
                    />
                  </div>

                  <div className={cx("notify", isRepping ? "show" : "")}>
                    <span className={cx("notify-label")}>
                      Trả lời {isRepping}
                    </span>
                    <CloseOutlined
                      className={cx("notify-icon")}
                      onClick={() => {
                        setCommentParentID();
                        setIsRepping("");
                      }}
                    />
                  </div>
                </div>
                <div className={cx("list-container")}>
                  {comments.map((comment) => {
                    return (
                      <Comment
                        key={comment.commentParent.commentID}
                        data={comment.commentParent}
                        commentChilds={comment.commentChild}
                        callBack={[setCommentParentID, setIsRepping]}
                        inputElement={inputElement}
                      ></Comment>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          <></>
        )}
        {key === "episode" ? (
          <div>
            {episodeFilm ? (
              episodeFilm.length > 100 ? (
                <div>
                  <EpisodeHeader
                    episodeLength={episodeFilm.length / 100}
                    callBack={setSubKey}
                    subKey={subKey}
                  ></EpisodeHeader>
                  <Row gutter={[6, 6]}>
                    {episodeFilm.map((episode, index) => {
                      if (
                        episode.episodeID >= subKey * 100 + 1 &&
                        episode.episodeID <= subKey * 100 + 100
                      ) {
                        return (
                          <Col span={4} key={index}>
                            <Episode
                              href={
                                "/WatchFilm/" +
                                film.filmName +
                                "?episode=" +
                                episode.episodeID
                              }
                              episode={episode?.episodeID}
                            ></Episode>
                          </Col>
                        );
                      }
                    })}
                  </Row>
                </div>
              ) : (
                <Row gutter={[6, 6]}>
                  {episodeFilm.map((episode, index) => {
                    return (
                      <Col span={4} key={index}>
                        <Episode
                          href={
                            "/WatchFilm/" +
                            film.filmName +
                            "?episode=" +
                            episode.episodeID
                          }
                          episode={episode?.episodeID}
                        ></Episode>
                      </Col>
                    );
                  })}
                </Row>
              )
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Navbar;
