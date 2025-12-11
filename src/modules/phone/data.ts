type Phone = {
  id: number;
  brand: string;
  model: string;
  slug: string;
  price: number;
  os: string;
  createdAt: Date;
  updatedAt: Date;
};

type Phones = Phone[];

export const dataPhones = [
  {
    id: 1,
    brand: "Apple",
    model: "IPhone 17",
    slug: "iphone",
    price: 999,
    os: "iOS",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    brand: "Samsung",
    model: "Galaxy S25",
    slug: "galaxy",
    price: 899,
    os: "Android",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    brand: "Xiaomi",
    model: "Xiaomi 15",
    slug: "xiaomi",
    price: 499,
    os: "Android",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
