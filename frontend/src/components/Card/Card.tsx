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

type Props = {
  id: number;
  title: string;
  img: string;
  bedroom: number;
  bathroom: number;
  price: number;
  address: string;
  latitude: number;
  longitude: number;
};
const Card = ({
  id,
  title,
  img,
  bedroom,
  bathroom,
  price,
  address,
  latitude,
  longitude,
}: Props) => {
  return (
    <div className="card">
      <Link to={`/${id}`} className="imgContainer">
        <img src={img} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${id}`}>{title}</Link>
        </h2>
        <p className="address">
          <FontAwesomeIcon className="icon" icon={faLocationDot} />
          <span>{address}</span>
        </p>
        <p className="price">
          <FontAwesomeIcon className="icon" icon={faSackDollar} />
          <span>{price}</span>
        </p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <FontAwesomeIcon className="icon" icon={faBed} />
              <span>{bedroom} bedroom</span>
            </div>
            <div className="feature">
              <FontAwesomeIcon className="icon" icon={faBath} />
              <span>{bedroom} bedroom</span>
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
