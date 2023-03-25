import classNames from "classnames/bind";
import { Col, Row } from "antd";

import styles from "./EpisodeHeader.scss";

const cx = classNames.bind(styles);
const numButton = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

function EpisodeHeader({ episodeLength, subKey, callBack }) {
  return (
    <div className={cx("wrapper")}>
      <Row gutter={[6, 6]}>
        {numButton.map((value, index) => {
          if (value < episodeLength)
            return (
              <Col
                span={4}
                key={index}
                order={Number.parseInt(episodeLength) - index + 1}
              >
                <button
                  className={cx(value === subKey ? "active" : "")}
                  onClick={() => callBack(value)}
                >
                  {value * 100 + 1}-{value * 100 + 100}
                </button>
              </Col>
            );
        })}
      </Row>

      <div className={cx("separate")}></div>
    </div>
  );
}

export default EpisodeHeader;
