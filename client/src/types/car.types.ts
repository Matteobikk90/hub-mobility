export type Car = {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  imageUrl: string;
  features: string[];
  price: number;
  transmission: 'manual' | 'automatic';
};

export type UpdatedCarData = {
  title?: string;
  subtitle?: string;
  slug: string;
  price?: number;
  features?: string[];
  imageUrl?: string;
  transmission: 'manual' | 'automatic';
};
