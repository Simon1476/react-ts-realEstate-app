import { Marker } from "react-leaflet/Marker";
import { Popup } from "react-leaflet/Popup";
import "./singlePagePin.scss";
import { Link } from "react-router-dom";
import { GetSinglePost } from "../../types/loaders/post";

const SinglePagePin = ({ item }: { item: GetSinglePost }) => {
  return (
    <Marker position={[parseInt(item.latitude), parseInt(item.longitude)]}>
      <Popup>
        <div className="popupContainer">
          <img src={item.images[0]} alt="" />
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

export default SinglePagePin;
