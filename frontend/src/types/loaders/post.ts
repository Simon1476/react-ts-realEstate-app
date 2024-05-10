type User = {
  username: string;
  avatar: string | null;
};

type PostDetail = {
  id: string;
  desc: string;
  utilities: string | null;
  pet: string | null;
  income: string | null;
  size: number | null;
  school: number | null;
  bus: number | null;
  restaurant: number | null;
  postId: string;
};

enum Type {
  buy = "buy",
  rent = "rent",
}

enum Property {
  apartment = "apartment",
  house = "house",
  condo = "condo",
  land = "land",
}

export type GetSinglePost = {
  id: string;
  title: string;
  price: number;
  images: string[];
  address: string;
  city: string;
  bedroom: number;
  bathroom: number;
  latitude: string;
  longitude: string;
  type: Type;
  property: Property;
  createdAt: Date;
  userId: string;
  user: User;
  postDetail: PostDetail | null;
  isSaved: boolean;
};

export type GetPosts = {
  id: string;
  title: string;
  price: number;
  images: string[];
  address: string;
  city: string;
  bedroom: number;
  bathroom: number;
  latitude: string;
  longitude: string;
  type: Type;
  property: Property;
  createdAt: Date;
  userId: string;
}[];
