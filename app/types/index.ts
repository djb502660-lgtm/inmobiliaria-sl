export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  createdAt: string;
}

export interface Property {
  id: string;
  title: string;
  address: string;
  city: string;
  price: number;
  type: 'sale' | 'rent';
  image: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  userId: string;
  publishedAt: string;
  propertyType: 'Casa' | 'Apartamento' | 'Oficina' | 'Terreno' | 'Otro';
}

export interface AuthContextType {
  user: User | null;
  signIn: (user: User) => void;
  signOut: () => void;
  signUp: (user: User) => void;
}
