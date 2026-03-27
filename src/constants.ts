import { Product, Order } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Zari Velvet Bridal Lehenga',
    price: 84500,
    originalPrice: 95000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPR8bk6k8bq2VhNSut5lsLgnG-JdAg3O82Wyg4jb_10U1lsy2Knek_6_Sfmzw0FfdZrKew-Glw2BACFmuHlEWR8LoJItG_6T3OYUB4Pzmn2NPEjEK7tVfz2kflakNgMqYYBU8xsmaHT1n1FP80_KBWLBT97EhqYfnkCIQOJ4gBmXB8xMyICAxDeRQ8bIm3dyGl9l-brk4oRIbk9PNGuKRkuxwqW3iLrC-O9tpe7n9fsaD09ab_i_Rh9CEOGKtWO9QfOpRaaLanESCK',
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKaNcdhMKLU_BLmVk5pXNUMOHlx6PKv00C59MXoL5lFYSa-jDObuQOjL9F-K1vRX1MnjecxAULNP1Re1NFe8kFlqcdKzCPoikTe2ZJZYWqymkWdKG7N_vG9tveFYYBmL2XVqUv5NaG-GAgQyhx154sMcRO6PGNlOxw29t6cNX67VNlvh7QkBXQXrgJHFlmWSl95tMwfCnGBt7hnKzdoX9vP9QZDh1WjAdaKCnWfhx103lLhTgUFeKyj3xiJcQeEaUyKpECMZ6a3JeC',
    category: 'Sarees',
    colors: ['#435b9f', '#735c00'],
    fabric: 'Pure Silk',
    description: 'Elegant royal blue silk saree with intricate golden paisley borders.'
  },
  {
    id: '3',
    name: 'Mustard Fusion Gown',
    price: 28500,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2xbK62cQmhgYpe1yTmRt9rbP1VQX7_ChA8VySkZQUCbk1AhS1Kr0LfMANaSFq8ShsJH050G3bz7E3HUjTFGGpTb6tX4LOOzne10M6UxvRd0WHJyG4gOg-d3wnv77HfXqaqM7CCRC3KXzpajhHSQF5bvOpDArzOr_hH7ls8wWCIt0DJdx59qm5V83YlWP6NeyhI7wMTnUasNX8FDvlldxVN7d5Y8bFWogkMJOw7SMluzHzYh_elX3lg-APLCYTiB0-Z81eW7VRI0Hp',
    category: 'Fusion Dresses',
    colors: ['#e9c349', '#735c00'],
    fabric: 'Crepe Georgette',
    description: 'Contemporary fusion dress with mustard yellow floral patterns.'
  },
  {
    id: '4',
    name: 'Floral Anarkali Suit',
    price: 36200,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJW-qfQ-MaK1HPh-I3OQymEGwmWKEYfp40Bxqcb2axyqdYTYILSmTgqQSgjRDzrByp48MU1OwvdSrNP9_TKZqjuYskLJzDW8SidqRxcMk7gwjTHQjB2sgQI5R631wst_DIxeGZ9P071Q6qpiuEzXDF_zJntHBg7j3J3Igzq-IvjeXVK1Mx8QTiSRatwle6BGxdqA3fw9323xtP9ZKCq9j1EX4VUfVs8e8Iz0x32N4GFYp2zT2aJHNLES_IRPe8v3Q-EZoDtJ9Wk7Y2',
    category: 'Anarkalis',
    colors: ['#ffffff', '#e4e3d7'],
    fabric: 'Chiffon',
    description: 'Classic ivory and gold sherwani-style anarkali with fine thread work.'
  },
  {
    id: '5',
    name: 'Ruby Gotta Patti Lehenga',
    price: 115000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCf7AZ-xeGtiu2n_rMzDExo2Q9vHglnXkuf9rt5pv4gabGk5VB2iVtrY74BTMx1HXX2e3L4FkMx-i9ZQlkS5K8no2tQLGDZpJstw5cMBQDepBpopTDCAbFzgsZfn84DSNeKmNR6kG8dUMSzFsNcmf9cmS1dA5XpTZ46UhJpjXZQ8Bru4QyonK8UqFexJmFmc3WFDkZcAaJJcTvizQ01EePOw91TiHJd-NoAaY1I3c7mWW_-tB3Lypz5-xofSCWf4rzanPqQ0wI8mCDM',
    category: 'Lehengas',
    colors: ['#ba1a1a'],
    fabric: 'Raw Silk',
    description: 'Exquisite ruby red silk lehenga with silver gotta patti work.'
  },
  {
    id: '6',
    name: 'Sheer Organza Saree',
    price: 22400,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrE73LvohgiuD_mw02v4g20ocCgu6Ki0s1WoD0DPsFPNmgKS-ABG2R6l8dwTcN0HC0sv7WFVOuOddrv3EjOw3spqH_XVZoFSBy5afMMCIMoIawUfWpRaXZCp1_s0JVGOmMkGDYzN0hx4jhF48FEdVRcZl-DeyjC5zsbI0x6AOOLurtAWzYesXQuiSipJ8B4VCG8UlClETVVE1kuNCo9ByQmc3KAxJ8Zjm5PxrlYzh_OhVdSrdgJQwqnaAs7-8ErI2aU8_7jI2ac84W',
    category: 'Sarees',
    colors: ['#e4e3d7'],
    fabric: 'Organza',
    description: 'Sophisticated lavender organza saree with minimal silver thread embroidery.'
  },
  {
    id: '7',
    name: 'Geometric Co-ord Set',
    price: 18900,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5vTYFgdduPtQmT1okXi3nNT8alIZmBGPGMIRxJ8qdeu_hqu8vXD_5R_Tl80-mjs6NPj8wSCDrVp_g00D3_xFsiQcp3UctquaRlR2tcp_mtZ1elC3Z5qwavLJ_xoaL5zkIrdjaTYef3WfUed8CoFsvc3M_2A0OobRdTZlzq7KZWppBEJ-B7udWQQlllFbdWSK455t4YmelGMx1favmQ5Fi6ZmcdkrjUomFf_42L3-YOJOrZEdQevszMd1t3RAdyHEbuIn784YhqZCs',
    category: 'Indo-Western',
    colors: ['#1b1c15'],
    fabric: 'Crepe Silk',
    description: 'Modern Indo-Western co-ord set with geometric patterns.'
  },
  {
    id: '8',
    name: 'Heritage Banarasi Dupatta',
    price: 12000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1no4TxjKfXMx9jCWLPKSbf4YGzBzavCXbSIhb9J-ksEgxxrD6XZ67rbCTJb4l_Xw7jgv1DXD0cl5VcpjgvQI9ZjiIphSbi4bipey8_Yho3AOWibZw81mLArp_29b4kHPkHh6xLlrXPeqf4ZZzVI92onPV0i6DGLpl6A4cPPQ4t7oumm3uK0Z2lyQU37fecl2zDkPq68G1sQAlEqOTH8yu8_0NWQ300fO1AFR94Pn9wlcjYIelPM6JKeGuHKK54RkTznV1cPXsJ_27',
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
