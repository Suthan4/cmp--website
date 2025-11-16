"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Search,
  Loader2,
  Package,
  Check,
  Clock,
  XCircle,
  ChefHat,
  BellRing,
} from "lucide-react";
import { orderAPI, Order } from "@/lib/orderApi";
import { useSearchParams } from "next/navigation";

export default function OrderTrack() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const searchParams = useSearchParams();
  const orderIdfromParams = searchParams.get("orderId");

  const trackOrder = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!orderId.trim()) return;

    try {
      setLoading(true);
      setError("");
      const response = await orderAPI.trackOrder(orderId.trim().toUpperCase());
      setOrder(response.data);

      // Calculate time left for cancellation
      if (response.data.canCancel) {
        const createdTime = new Date(response.data.createdAt).getTime();
        const elapsed = Date.now() - createdTime;
        const remaining = Math.max(0, 60000 - elapsed);
        setTimeLeft(Math.floor(remaining / 1000));
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Order not found");
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    if (
      !order ||
      !window.confirm("Are you sure you want to cancel this order?")
    )
      return;

    try {
      await orderAPI.cancelOrder(order.orderId);
      setOrder({ ...order, status: "cancelled" });
      alert("Order cancelled successfully");
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to cancel order");
    }
  };

  const getStatusInfo = (status: string) => {
    const statusMap: Record<
      string,
      { icon: any; color: string; label: string }
    > = {
      pending: {
        icon: Clock,
        color: "text-yellow-400",
        label: "Payment Pending",
      },
      confirmed: {
        icon: Check,
        color: "text-blue-400",
        label: "Order Confirmed",
      },
      preparing: {
        icon: ChefHat,
        color: "text-orange-400",
        label: "Preparing Your Food",
      },
      ready: { icon: BellRing, color: "text-green-400", label: "Order Ready!" },
      completed: { icon: Check, color: "text-green-500", label: "Completed" },
      cancelled: { icon: XCircle, color: "text-red-400", label: "Cancelled" },
    };
    return statusMap[status] || statusMap.pending;
  };

  const statusSteps = [
    { key: "confirmed", label: "Confirmed", icon: Check },
    { key: "preparing", label: "Preparing", icon: ChefHat },
    { key: "ready", label: "Ready", icon: BellRing },
  ];

  const getStatusIndex = (status: string) => {
    const index = statusSteps.findIndex((s) => s.key === status);
    return index >= 0 ? index : -1;
  };

  useEffect(() => {
    if (orderIdfromParams) {
      setOrderId(orderIdfromParams.toUpperCase());
    }
  }, [orderIdfromParams]);

  // Auto-trigger trackOrder when orderId is set from params
  useEffect(() => {
    if (orderId) {
      trackOrder(); // No event needed
    }
  }, [orderId]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-10 px-4 sm:px-0">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400 mb-2">
            Track Your Order
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Enter your order ID to track status
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={trackOrder}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value.toUpperCase())}
              placeholder="Enter Order ID (e.g., ORD-ABC12345)"
              className="flex-1 bg-gray-900/80 border border-orange-500/30 rounded-xl px-4 py-3 sm:py-4 text-white placeholder-gray-500 text-sm sm:text-base focus:border-orange-500 focus:outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold text-sm sm:text-base hover:shadow-lg hover:shadow-orange-500/50 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <Search size={20} />
              )}
              Track
            </button>
          </div>
        </motion.form>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg mb-4 text-center text-sm"
          >
            {error}
          </motion.div>
        )}

        {/* Order Details */}
        {order && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Status Card */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-4 sm:p-6 border-2 border-orange-500/30">
              <div className="flex items-center justify-center mb-6">
                {(() => {
                  const statusInfo = getStatusInfo(order.status);
                  const Icon = statusInfo.icon;
                  return (
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring" }}
                        className={`inline-block p-3 sm:p-4 rounded-full bg-${statusInfo.color.replace(
                          "text-",
                          ""
                        )}/20 mb-3`}
                      >
                        <Icon size={40} className={`${statusInfo.color}`} />
                      </motion.div>
                      <h2
                        className={`text-xl sm:text-2xl font-bold ${statusInfo.color}`}
                      >
                        {statusInfo.label}
                      </h2>
                    </div>
                  );
                })()}
              </div>

              {/* Progress Bar */}
              {order.status !== "cancelled" && order.status !== "completed" && (
                <div className="mb-6">
                  <div className="flex justify-between relative">
                    {statusSteps.map((step, index) => {
                      const Icon = step.icon;
                      const currentIndex = getStatusIndex(order.status);
                      const isActive = index <= currentIndex;
                      const isCompleted = index < currentIndex;

                      return (
                        <div key={step.key} className="flex-1 relative">
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                                isActive
                                  ? "border-orange-500 bg-orange-500/20"
                                  : "border-gray-600 bg-gray-800"
                              }`}
                            >
                              <Icon
                                size={20}
                                className={
                                  isActive ? "text-orange-400" : "text-gray-600"
                                }
                              />
                            </div>
                            <span
                              className={`mt-2 text-[10px] sm:text-xs ${
                                isActive ? "text-orange-400" : "text-gray-600"
                              }`}
                            >
                              {step.label}
                            </span>
                          </div>

                          {index < statusSteps.length - 1 && (
                            <div
                              className={`absolute top-5 sm:top-6 left-1/2 w-full h-0.5 transition-all ${
                                isCompleted ? "bg-orange-500" : "bg-gray-700"
                              }`}
                              style={{ zIndex: -1 }}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Cancel Button */}
              {order.canCancel &&
                order.status !== "cancelled" &&
                timeLeft > 0 && (
                  <div className="text-center mt-4">
                    <p className="text-yellow-400 text-xs sm:text-sm mb-2">
                      You can cancel within {timeLeft}s
                    </p>
                    <button
                      onClick={handleCancelOrder}
                      className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-all text-sm"
                    >
                      Cancel Order
                    </button>
                  </div>
                )}
            </div>

            {/* Order Info */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-4 sm:p-6 border border-orange-500/30">
              <h3 className="text-lg sm:text-xl font-bold text-orange-400 mb-4">
                Order Details
              </h3>

              <div className="space-y-3 mb-4 text-sm sm:text-base">
                <div>
                  <span className="text-gray-400 text-sm">Order ID</span>
                  <p className="text-white font-mono font-bold break-all">
                    {order.orderId}
                  </p>
                </div>

                <div>
                  <span className="text-gray-400 text-sm">Customer</span>
                  <p className="text-white">{order.customerName}</p>
                  <p className="text-gray-400 text-sm">{order.customerPhone}</p>
                </div>

                <div>
                  <span className="text-gray-400 text-sm">Order Time</span>
                  <p className="text-white">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <h4 className="text-white font-semibold mb-3">Items</h4>
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">
                      {item.name} x{item.quantity}
                    </span>
                    <span className="text-white">
                      ₹{parseFloat(item.price) * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-700 pt-4 mt-4 space-y-2 text-sm sm:text-base">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>₹{order.subtotal}</span>
                </div>

                {order.discount > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>
                      Discount {order.couponCode && `(${order.couponCode})`}
                    </span>
                    <span>-₹{order.discount}</span>
                  </div>
                )}

                <div className="flex justify-between text-xl sm:text-2xl font-bold text-orange-400">
                  <span>Total</span>
                  <span>₹{order.total}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
