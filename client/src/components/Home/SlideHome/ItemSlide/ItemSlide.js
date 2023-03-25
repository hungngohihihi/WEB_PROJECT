import classNames from "classnames/bind";
import styles from "./ItemSlide.module.scss";
import ButtonHome from "../../../../components/Button/ButtonHome/ButtonHome";
import TextInformation from "../../../../components/Text/TextInformation"
const cx = classNames.bind(styles);

const ItemSlide = (props) => {
    return (
        <div className={cx("item-layout")}>
            <div className={cx("item-layout-back")}>
                <img src={props.img} alt=""/>
            </div>
            <div className={cx("item-layout-up")}>
                <div className={cx("content-name")}>{props.filmName}</div>
                <TextInformation color ={"white"} title={"Năm phát hành:"} text={props.year}></TextInformation>
                <ButtonHome text={"Chi tiết"} href={props.href}/>
            </div>
        </div>
    );
}

export default ItemSlide;