import styles from "./Category.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);

const Category = ({ categoryHome, categoryName }) => {
    const handleSetScrollY = () =>{
        window.scroll(0,995);
    }
    return (
        <li>
            <Link to={"/?Category=" + categoryName} className={categoryName === categoryHome ? cx("category", "active") : cx("category")} onClick={handleSetScrollY}>{categoryName}</Link>
        </li>
    )
}

export default Category;