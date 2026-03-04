import { Role } from "../generated/prisma/client";
import { OrderStatus } from "../generated/prisma/client";

export type JwtPayload = {
  id: string;
  name: string;
  email: string;
  role: string;
};
export type UserRegisterDto = {
  name: string;
  email: string;
  phone: string;
  password: string;
};
export type UserLoginDto = {
  email: string;
  password: string;
};

export type CreateUser = {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: Role;
};
export type UpdateUser = {
  name?: string;
  phone?: string;
  password?: string;
  role?: Role;
};

export type CreateCategory = {
  name: string;
  description?: string;
  stock: number;
  image?: [File];
};
export type UpdateCategory = {
  name?: string;
  description?: string;
  stock?: number;
};
export type CreateProduct = {
  name: string;
  stock: number;
  categoryId: string;
  price: number;
  description?: string;
  image?: string;
};
export type UpdateProduct = {
  name?: string;
  stock?: number;
  categoryId?: string;
  price?: number;
  description?: string;
  image?: string;
};

export type ImagesDots = {
  public_id: string;
  url: string;
};
export type ImagesFile = {
  image: [File];
};

export type CreateOrder = {
  deliveryAddress: String;
  name: string;
  phone: string;
  orderItems: OrderItem[];
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: {
    id: string;
    url: string;
  }[];
  quantity: number;
};

export type Order = {
  id: string;
  userId?: String;
  status: OrderStatus;
  totalPrice?: Number;
  deliveryAddress: String;
  createdAt: String;
  user?: String;
  orderItems: OrderItem[];
  guestInfo?: String;
  guestOrderInfo?: GuestOrderInfo;
};

export type OrderItem = {
  id: String;
  orderId: string;
  productId: String;
  quantity: number;
  order: Order;
  product: Product;
};

export type GuestOrderInfo = {
  id: String;
  orederid: string;
  name: String;
  phone: String;
  deliveryAddress: String;
  order: Order;
};
