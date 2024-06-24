import { OrderStatus, Role } from "@prisma/client";

export const productCategories = [
  { CategoryName: "Electronics" },
  { CategoryName: "Clothing" },
  { CategoryName: "Home & Kitchen" },
  { CategoryName: "Beauty & Personal Care" },
  { CategoryName: "Sports & Outdoors" },
  { CategoryName: "Automotive" },
];

export const users = [
  {
    UserName: "younesadmine",
    UserEmail: "younes2@gmail.com",
    UserPhone: "0552666666",
    UserPassword:
      "$2a$10$FwRGa4LQgpb5po5/ro1F6.TOGbKL27rmdvq0sZco0U8qqnvKx4mLa",
    UserRole: Role.ADMIN,
  },
];
export const products = [
  {
    ProductName: "Smartphone Samsung Galaxy S21",
    ProductDesc:
      "Samsung Galaxy S21 with 128GB storage, 12GB RAM, and 6.2-inch display",
    ProductPrice: 999,
    ProductSKU: "SAMSUNGGS21",
    ProductCategoryId: 1,
    ProductImagePath:
      "https://res.cloudinary.com/duypc2nna/image/upload/v1718406503/samsung-s21_w7is4c.webp",
    ProductQuantity: 5,
  },
  {
    ProductName: "Men's Leather Jacket",
    ProductDesc:
      "Genuine leather jacket for men, available in various sizes and colors",
    ProductPrice: 199,
    ProductSKU: "MENLEATHERJKT",
    ProductCategoryId: 2,
    ProductImagePath:
      "https://res.cloudinary.com/duypc2nna/image/upload/v1718406691/jacket_fnngia.jpg",
    ProductQuantity: 5,
  },
  {
    ProductName: "Instant Pot Pressure Cooker",
    ProductDesc:
      "Multi-function electric pressure cooker with various cooking modes and programmable timer",
    ProductPrice: 79.99,
    ProductSKU: "INSTANTPOTPC",
    ProductCategoryId: 3,
    ProductImagePath:
      "https://res.cloudinary.com/duypc2nna/image/upload/v1718406772/friteuse_y8ea1s.jpg",
    ProductQuantity: 5,
  },
];
export const orders = [];
export const orderDetails = [];
