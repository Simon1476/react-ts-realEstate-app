import { Marker } from "react-leaflet/Marker";
import { Popup } from "react-leaflet/Popup";
import "./pin.scss";
import { Link } from "react-router-dom";
import { CardItem } from "../../types/components/card";

const Pin = ({ item }: { item: CardItem }) => {
  return (
    <Marker position={[item.latitude, item.longitude]}>
      <Popup>
        <div className="popupContainer">
          <img src={item.img} alt="" />
          <div className="textContainer">
            <Link to={`/${item.id}`}>{item.title}</Link>
            <span>{item.bedroom} bedroom</span>
            <b>$ {item.price}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default Pin;
