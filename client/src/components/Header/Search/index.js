import { useState, useRef } from "react";
import classNames from "classnames/bind";
import HeadlessTippy from "@tippyjs/react/headless";
import { SearchOutlined, LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import FilmItem from "./FilmItem";
import styles from "./Search.module.scss";

const cx = classNames.bind(styles);

function Search({ films }) {
  const navigate = useNavigate();
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef();
  let timeout = null;
  const handleChange = (e) => {
    setIsLoading(true);
    const value = e.target.value;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      const res = films.filter((film) => {
        return (
          film.filmName.toUpperCase().includes(value.trim().toUpperCase()) &&
          value.trim() !== ""
        );
      });
      setSearchResult(res);
      setIsLoading(false);
    }, 800);
  };

  const handleSearch = (e) => {
    if (e.keyCode === 13 || e.type === "click") {
      setSearchResult([]);
      navigate("/?Search=" + inputRef.current.value);
      inputRef.current.value = "";
      window.scroll(0, 995);
    }
  };
  return (
    <HeadlessTippy
      interactive
      visible={
        searchResult.length > 0 && inputRef.current.value.trim().length > 0
      }
      delay={[0, 700]}
      appendTo={document.body}
      placement="bottom"
      render={(attrs) => (
        <div className={cx("wrapper")}>
          <p className={cx("search-header")}>Kết Quả Tìm Kiếm</p>
          <div className={cx("search-list")} tapindex="-1" {...attrs}>
            {searchResult.map((film, index) => {
              if (index < 20)
                return <FilmItem key={index} film={film}></FilmItem>;
            })}
          </div>
        </div>
      )}
    >
      <div className={cx("search")} action="#">
        <input
          className={cx("search-input")}
          type="text"
          placeholder="Tên Phim,Anime ..."
          onChange={handleChange}
          onKeyDown={handleSearch}
          ref={inputRef}
        />
        {isLoading ? (
          <div className={cx("loading")}>
            <LoadingOutlined className={cx("loading-icon")} />
          </div>
        ) : (
          <></>
        )}
        <SearchOutlined className={cx("search-btn")} onClick={handleSearch} />
      </div>
    </HeadlessTippy>
  );
}

export default Search;
