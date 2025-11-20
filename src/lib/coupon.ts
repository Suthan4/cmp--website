import axios from "axios";

const API_BASE_URL =
  // process.env.NEXT_PUBLIC_API_URL
  "http://localhost:5005/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface Coupon {
  _id: string;
  code: string;
  discount: number;
  discountType: "percentage" | "fixed";
  minOrderAmount: number;
  maxDiscount?: number;
  isActive: boolean;
  validUntil?: string;
  usageLimit?: number;
  usageCount: number;
}

export const couponAPI = {
  // Get all active coupons
  getAllActive: async () => {
    const response = await api.get("/coupons");
    return response.data;
  },

  // Admin: Get all coupons
  getAll: async () => {
    const response = await api.get("/coupons/admin/all");
    return response.data;
  },

  // Create coupon
  create: async (data: any) => {
    const response = await api.post("/coupons", data);
    return response.data;
  },

  // Update coupon
  update: async (id: string, data: any) => {
    const response = await api.put(`/coupons/${id}`, data);
    return response.data;
  },

  // Delete coupon
  delete: async (id: string) => {
    const response = await api.delete(`/coupons/${id}`);
    return response.data;
  },

  // Toggle active status
  toggle: async (id: string) => {
    const response = await api.patch(`/coupons/${id}/toggle`);
    return response.data;
  },
};
