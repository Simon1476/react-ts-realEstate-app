import { LoaderFunction, Params, defer } from "react-router-dom";
import apiRequest from "./apiRequest";

export const singlePageLoader = async ({
  params,
}: {
  params: Params<"id">;
}) => {
  const res = await apiRequest(`/posts/${params.id}`);
  return res.data;
};

export const listPageLoader: LoaderFunction = async ({ request }) => {
  const query = request.url.split("?")[1];

  const postPromise = apiRequest("/posts?" + query);

  return defer({
    postResponse: postPromise,
  });
};

export const profilePageLoader = async () => {
  const postPromise = await apiRequest("/users/profilePosts");
  const chatPromise = await apiRequest("/chats");
  return defer({
    postResponse: postPromise,
    chatResponse: chatPromise,
  });
};
