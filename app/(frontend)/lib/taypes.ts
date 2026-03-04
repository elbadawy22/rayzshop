export type SearchParamsProducts = {
  search?: string;
  categoryId?: string;
  maxPrice?: string;
  minPrice?: string;
  priceOrder?: string;
  pageNumber?: string;
};

export type UsersDots = {
  id: string;
  name: string;
  email: string;
  phone: string;
  deliveryAddress?: string | null;
  password?: string;
  role: string;
  createdAt: string;
  products?: Products[] ;
  orders?: Orders[];
  categories?: Categories[];
};
export type Products = {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  price: number;
  stock: number;
  createdById: string;
  createdAt: string;
  image: {
    id: string;
    url: string;
  }[];
  category: Categories;
  createdBy: UsersDots;
};
export type Categories = {
  id: string;
  name: string;
  description: string;
  stock: number;
  createdById: string;
  createdAt: string;
  images: {
    id: string;
    url: string;
  }[];
  product: Products[];
  createdBy: UsersDots;
};
export type Orders = {
  id: string;
  userId: string | null;
  user?: UsersDots;
  status: string;
  totalPrice: number;
  deliveryAddress: string;
  createdAt: string;
  guestInfo: string | null;
  guestOrderInfo?: GuestOrderInfo;
  orderItems?: OrderItem[];
};
export type OrderItem = {
  id: string;
  orderId: string | null;
  productId: string;
  quantity: number;
  product: Products;
};
export type GuestOrderInfo = {
  id: string;
  orederid: string;
  name: string;
  deliveryAddress: string;
  phone: string;
  order?: Orders[];
};

export interface UserProfile extends UsersDots {
}
export interface CartItem extends Products {
  quantity: number;
}

export type ItemCart = {
  name: string;
  phone: string;
  orderItems: {
    id: string;
    quantity: number;
  }[];
  deliveryAddress: string;
};
