export type Product = {
  id: number;
  slug: string;
  sku: string;

  name: string;
  category: string;
  collection: string;

  description: string;

  price: number;
  stock: number;

  featured: boolean;
  newArrival: boolean;
  bestSeller: boolean;

  material: string;
  gsm: number;
  fit: string;

  colors: string[];
  sizes: string[];

  images: string[];
};

export const products: Product[] = [
  {
    id: 1,
    sku: "NS-TEE-001",
    slug: "chaos-tee",

    name: "Chaos Tee",

    category: "T-Shirt",
    collection: "Chaos",

    description:
      "Built for the people who grew up surrounded by noise. Crafted from premium heavyweight cotton with a regular fit silhouette.",

    price: 890000,

    stock: 20,

    featured: true,
    newArrival: true,
    bestSeller: true,

    material: "100% Cotton",
    gsm: 250,
    fit: "Regular Fit",

    colors: ["Black"],

    sizes: ["M", "L", "XL"],

    images: [
      "/products/product01.jpg",
      "/products/product02.jpg",
    ],
  },

  {
    id: 2,
    sku: "NS-TEE-002",
    slug: "lost-kids-tee",

    name: "Lost Kids Tee",

    category: "T-Shirt",
    collection: "Lost Kids",

    description:
      "Premium heavyweight tee inspired by youth, memories and chaos.",

    price: 920000,

    stock: 18,

    featured: true,
    newArrival: true,
    bestSeller: false,

    material: "100% Cotton",
    gsm: 250,
    fit: "Regular Fit",

    colors: ["Black"],

    sizes: ["M", "L", "XL"],

    images: [
      "/products/product03.jpg",
      "/products/product04.jpg",
    ],
  },

  {
    id: 3,
    sku: "NS-TEE-003",
    slug: "noise-logo-tee",

    name: "Noise Logo Tee",

    category: "T-Shirt",
    collection: "Core",

    description:
      "Essential NOISE logo tee made from premium heavyweight cotton.",

    price: 790000,

    stock: 25,

    featured: false,
    newArrival: true,
    bestSeller: true,

    material: "100% Cotton",
    gsm: 250,
    fit: "Regular Fit",

    colors: ["Black"],

    sizes: ["M", "L", "XL"],

    images: [
      "/products/product05.jpg",
      "/products/product06.jpg",
    ],
  },
];