export enum Type {
  buy = "buy",
  rent = "rent",
}

export enum Property {
  apartment = "apartment",
  house = "house",
  condo = "condo",
  land = "land",
}

type PostData = {
  title: string;
  price: number;
  images: string[];
  address: string;
  city: string;
  bedroom: number;
  bathroom: number;
  type: Type;
  property: Property;
  latitude: string;
  longitude: string;
  userId?: string;
};

type PostDetail = {
  desc: string;
  utilities: string;
  pet: string;
  income: string;
  size: number;
  school: number;
  bus: number;
  restaurant: number;
};

export type CreatePost = {
  postData: PostData;
  postDetail: PostDetail;
};
