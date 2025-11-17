"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Loader2, Package, Clock, Check, XCircle, Filter } from "lucide-react";
import { orderAPI, Order } from "@/lib/orderApi";
import ProtectedRoutes from "@/components/protectedRoutes";

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [updatingOrder, setUpdatingOrder] = useState<string | null>(null);

  const statusFilters = [
    { id: "all", label: "All Orders", count: 0 },
    { id: "confirmed", label: "Confirmed", count: 0 },
    { id: "preparing", label: "Preparing", count: 0 },
    { id: "ready", label: "Ready", count: 0 },
    { id: "completed", label: "Completed", count: 0 },
    { id: "pending", label: "Pending", count: 0 },
    { id: "cancelled", label: "Cancelled", count: 0 },
  ];

  useEffect(() => {
    fetchOrders();
    fetchStats();
  }, [selectedStatus]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderAPI.getAllOrders(
        selectedStatus !== "all" ? selectedStatus : undefined
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await orderAPI.getOrderStats();
      setStats(response.data);
    } catch (error) {
      console.error("Failed to fetch stats");
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      setUpdatingOrder(orderId);
      await orderAPI.updateOrderStatus(orderId, newStatus);
      fetchOrders();
      fetchStats();
    } catch (error: any) {
      alert(error.response?.data?.error || "Failed to update order");
    } finally {
      setUpdatingOrder(null);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      confirmed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      preparing: "bg-orange-500/20 text-orange-400 border-orange-500/30",
      ready: "bg-green-500/20 text-green-400 border-green-500/30",
      completed: "bg-green-600/20 text-green-500 border-green-600/30",
      cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
    };
    return colors[status] || colors.pending;
  };

  const getNextStatus = (currentStatus: string) => {
    const flow: Record<string, string> = {
      pending: "confirmed",
      confirmed: "preparing",
      preparing: "ready",
      ready: "completed",
    };
    return flow[currentStatus];
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      confirmed: "Confirm Order",
      preparing: "Start Preparing",
      ready: "Mark Ready",
      completed: "Complete Order",
    };
    return labels[status] || "Update Status";
  };

  return (
    <ProtectedRoutes>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400 mb-2">
              Order Management
            </h1>
            <p className="text-gray-400">Manage all customer orders</p>
          </motion.div>

          {/* Stats Cards */}
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-orange-500/30"
              >
                <div className="text-gray-400 text-sm mb-1">Total Orders</div>
                <div className="text-2xl font-bold text-white">
                  {stats.totalOrders}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-orange-500/30"
              >
                <div className="text-gray-400 text-sm mb-1">Active</div>
                <div className="text-2xl font-bold text-orange-400">
                  {stats.confirmedOrders +
                    stats.preparingOrders +
                    stats.readyOrders}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-orange-500/30"
              >
                <div className="text-gray-400 text-sm mb-1">Completed</div>
                <div className="text-2xl font-bold text-green-400">
                  {stats.completedOrders}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-orange-500/30"
              >
                <div className="text-gray-400 text-sm mb-1">Today Revenue</div>
                <div className="text-2xl font-bold text-orange-400">
                  ₹{stats.todayRevenue}
                </div>
              </motion.div>
            </div>
          )}

          {/* Status Filters */}
          <div className="mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {statusFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedStatus(filter.id)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  selectedStatus === filter.id
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg"
                    : "bg-gray-800/50 text-gray-400 border border-orange-500/20 hover:border-orange-500/40"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Orders List */}
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-orange-500" size={48} />
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-20">
              <Package size={64} className="mx-auto text-gray-600 mb-4" />
              <p className="text-gray-400">No orders found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order, index) => (
                <motion.div
                  key={order.orderId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md rounded-xl p-5 border border-orange-500/20"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-white font-bold font-mono">
                          {order.orderId}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {
                            order.status === "pending" ? "payment-failure/pending" : order.status.toUpperCase()
                          }
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-1">
                        {order.customerName} • {order.customerPhone}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                      <div className="mt-2">
                        <p className="text-gray-400 text-sm">
                          {order.items.length} item(s) • ₹{order.total}
                        </p>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex gap-2">
                      {order.status !== "completed" &&
                        order.status !== "cancelled" &&
                        getNextStatus(order.status) && (
                          <button
                            onClick={() =>
                              updateOrderStatus(
                                order.orderId,
                                getNextStatus(order.status)
                              )
                            }
                            disabled={
                              updatingOrder === order.orderId || order.status === "pending"
                            }
                            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all disabled:opacity-50 flex items-center gap-2 whitespace-nowrap disabled:cursor-not-allowed"
                          >
                            {updatingOrder === order.orderId ? (
                              <Loader2 className="animate-spin" size={16} />
                            ) : (
                              <Check size={16} />
                            )}
                            {getStatusLabel(getNextStatus(order.status))}
                          </button>
                        )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoutes>
  );
}
