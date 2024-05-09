import { useLoaderData } from "react-router-dom";
import Card from "../../components/Card/Card";
import Filter from "../../components/Filter/Filter";
import Map from "../../components/Map/Map";
import "./listPage.scss";
import { GetPosts } from "../../types/loaders/post";

const ListPage = () => {
  const posts = useLoaderData() as GetPosts;
  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          {posts.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className="mapContainer">
        <Map data={posts} />
      </div>
    </div>
  );
};

export default ListPage;
