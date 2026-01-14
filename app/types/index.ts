export interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  type: 'sale' | 'rent';
  image: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
}
