export type Car = {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  imageUrl: string;
  features: string[];
  price: number | string;
  transmission: 'Manuale' | 'Automatico';
};

export type UpdatedCarData = {
  title?: string;
  subtitle?: string;
  slug: string;
  price?: number | string;
  features?: string[];
  imageUrl?: string;
  transmission: 'Manuale' | 'Automatico';
};
