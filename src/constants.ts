import { Product, Order } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Zari Velvet Bridal Lehenga',
    price: 84500,
    originalPrice: 95000,
    image: '/Assets/Signature Collections/Bridal Edit.webp',
    category: 'Lehengas',
    colors: ['#004d51', '#435b9f', '#ba1a1a'],
    fabric: 'Raw Silk',
    description: 'A masterpiece of traditional craftsmanship meets modern silhouette. Hand-crafted in premium micro-velvet, this piece features extensive Zardosi work.',
    isNew: true
  },
  {
    id: '2',
    name: 'Kanchipuram Silk Drape',
    price: 42000,
    image: '/Assets/Signature Collections/Sustainable Luxe.webp',
    category: 'Sarees',
    colors: ['#435b9f', '#735c00'],
    fabric: 'Pure Silk',
    description: 'Elegant royal blue silk saree with intricate golden paisley borders.'
  },
  {
    id: '3',
    name: 'Mustard Fusion Gown',
    price: 28500,
    image: '/Assets/Signature Collections/Festive Fusion.webp',
    category: 'Fusion Dresses',
    colors: ['#e9c349', '#735c00'],
    fabric: 'Crepe Georgette',
    description: 'Contemporary fusion dress with mustard yellow floral patterns.'
  },
  {
    id: '4',
    name: 'Floral Anarkali Suit',
    price: 36200,
    image: '/Assets/Signature Collections/Everyday Indo-Western.webp',
    category: 'Anarkalis',
    colors: ['#ffffff', '#e4e3d7'],
    fabric: 'Chiffon',
    description: 'Classic ivory and gold sherwani-style anarkali with fine thread work.'
  },
  {
    id: '5',
    name: 'Ruby Gotta Patti Lehenga',
    price: 115000,
    image: '/Assets/Signature Collections/Bridal Edit.webp',
    category: 'Lehengas',
    colors: ['#ba1a1a'],
    fabric: 'Raw Silk',
    description: 'Exquisite ruby red silk lehenga with silver gotta patti work.'
  },
  {
    id: '6',
    name: 'Sheer Organza Saree',
    price: 22400,
    image: '/Assets/Signature Collections/Sustainable Luxe.webp',
    category: 'Sarees',
    colors: ['#e4e3d7'],
    fabric: 'Organza',
    description: 'Sophisticated lavender organza saree with minimal silver thread embroidery.'
  },
  {
    id: '7',
    name: 'Geometric Co-ord Set',
    price: 18900,
    image: '/Assets/Signature Collections/Everyday Indo-Western.webp',
    category: 'Indo-Western',
    colors: ['#1b1c15'],
    fabric: 'Crepe Silk',
    description: 'Modern Indo-Western co-ord set with geometric patterns.'
  },
  {
    id: '8',
    name: 'Heritage Banarasi Dupatta',
    price: 12000,
    image: '/Assets/Signature Collections/Festive Fusion.webp',
    category: 'Kurtis',
    colors: ['#e9c349'],
    fabric: 'Brocade Silk',
    description: 'Traditional gold and cream heavy embroidered dupatta.'
  }
];

export const ORDERS: Order[] = [
  {
    id: 'RT-8849201',
    date: 'Oct 24, 2023',
    status: 'Shipped',
    total: 24500,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5MMFhlKKmjk5s07qcypiB6PG6hPFLjra3iavB3cvZ67Dc7w2wS3SBwV75nnLZrKqr2wiMiL_COEVHAN3vWixi9rYoRLqXq0Rmg64TmQN0OuowacBS0Dr9KwjXLtv8sMAfReTo-rYuk99UoQ7UR8FpMVzkICO9g1HAWjJMzmsDdUX3-iQRDyy8ig-LCCvwFr93UsH3yQJhs9mqGTus72m8464efdH7QocAy_d7ttP9SO-u7CAGlnBucQNVG_nNd1QRlG-swxn9guiI'
  },
  {
    id: 'RT-8847392',
    date: 'Oct 12, 2023',
    status: 'Delivered',
    total: 18200,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDW6i2uvndgkOJCCVXz1cw5F5LCbzkapJSR05X3YayKadOsLWEVCC2M7c7tIxsEnsYaJztLDiOPZ1Ev1gMPnhanVKqTSArKZtmrfulOkCs7uc-In_SroSGL7DkaRqRpLTGUh_mqdTc08wPnUesFB67tY3a_Tw2JliDQJkc3W5YmZ5wvwLVOTAO6yjedvylaQ6K_OVEvCwD_pwKlo0YX3-YGbQK8yog9m_NQNhK1jMsec_zUmXZICUwBH4NrJwEO_c9q_0VUoADyYH2F'
  },
  {
    id: 'RT-8845510',
    date: 'Sep 28, 2023',
    status: 'Delivered',
    total: 9500,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPVviBHb0IiteGUEUVdEQpPpiokbhy0XyUCG2RhCXH5VdJYqN2aZunsyl9taJCtyeQn2L8EwMtUmaP_R1EHAGovn8zsUELewwAcBARNaMAhYeyZWyVgI7FaDO2YtNlxn_u_wRkC5SdMT0_3Rn6w56227JCrQDOfsKTsZ_u96C3SdRtfMZ4sRcudw8q31hAdjqgNpk3bfn7uYao6REiJsz8cOcNGhhyOxSbQrMx-aGmvDXKcg1LgkepP0jxV6PWJqk6x3SQAqN3eAZF'
  }
];
