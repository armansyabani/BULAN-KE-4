export type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
};

export type NewProductInput = {
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
};
