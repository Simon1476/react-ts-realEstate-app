import { Marker } from "react-leaflet/Marker";
import { Popup } from "react-leaflet/Popup";
import "./singlePagePin.scss";
import { Link } from "react-router-dom";
import { SingleMap } from "../../types/components/singleMap";

const SinglePagePin = ({ item }: { item: SingleMap }) => {
  return (
    <Marker position={[item.latitude, item.longitude]}>
      <Popup>
        <div className="popupContainer">
          <img src={item.images[0]} alt="" />
          <div className="textContainer">
            <Link to={`/${item.id}`}>{item.title}</Link>
            <span>{item.bedRooms} bedroom</span>
            <b>$ {item.price}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default SinglePagePin;
