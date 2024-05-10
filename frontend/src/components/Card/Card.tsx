import { Link } from "react-router-dom";
import "./card.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBath,
  faBed,
  faBookmark,
  faFilePen,
  faLocationDot,
  faSackDollar,
} from "@fortawesome/free-solid-svg-icons";
import { CardItem } from "../../types/components/card";

const Card = ({ item }: { item: CardItem }) => {
  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imgContainer">
        <img src={item.images[0]} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <FontAwesomeIcon className="icon" icon={faLocationDot} />
          <span>{item.address}</span>
        </p>
        <p className="price">
          <FontAwesomeIcon className="icon" icon={faSackDollar} />
          <span>{item.price}</span>
        </p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <FontAwesomeIcon className="icon" icon={faBed} />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <FontAwesomeIcon className="icon" icon={faBath} />
              <span>{item.bedroom} bedroom</span>
            </div>
          </div>
          <div className="icons">
            <FontAwesomeIcon className="icon" icon={faBookmark} />
            <FontAwesomeIcon className="icon" icon={faFilePen} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
