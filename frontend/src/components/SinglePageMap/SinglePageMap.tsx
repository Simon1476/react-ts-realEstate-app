import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";

import "leaflet/dist/leaflet.css";
import "./singlePageMap.scss";
import SinglePagePin from "../SinglePagePin/SinglePagePin";
import { PostDataResponse } from "../../types/loaders/post";

const SinglePageMap = ({ data }: { data: PostDataResponse }) => {
  console.log(data);
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={2}
      scrollWheelZoom={false}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <SinglePagePin item={data} key={data.id} />
    </MapContainer>
  );
};

export default SinglePageMap;
