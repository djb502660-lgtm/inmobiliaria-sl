import { Property } from '@/app/types';

export const PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Villa de Lujo con Vista al Mar',
    address: '123 Calle Océano, Marbella',
    price: 2500000,
    type: 'sale',
    image: 'https://picsum.photos/seed/picsum1/700/500',
    description:
      'Impresionante villa de lujo con 5 dormitorios, piscina infinita y vistas panorámicas al mar Mediterráneo. Acabados de alta calidad y diseño moderno.',
    bedrooms: 5,
    bathrooms: 4,
    area: 450,
    images: [
      'https://picsum.photos/seed/p1-1/1024/768',
      'https://picsum.photos/seed/p1-2/1024/768',
      'https://picsum.photos/seed/p1-3/1024/768',
    ],
  },
  {
    id: '2',
    title: 'Apartamento Moderno en el Centro',
    address: '45 Calle Principal, Madrid',
    price: 3000,
    type: 'rent',
    image: 'https://picsum.photos/seed/picsum2/700/500',
    description:
      'Apartamento de 2 dormitorios totalmente reformado en el corazón de la ciudad. A pasos de tiendas, restaurantes y transporte público.',
    bedrooms: 2,
    bathrooms: 2,
    area: 95,
    images: [
      'https://picsum.photos/seed/p2-1/1024/768',
      'https://picsum.photos/seed/p2-2/1024/768',
    ],
  },
  {
    id: '3',
    title: 'Casa de Campo con Gran Terreno',
    address: '789 Camino Rural, Segovia',
    price: 650000,
    type: 'sale',
    image: 'https://picsum.photos/seed/picsum3/700/500',
    description:
      'Encantadora casa de campo rodeada de naturaleza. Incluye un gran terreno de 2 hectáreas con árboles frutales y un pequeño arroyo.',
    bedrooms: 4,
    bathrooms: 3,
    area: 280,
    images: [
      'https://picsum.photos/seed/p3-1/1024/768',
      'https://picsum.photos/seed/p3-2/1024/768',
      'https://picsum.photos/seed/p3-3/1024/768',
      'https://picsum.photos/seed/p3-4/1024/768',
    ],
  },
  {
    id: '4',
    title: 'Ático con Terraza Privada',
    address: '101 Avenida del Sol, Valencia',
    price: 2200,
    type: 'rent',
    image: 'https://picsum.photos/seed/picsum4/700/500',
    description:
      'Luminoso ático de 3 dormitorios con una espectacular terraza privada de 80m². Ideal para disfrutar del clima mediterráneo y las vistas a la ciudad.',
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    images: [
      'https://picsum.photos/seed/p4-1/1024/768',
      'https://picsum.photos/seed/p4-2/1024/768',
    ],
  },
];
