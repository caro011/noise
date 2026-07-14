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
    slug: "tee-xuong",

    name: "TEE XƯƠNG",

    category: "T-Shirt",
    collection: "NOISE",

    description: "",

    price: 229000,

    stock: 20,

    featured: true,
    newArrival: true,
    bestSeller: true,

    material: "100% Cotton 2 chiều",
    gsm: 250,
    fit: "Regular Fit",

    colors: ["Đen"],

    sizes: ["M", "L", "XL"],

    images: [
      "/products/teexuong-01.png",
      "/products/teexuong-02.png",
    ],
  },

  {
    id: 2,
    sku: "NS-TEE-002",
    slug: "tee-child",

    name: "TEE CHILD",

    category: "T-Shirt",
    collection: "NOISE",

    description: "",

    price: 229000,

    stock: 20,

    featured: true,
    newArrival: true,
    bestSeller: false,

    material: "100% Cotton 2 chiều",
    gsm: 250,
    fit: "Regular Fit",

    colors: ["Đen"],

    sizes: ["M", "L", "XL"],

    images: [
      "/products/teechild-01.png",
      "/products/teechild-02.png",
    ],
  },

  {
    id: 3,
    sku: "NS-TEE-003",
    slug: "tee-hoa",

    name: "TEE HOA",

    category: "T-Shirt",
    collection: "NOISE",

    description: "",

    price: 229000,

    stock: 20,

    featured: true,
    newArrival: true,
    bestSeller: false,

    material: "100% Cotton 2 chiều",
    gsm: 250,
    fit: "Regular Fit",

    colors: ["Đen"],

    sizes: ["M", "L", "XL"],

    images: [
      "/products/teehoa-01.png",
      "/products/teehoa-02.png",
    ],
  },
];