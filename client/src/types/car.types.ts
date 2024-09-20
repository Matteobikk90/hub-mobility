export type Car = {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  features: string[];
  price: number;
};

export type UpdatedCarData = {
  title?: string;
  subtitle?: string;
  price?: number;
  features?: string[];
  imageUrl?: string;
};
