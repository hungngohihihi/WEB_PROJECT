import { FaSearch } from "react-icons/fa";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./FilmAdmin.module.scss";
import Swal from "sweetalert2";
import TableFilm from "./TableFilm/TableFilm";
import { Link, useParams, useOutletContext } from "react-router-dom";

const cx = classNames.bind(styles);
const ListAdmin = () => {
  let { page } = useParams();
  if (page === undefined || Number(page) <= 0) page = "1";
  const adminToken = useOutletContext();
  const [isHasData, setIsHasData] = useState(false);
  const [films, setFilms] = useState();
  const [searchValue, setSearchValue] = useState("");

  const [searchResult, setSearchResult] = useState([]);

  const getDataFilms = async () => {
    setIsHasData(false);
    if (films === undefined) {
      const res = await axios.get("/api/film/getFilm");
      setFilms(res.data);
      setSearchResult(res.data);
    }

    setIsHasData(true);
  };

  const handleSearch = (e) => {
    if (e.target.value[0] !== " ") setSearchValue(e.target.value);
  };

  const handleChangePage = () => {
    window.scroll(0, 0);
  };

  const deleteFilm = async (id) => {
    if (id) {
      const req = await axios.post("/api/admin/deleteFilmByFilmID", {
        filmID: id,
      });
      window.location.reload();
    }
  };

  const showWarning = (id = 0, index) => {
    Swal.fire({
      icon: "warning",
      title: "Bấm OK để xóa!",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFilm(id);
      }
    });
  };

  useEffect(() => {
    getDataFilms();
  }, []);

  useEffect(() => {
    if (films) {
      if (searchValue !== "") {
        const result = films.filter((film) => {
          let checked = true;
          for (let i = 0; i < searchValue.length; i++) {
            if (
              searchValue.toUpperCase()[i] !== film.filmName.toUpperCase()[i]
            ) {
              checked = false;
            }
          }
          if (checked) return film;
        });
        setSearchResult(result);
      } else setSearchResult(films);
    }
  }, [searchValue]);

  return (
    <div>
      <div className={cx("main-container")}>
        <div className={cx("card")}>
          <section className={cx("attendance")}>
            <div className={cx("attendance-list")}>
              <h1>Danh sách phim</h1>
              <div className={cx("header-table")}>
                <div className={cx("search")}>
                  <input
                    type="text"
                    placeholder="Search..."
                    onChange={handleSearch}
                    value={searchValue}
                  ></input>
                  <a href="#">
                    <FaSearch />
                  </a>
                </div>
              </div>
              <table className={cx("table")}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Avatar</th>
                    <th>Tên</th>
                    <th>Thể loại</th>
                    <th>Số tập</th>
                    <th>Thời gian</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                {isHasData ? (
                  <tbody>
                    {searchResult.map((film, index) => {
                      if (index >= page * 30 - 30 && index <= 30 * page - 1)
                        return (
                          <TableFilm
                            key={film.filmID}
                            id={film.filmID}
                            avatar={film.url}
                            name={film.filmName}
                            category={film.category}
                            countEpisode={
                              film.duration.split(" ")[1] === "phút"
                                ? "1/1"
                                : film.episodeCount +
                                  "/" +
                                  film.duration.split(" ")[0]
                            }
                            time={film.year}
                            callBack={showWarning}
                          ></TableFilm>
                        );
                    })}
                  </tbody>
                ) : (
                  <></>
                )}
              </table>
              {isHasData ? (
                <div className={cx("pagination")}>
                  {Number(page) > 1 ? (
                    <Link
                      className={cx("prev")}
                      to={"/Admin/ListFilm/" + (Number(page) - 1)}
                      onClick={handleChangePage}
                    >
                      &lt;&lt;
                    </Link>
                  ) : (
                    <></>
                  )}
                  <Link
                    className={cx(
                      "page",
                      Number(page) <=
                        Number.parseInt(searchResult.length / 30) + 1 - 3
                        ? "active"
                        : ""
                    )}
                    to={
                      "/Admin/ListFilm/" +
                      (Number(page) + 3 >
                      Number.parseInt(searchResult.length / 30) + 1
                        ? Number.parseInt(searchResult.length / 30) + 1 - 3
                        : Number(page))
                    }
                    onClick={handleChangePage}
                  >
                    {Number(page) + 3 >
                    Number.parseInt(searchResult.length / 30) + 1
                      ? Number.parseInt(searchResult.length / 30) + 1 - 3
                      : Number(page)}
                  </Link>
                  <Link
                    className={cx(
                      "page",
                      Number(page) ===
                        Number.parseInt(searchResult.length / 30) + 1 - 2
                        ? "active"
                        : ""
                    )}
                    to={
                      "/Admin/ListFilm/" +
                      (Number(page) + 3 >
                      Number.parseInt(searchResult.length / 30) + 1
                        ? Number.parseInt(searchResult.length / 30) + 1 - 2
                        : Number(page) + 1)
                    }
                    onClick={handleChangePage}
                  >
                    {Number(page) + 3 >
                    Number.parseInt(searchResult.length / 30) + 1
                      ? Number.parseInt(searchResult.length / 30) + 1 - 2
                      : Number(page) + 1}
                  </Link>
                  <Link
                    className={cx(
                      "page",
                      Number(page) ===
                        Number.parseInt(searchResult.length / 30) + 1 - 1
                        ? "active"
                        : ""
                    )}
                    to={
                      "/Admin/ListFilm/" +
                      (Number(page) + 3 >
                      Number.parseInt(searchResult.length / 30) + 1
                        ? Number.parseInt(searchResult.length / 30) + 1 - 1
                        : Number(page) + 2)
                    }
                    onClick={handleChangePage}
                  >
                    {Number(page) + 3 >
                    Number.parseInt(searchResult.length / 30) + 1
                      ? Number.parseInt(searchResult.length / 30) + 1 - 1
                      : Number(page) + 2}
                  </Link>
                  <Link
                    className={cx(
                      "page",
                      Number(page) ===
                        Number.parseInt(searchResult.length / 30) + 1
                        ? "active"
                        : ""
                    )}
                    to={
                      "/Admin/ListFilm/" +
                      (Number(page) + 3 >
                      Number.parseInt(searchResult.length / 30) + 1
                        ? Number.parseInt(searchResult.length / 30) + 1
                        : Number(page) + 3)
                    }
                    onClick={handleChangePage}
                  >
                    {Number(page) + 3 >
                    Number.parseInt(searchResult.length / 30) + 1
                      ? Number.parseInt(searchResult.length / 30) + 1
                      : Number(page) + 3}
                  </Link>
                  {Number(page) + 3 <
                  Number.parseInt(searchResult.length / 30) + 1 ? (
                    <Link
                      className={cx("next")}
                      to={"/Admin/ListFilm/" + (Number(page) + 1)}
                      onClick={handleChangePage}
                    >
                      &gt;&gt;
                    </Link>
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
export default ListAdmin;
