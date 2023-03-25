import classNames from "classnames/bind";
import styles from "./FilmAdmin.module.scss";
import { useOutletContext } from "react-router-dom";

const cx = classNames.bind(styles);
const AddFilm = () => {
  const adminToken = useOutletContext();
  return (
    <div>
      <div className={cx("main-container")}>
        <div className={cx("card")}>
          <section className={cx("container")}>
            <form action="#" className={cx("form")}>
              <h1>Thêm mới phim</h1>
              <div className={cx("input-box")}>
                <label>Avatar</label>
                <input type="file" name="image" id="image" required />
              </div>
              <div className={cx("input-box")}>
                <label>Tên phim</label>
                <input type="text" name="filmName" id="filmName" placeholder="Tên phim" required />
              </div>
              <div className={cx("select-box")}>
                <select name="category" id="category">
                  <option hidden>Thể loại</option>
                  <option value="hanhdong">Hành động</option>
                  <option value="phieuluu">Phiêu lưu</option>
                  <option value="kinhdi">Kinh dị</option>
                  <option value="quang">Quang</option>
                </select>
              </div>
              <div className={cx("input-box")}>
                <label>Mô tả</label>
                <input type="text" name="description" id="description" placeholder="Mô tả" required />
              </div>
              <div className={cx("input-box")}>
                <label>Điểm</label>
                <input type="text" name="point" id="point" placeholder="Điểm" required />
              </div>
              <div className={cx("input-box")}>
                <label>Khoảng thời gian</label>
                <input type="text" name="duration" id="duration" placeholder="Khoảng thời gian" required />
              </div>
              <div className={cx("input-box")}>
                <label>Năm sản xuất</label>
                <input type="text" name="year" id="year" placeholder="Năm sản xuất" required />
              </div>
              <div className={cx("input-box")}>
                <label>Link url</label>
                <input type="text" name="url" id="url" placeholder="Link url" required />
              </div>
              <div className={cx("status-box")}>
                <h3>Trạng thái</h3>
                <div className={cx("status-option")}>
                  <div className={cx("status")}>
                    <input type="radio" id="check-online" name="online" defaultChecked />
                    <label htmlFor="check-online">Online</label>
                  </div>
                  <div className={cx("status")}>
                    <input type="radio" id="check-offline" name="offline" />
                    <label htmlFor="check-offline">Offline</label>
                  </div>
                </div>
              </div>
              <button type="submit" name="sumbmit_add_film">Lưu</button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};
export default AddFilm;
