import { OrderStatus } from "@/enums/OrderStatus";
import { PaymentStatus } from "@/enums/PaymentStatus";

export interface Order {
  id: number;
  user_id: string;
  status: OrderStatus;
  payment_status: PaymentStatus;
  subtotal: number;
  shipping_fee: number;
  total: number;
  currency: string;
  shipping_address: string;
  billing_address: string | null;
  notes: string | null;
  created_at: Date | string;
  updated_at: Date | string;
  cart_id: number | null;
  discount: number | null;
  tax: number | null;
  paid_at: Date | string | null;
  shipped_at: Date | string | null;
  delivered_at: Date | string | null;
  cancelled_at: Date | string | null;
}

export interface OrderWithUser extends Order {
  user: {
    full_name: string
  }
}