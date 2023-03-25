import classNames from "classnames/bind";
import styles from "../../page/ListEpisode/ListEpisode.module.scss";

const cx = classNames.bind(styles);

const TextInformation = (props) => {
  return (
    <div
      style={{
        color: props.color,
        fontSize: props.fontSize || "1.6rem",
        marginBottom: "20px",
      }}
    >
      <span
        style={{ color: "var(--text-title-describe)", marginRight: "10px" }}
      >
        {props.title}
      </span>
      <span dangerouslySetInnerHTML={{ __html: props.text }} />
    </div>
  );
};
export default TextInformation;
