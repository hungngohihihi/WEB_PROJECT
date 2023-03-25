import { UpOutlined, DownOutlined } from "@ant-design/icons";
import classNames from "classnames/bind";
import { useState } from "react";
import CommentChild from "../CommentChild";
import styles from "./Comment.module.scss";

const cx = classNames.bind(styles);

function Comment({ data, commentChilds, callBack, inputElement }) {
  const [isShowCommentChild, setIsShowCommentChild] = useState(false);

  const handleRep = () => {
    inputElement.current.focus();
    callBack[0](data.commentID);
    callBack[1](data.comment);
  };
  return (
    <div key={data.commentID} className={cx("comment")}>
      <div className={cx("comment-avatar")}>
        <img
          src={
            data.avatar ||
            "https://products.popsww.com/api/v2/containers/file2/profiles/Adult-01.png"
          }
          alt="Avatar"
        />
      </div>
      <div className={cx("comment-body")}>
        <div className={cx("comment-body_message")}>
          <span className={cx("message-name")}>{data.userName}</span>
          <span className={cx("message-main")}>{data.comment}</span>
        </div>
        <div className={cx("comment-body_options")}>
          <div className={cx("comment-body_options-left")}>
            <span className={cx("option", "disable")}>{data.time}</span>
            <span className={cx("option")}>Thích</span>
            <span className={cx("option")} onClick={handleRep}>
              Trả lời
            </span>
          </div>
          {data.likeCount <= 0 ? (
            <></>
          ) : (
            <span className={cx("option", "icon")}>
              {data.likeCount}
              <svg
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="8" cy="8" r="8" fill="white"></circle>
                <path
                  d="M8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0ZM5.18556 11.1836C5.18556 11.3939 5.01503 11.5645 4.80469 11.5645H3.66213C3.45178 11.5645 3.28125 11.3939 3.28125 11.1836V6.42284C3.28125 6.2125 3.45178 6.04197 3.66213 6.04197H4.80469C5.01503 6.04197 5.18556 6.2125 5.18556 6.42284V11.1836ZM12.9985 7.31028L12.1115 10.7103C11.9802 11.2134 11.5259 11.5644 11.0059 11.5644H7.85156C7.01019 11.5644 6.32812 10.8824 6.32812 10.041V6.67303C6.32812 6.269 6.48863 5.8815 6.77434 5.59581L8.98856 3.38159C9.11409 3.25606 9.28431 3.18556 9.46184 3.18556C9.96712 3.18556 10.2902 3.724 10.0524 4.16984L9.35859 5.47072C9.22059 5.7295 9.40809 6.042 9.70138 6.042H12.0186C12.5779 6.042 13.0313 6.49537 13.0313 7.05466C13.0312 7.14091 13.0202 7.22681 12.9985 7.31028Z"
                  fill="#EA6016"
                ></path>
              </svg>
            </span>
          )}
        </div>
        <div className={cx("show-comment")}>
          {isShowCommentChild ? (
            commentChilds.map((commentChild, index) => {
              return (
                <CommentChild key={index} data={commentChild}></CommentChild>
              );
            })
          ) : (
            <></>
          )}

          {commentChilds.length > 0 ? (
            <div>
              {isShowCommentChild ? (
                <span
                  className={cx("show-option")}
                  onClick={() => setIsShowCommentChild(!isShowCommentChild)}
                >
                  Ẩn câu trả lời
                  <UpOutlined className={cx("show-icon")} />
                  {/* <DownOutlined className={cx("show-icon")} /> */}
                </span>
              ) : (
                <span
                  className={cx("show-option")}
                  onClick={() => setIsShowCommentChild(!isShowCommentChild)}
                >
                  Hiện câu trả lời
                  <DownOutlined className={cx("show-icon")} />
                </span>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Comment;
