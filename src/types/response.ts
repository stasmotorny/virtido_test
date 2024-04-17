export interface Response {
  restaurantId: string;
  restaurantName: string;
  qrCodeName: string;
  myOrder: MyOrder;
  orders: MyOrder[];
}
export interface MyOrder {
  id: string;
  orderNumber: number;
  createDate: number;
  isPaid: boolean;
  status: number;
  totalAmount: number;
  orderItems: OrderItem[];
}
export interface OrderItem {
  price: number;
  name: string;
  id: string;
  amount: number;
  status: number;
  isPaid: boolean;
}
