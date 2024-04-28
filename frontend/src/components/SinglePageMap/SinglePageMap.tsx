import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";

import "leaflet/dist/leaflet.css";
import "./singlePageMap.scss";
import { SingleMap } from "../../types/components/singleMap";
import SinglePagePin from "../SinglePagePin/SinglePagePin";

const SinglePageMap = ({ data }: { data: SingleMap }) => {
  console.log(data);
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={7}
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
