export type Car = {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  imageUrl: string;
  features: string[];
  prices: string[]; // Changed price to prices (array of strings)
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
