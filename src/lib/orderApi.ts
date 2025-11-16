import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL
  //  "http://localhost:5005/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface OrderItem {
  menuItemId: string;
  name: string;
  price: string;
  quantity: number;
}

export interface Order {
  orderId: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  total: number;
  couponCode?: string;
  status: string;
  paymentStatus: string;
  canCancel: boolean;
  createdAt: string;
}

export const orderAPI = {
  createOrder: async (data: {
    customerName: string;
    customerPhone: string;
    items: OrderItem[];
    couponCode?: string;
  }) => {
    const response = await api.post("/orders", data);
    return response.data;
  },

  verifyPayment: async (data: {
    orderId: string;
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
  }) => {
    const response = await api.post("/orders/verify-payment", data);
    return response.data;
  },

  trackOrder: async (orderId: string) => {
    const response = await api.get(`/orders/track/${orderId}`);
    return response.data;
  },

  cancelOrder: async (orderId: string) => {
    const response = await api.post(`/orders/cancel/${orderId}`);
    return response.data;
  },

  verifyCoupon: async (code: string, subtotal: number) => {
    const response = await api.post("/orders/verify-coupon", {
      code,
      subtotal,
    });
    return response.data;
  },

  // Admin APIs
  getAllOrders: async (status?: string, page = 1) => {
    const response = await api.get("/orders/admin/all", {
      params: { status, page, limit: 20 },
    });
    return response.data;
  },

  updateOrderStatus: async (orderId: string, status: string) => {
    const response = await api.patch(`/orders/admin/${orderId}/status`, {
      status,
    });
    return response.data;
  },

  getOrderStats: async () => {
    const response = await api.get("/orders/admin/stats");
    return response.data;
  },
};
