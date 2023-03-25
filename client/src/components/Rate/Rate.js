import classNames from "classnames/bind";
import { useState } from "react";
import ButtonHome from "../Button/ButtonHome/ButtonHome";
import { useNavigate } from "react-router-dom";
import styles from "./Rate.module.scss";
import axios from "axios";
import Swal from "sweetalert2";
import { CloseOutlined, StarFilled } from "@ant-design/icons";

const cx = classNames.bind(styles);

const Rate = ({ user, film }) => {
  const navigate = useNavigate();
  const [isRateDialogOpen, setIsRateDialogOpen] = useState(false);
  const [currentRate, setCurrentRate] = useState();
  const handleButtonSumbit = async () => {
    try {
      const req = await axios.post("/api/rate", {
        filmID: film.filmID,
        userID: user.userId,
        rate: currentRate,
      });
      if (req.data) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Đã ghi nhận đánh giá",
          confirmButtonText: '<div class="fa fa-thumbs-up"}>OK</div>',
        }).then((result) => {
          if (result.isConfirmed) navigate(0);
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "error",
        text: "Đã xảy ra lỗi, vui lòng thử lại",
        confirmButtonText: '<div class="fa fa-thumbs-up"}>OK</div>',
      });
      console.log(error);
    }
    setCurrentRate(0);
    setIsRateDialogOpen(false);
  };
  const handleButtonOnclick = () => {
    if (user?.userId) {
      setIsRateDialogOpen(true);
    } else {
      Swal.fire({
        title: "Bạn Cần Đăng Nhập Để đánh giá!",
        icon: "warning",
        showCloseButton: true,
      });
    }
  };
  const closeDialog = () => {
    setCurrentRate(0);
    setIsRateDialogOpen(false);
  };
  return (
    <>
      <ButtonHome
        text={"Đánh giá"}
        onClick={handleButtonOnclick}
        href="#"
      ></ButtonHome>
      <div className={cx("modal", isRateDialogOpen ? "open" : "")}>
        <div className={cx("modal-container")}>
          <div className={cx("header")}>
            <span className={cx("title")}>Đánh giá phim</span>
            <CloseOutlined className={cx("close-icon")} onClick={closeDialog} />
          </div>

          <div className={cx("body")}>
            <StarFilled
              className={cx("star-icon", currentRate === 10 ? "active" : "")}
              onClick={() => setCurrentRate(10)}
            />
            <StarFilled
              className={cx("star-icon", currentRate === 9 ? "active" : "")}
              onClick={() => setCurrentRate(9)}
            />
            <StarFilled
              className={cx("star-icon", currentRate === 8 ? "active" : "")}
              onClick={() => setCurrentRate(8)}
            />
            <StarFilled
              className={cx("star-icon", currentRate === 7 ? "active" : "")}
              onClick={() => setCurrentRate(7)}
            />
            <StarFilled
              className={cx("star-icon", currentRate === 6 ? "active" : "")}
              onClick={() => setCurrentRate(6)}
            />
            <StarFilled
              className={cx("star-icon", currentRate === 5 ? "active" : "")}
              onClick={() => setCurrentRate(5)}
            />
            <StarFilled
              className={cx("star-icon", currentRate === 4 ? "active" : "")}
              onClick={() => setCurrentRate(4)}
            />
            <StarFilled
              className={cx("star-icon", currentRate === 3 ? "active" : "")}
              onClick={() => setCurrentRate(3)}
            />
            <StarFilled
              className={cx("star-icon", currentRate === 2 ? "active" : "")}
              onClick={() => setCurrentRate(2)}
            />
            <StarFilled
              className={cx("star-icon", currentRate === 1 ? "active" : "")}
              onClick={() => setCurrentRate(1)}
            />
          </div>

          <div className={cx("footer")}>
            <button className={cx("btn", "cancel-btn")} onClick={closeDialog}>
              Hủy
            </button>
            <button
              className={cx("btn", "ok-btn")}
              onClick={handleButtonSumbit}
            >
              Đánh giá
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Rate;
