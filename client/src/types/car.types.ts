export type Car = {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  imageUrl: string;
  features: string;
  prices: string[];
  transmission: 'Manuale' | 'Automatico';
};

export type UpdatedCarData = {
  title?: string;
  subtitle?: string;
  slug: string;
  prices: string[];
  features?: string;
  imageUrl?: string;
  transmission: 'Manuale' | 'Automatico';
};
