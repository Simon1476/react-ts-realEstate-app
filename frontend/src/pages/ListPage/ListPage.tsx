import { Await, useLoaderData } from "react-router-dom";
// import Card from "../../components/Card/Card";
import Filter from "../../components/Filter/Filter";
import Map from "../../components/Map/Map";
import "./listPage.scss";
import { Suspense } from "react";
import { GetPosts } from "../../types/loaders/post";
import Card from "../../components/Card/Card";
import { CardItem } from "../../types/components/card";

const ListPage = () => {
  const data = useLoaderData() as { postResponse: { data: GetPosts } };
  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) =>
                postResponse.data.map((post: CardItem) => (
                  <Card key={post.id} item={post} />
                ))
              }
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="mapContainer">
        <Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={data.postResponse}
            errorElement={<p>Error loading posts!</p>}
          >
            {(postResponse) => <Map data={postResponse.data} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
};

export default ListPage;
