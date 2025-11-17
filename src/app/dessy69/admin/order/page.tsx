"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Loader2, Package, Check, Wifi, WifiOff, Bell } from "lucide-react";
import { orderAPI, Order } from "@/lib/orderApi";
import { initializeSocket, disconnectSocket } from "@/lib/socket";
import type { Socket } from "socket.io-client";
import ProtectedRoutes from "@/components/protectedRoutes";

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [updatingOrder, setUpdatingOrder] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [newOrderAlert, setNewOrderAlert] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

    // Initialize socket
    const socketInstance = initializeSocket();
    setSocket(socketInstance);

    // Join admin room
    socketInstance.emit("join-admin");

    socketInstance.on("connect", () => {
      setIsConnected(true);
      socketInstance.emit("join-admin");
    });

    socketInstance.on("disconnect", () => {
      setIsConnected(false);
    });

    // Listen for new orders
    socketInstance.on("new-order", (newOrder: Order) => {
      console.log("🔔 New order received:", newOrder.orderId);

      // Show alert
      setNewOrderAlert(true);
      setTimeout(() => setNewOrderAlert(false), 3000);

      // Play sound (optional)
      playNotificationSound();

      // Add to orders list if on "all" or "pending" filter
      if (selectedStatus === "all" || selectedStatus === "pending") {
        setOrders((prevOrders) => [newOrder, ...prevOrders]);
      }
    });

    // Listen for order updates
    socketInstance.on("order-updated", (updatedOrder: Order) => {
      console.log("📦 Order updated:", updatedOrder.orderId);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === updatedOrder.orderId ? updatedOrder : order
        )
      );
    });

    // Listen for order cancellations
    socketInstance.on("order-cancelled", (cancelledOrder: Order) => {
      console.log("❌ Order cancelled:", cancelledOrder.orderId);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === cancelledOrder.orderId ? cancelledOrder : order
        )
      );
    });

    // Listen for stats updates
    socketInstance.on("stats-updated", (updatedStats: any) => {
      console.log("📊 Stats updated");
      setStats(updatedStats);
    });

    return () => {
      disconnectSocket();
    };
  }, []);

  useEffect(() => {
    fetchOrders();
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
      // Order will be updated via socket
    } catch (error: any) {
      alert(error.response?.data?.error || "Failed to update order");
    } finally {
      setUpdatingOrder(null);
    }
  };

  const playNotificationSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Restart sound
      audioRef.current.play().catch((err) => {
        console.error("Audio play failed:", err);
      });
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
      <audio
        ref={audioRef}
        src="/bell-notification-337658.mp3"
        preload="auto"
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Connection Status & New Order Alert */}
          <div className="fixed top-4 right-4 z-50 space-y-2">
            {/* Connection Status */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`flex items-center gap-2 px-3 py-2 rounded-full backdrop-blur-sm ${
                isConnected
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : "bg-red-500/20 text-red-400 border border-red-500/30"
              }`}
            >
              {isConnected ? <Wifi size={16} /> : <WifiOff size={16} />}
              <span className="text-xs font-medium">
                {isConnected ? "Live Updates" : "Disconnected"}
              </span>
            </motion.div>

            {/* New Order Alert */}
            <AnimatePresence>
              {newOrderAlert && (
                <motion.div
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 100, opacity: 0 }}
                  className="bg-orange-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2"
                >
                  <Bell size={20} />
                  <div>
                    <p className="font-bold">New Order!</p>
                    <p className="text-xs">Check pending orders</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
                Order Management
              </h1>
              {isConnected && (
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex items-center gap-1 text-green-400 text-sm"
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  Live
                </motion.div>
              )}
            </div>
            <p className="text-gray-400">
              Manage all customer orders in real-time
            </p>
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
                <motion.div
                  key={stats.totalOrders}
                  initial={{ scale: 1.2, color: "#f97316" }}
                  animate={{ scale: 1, color: "#fff" }}
                  className="text-2xl font-bold"
                >
                  {stats.totalOrders}
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-orange-500/30"
              >
                <div className="text-gray-400 text-sm mb-1">Active Orders</div>
                <motion.div
                  key={
                    stats.confirmedOrders +
                    stats.preparingOrders +
                    stats.readyOrders
                  }
                  initial={{ scale: 1.2, color: "#f97316" }}
                  animate={{ scale: 1, color: "#fb923c" }}
                  className="text-2xl font-bold"
                >
                  {stats.confirmedOrders +
                    stats.preparingOrders +
                    stats.readyOrders}
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-orange-500/30"
              >
                <div className="text-gray-400 text-sm mb-1">Completed</div>
                <motion.div
                  key={stats.completedOrders}
                  initial={{ scale: 1.2, color: "#22c55e" }}
                  animate={{ scale: 1, color: "#4ade80" }}
                  className="text-2xl font-bold"
                >
                  {stats.completedOrders}
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-orange-500/30"
              >
                <div className="text-gray-400 text-sm mb-1">Today Revenue</div>
                <motion.div
                  key={stats.todayRevenue}
                  initial={{ scale: 1.2, color: "#f97316" }}
                  animate={{ scale: 1, color: "#fb923c" }}
                  className="text-2xl font-bold"
                >
                  ₹{stats.todayRevenue}
                </motion.div>
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
              <AnimatePresence mode="popLayout">
                {orders.map((order, index) => (
                  <motion.div
                    key={order.orderId}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.03 }}
                    className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md rounded-xl p-5 border border-orange-500/20"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-white font-bold font-mono">
                            {order.orderId}
                          </h3>
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status.toUpperCase()}
                          </motion.span>
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
                              disabled={updatingOrder === order.orderId}
                              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
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
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoutes>
  );
}
