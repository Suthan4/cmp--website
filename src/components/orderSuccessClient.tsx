"use client";
import { motion } from "framer-motion";
import { CheckCircle, Download, Package } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { orderAPI, Order } from "@/lib/orderApi";

export default function OrderSuccessClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const response = await orderAPI.trackOrder(orderId!);
      setOrder(response.data);
    } catch (error) {
      console.error("Failed to fetch order");
    } finally {
      setLoading(false);
    }
  };

  const downloadReceipt = () => {
    if (!order) return;

    const receiptContent = `
DESSY 69 - ORDER RECEIPT
========================

Order ID: ${order.orderId}
Customer: ${order.customerName}
Phone: ${order.customerPhone}
Date: ${new Date(order.createdAt).toLocaleString()}

ITEMS:
${order.items
  .map(
    (item) =>
      `${item.name} x${item.quantity} - ₹${
        parseFloat(item.price) * item.quantity
      }`
  )
  .join("\n")}

Subtotal: ₹${order.subtotal}
${order.discount > 0 ? `Discount: -₹${order.discount}\n` : ""}Total: ₹${
      order.total
    }

Status: ${order.status.toUpperCase()}
Payment: ${order.paymentStatus.toUpperCase()}

Thank you for ordering!
    `;

    const blob = new Blob([receiptContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `receipt-${order.orderId}.txt`;
    link.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-orange-400">Loading...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-400">Order not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border-2 border-orange-500/30"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="flex justify-center mb-6"
        >
          <div className="bg-green-500/20 p-4 rounded-full">
            <CheckCircle size={64} className="text-green-400" />
          </div>
        </motion.div>

        <h1 className="text-3xl font-bold text-center text-orange-400 mb-2">
          Order Confirmed!
        </h1>
        <p className="text-center text-gray-400 mb-6">
          Your delicious food is on its way
        </p>

        <div className="bg-gray-900/50 rounded-lg p-4 mb-6 space-y-3">
          <div>
            <span className="text-gray-400 text-sm">Order ID</span>
            <p className="text-white font-mono font-bold text-lg">
              {order.orderId}
            </p>
          </div>
          <div>
            <span className="text-gray-400 text-sm">Customer</span>
            <p className="text-white">{order.customerName}</p>
            <p className="text-gray-400 text-sm">{order.customerPhone}</p>
          </div>
          <div>
            <span className="text-gray-400 text-sm">Items</span>
            {order.items.map((item, i) => (
              <p key={i} className="text-white text-sm">
                {item.name} x{item.quantity} - ₹
                {parseFloat(item.price) * item.quantity}
              </p>
            ))}
          </div>
          <div className="pt-3 border-t border-gray-700">
            <div className="flex justify-between text-xl font-bold">
              <span className="text-orange-400">Total Paid</span>
              <span className="text-orange-400">₹{order.total}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={downloadReceipt}
            className="w-full bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all flex items-center justify-center gap-2"
          >
            <Download size={20} />
            Download Receipt
          </button>
          <button
            onClick={() =>
              router.push(`/dessy69/track?orderId=${order.orderId}`)
            }
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all flex items-center justify-center gap-2"
          >
            <Package size={20} />
            Track Order
          </button>
        </div>
      </motion.div>
    </div>
  );
}
