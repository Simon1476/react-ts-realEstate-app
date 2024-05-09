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

export type CardItem = {
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
};
