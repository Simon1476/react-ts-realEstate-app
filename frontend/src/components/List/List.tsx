import { GetPosts } from "../../types/loaders/post";
import Card from "../Card/Card";
import "./list.scss";

const List = ({ posts }: { posts: GetPosts }) => {
  return (
    <div className="list">
      {posts.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
};

export default List;
