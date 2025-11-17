// "use client";
// import { motion, AnimatePresence } from "framer-motion";
// import { useState, useEffect } from "react";
// import { Search, X, Loader2, WifiOff } from "lucide-react";
// import { menuAPI, MenuItem } from "@/lib/api";

// export default function MenuClient() {
//   const [particles, setParticles] = useState<
//     {
//       startX: number;
//       startY: number;
//       endX: number;
//       endY: number;
//       duration: number;
//     }[]
//   >([]);
//   const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [imageError, setImageError] = useState(false);
//   const [isOnline, setIsOnline] = useState(true);

//   const categories = [
//     { id: "all", label: "All", emoji: "📋" },
//     { id: "starters", label: "Starters", emoji: "🍢" },
//     { id: "main", label: "Main", emoji: "🍛" },
//     { id: "desserts", label: "Desserts", emoji: "🍰" },
//     { id: "beverages", label: "Drinks", emoji: "🥤" },
//   ];

//   // Check online status
//   useEffect(() => {
//     const handleOnline = () => setIsOnline(true);
//     const handleOffline = () => setIsOnline(false);

//     window.addEventListener("online", handleOnline);
//     window.addEventListener("offline", handleOffline);

//     setIsOnline(navigator.onLine);

//     return () => {
//       window.removeEventListener("online", handleOnline);
//       window.removeEventListener("offline", handleOffline);
//     };
//   }, []);

//   useEffect(() => {
//     const generated = [...Array(8)].map(() => ({
//       startX: Math.random() * 100,
//       startY: Math.random() * 100,
//       endX: Math.random() * 100,
//       endY: Math.random() * 100,
//       duration: 15 + Math.random() * 10,
//     }));
//     setParticles(generated);
//   }, []);

//   // Fetch menu items
//   const fetchMenuItems = async () => {
//     if (!isOnline) {
//       setError("You're offline. Please check your internet connection.");
//       setLoading(false);
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);
//       const response = await menuAPI.getAll({
//         category: selectedCategory !== "all" ? selectedCategory : undefined,
//         available: "instock",
//         search: searchQuery || undefined,
//       });
//       setMenuItems(response.data);
//     } catch (err: any) {
//       setError(err.response?.data?.error || "Failed to load menu");
//       console.error("Error fetching menu items:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMenuItems();
//   }, [selectedCategory, searchQuery, isOnline]);

//   // Group items by category
//   const groupedItems = menuItems.reduce((acc, item) => {
//     if (!acc[item.category]) {
//       acc[item.category] = [];
//     }
//     acc[item.category].push(item);
//     return acc;
//   }, {} as Record<string, MenuItem[]>);

//   return (
//     <div className="bg-black relative overflow-hidden">
//       {/* Simplified Background for Mobile Performance */}
//       <div className="fixed inset-0 z-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-80">
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,146,60,0.1),transparent_50%)]" />
//       </div>

//       {/* Fewer Floating particles for mobile performance */}
//       <div className="fixed inset-0 z-0 pointer-events-none">
//         {particles.map((p, i) => (
//           <motion.div
//             key={i}
//             className="absolute w-1.5 h-1.5 bg-orange-500/30 rounded-full"
//             style={{ left: `${p.startX}%`, top: `${p.startY}%` }}
//             animate={{ left: `${p.endX}%`, top: `${p.endY}%` }}
//             transition={{
//               duration: p.duration,
//               repeat: Infinity,
//               repeatType: "reverse",
//               ease: "linear",
//             }}
//           />
//         ))}
//       </div>

//       {/* Content */}
//       <div className="relative z-10 px-3 py-4 pb-20 sm:p-6">
//         <div className="max-w-2xl mx-auto">
//           {/* Offline Banner */}
//           {!isOnline && (
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-lg p-3 mb-4 flex items-center justify-center gap-2"
//             >
//               <WifiOff size={16} className="text-red-400 flex-shrink-0" />
//               <p className="text-red-300 text-sm font-medium">You're offline</p>
//             </motion.div>
//           )}

//           {/* Compact Title */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.3 }}
//             className="text-center mb-4"
//           >
//             <motion.h1
//               animate={{
//                 textShadow: [
//                   "0 0 15px rgba(251, 146, 60, 0.5)",
//                   "0 0 25px rgba(251, 146, 60, 0.8)",
//                   "0 0 15px rgba(251, 146, 60, 0.5)",
//                 ],
//               }}
//               transition={{
//                 duration: 3,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//               className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400"
//             >
//               Dessy 69 Menu
//             </motion.h1>
//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.3 }}
//               className="text-gray-400 mt-1 text-sm sm:text-base"
//             >
//               Mysuru's Finest Culinary Experience
//             </motion.p>
//           </motion.div>

//           {/* Compact Search */}
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="mb-3"
//           >
//             <div className="relative">
//               <Search
//                 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                 size={18}
//               />
//               <input
//                 type="text"
//                 placeholder="Search dishes..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full bg-gray-900/80 backdrop-blur-md border border-orange-500/30 rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-all"
//               />
//               {searchQuery && (
//                 <button
//                   onClick={() => setSearchQuery("")}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
//                 >
//                   <X size={18} />
//                 </button>
//               )}
//             </div>
//           </motion.div>

//           {/* Horizontal Scrolling Categories */}
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="mb-4 -mx-3 px-3"
//           >
//             <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
//               {categories.map((cat) => (
//                 <motion.button
//                   key={cat.id}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => setSelectedCategory(cat.id)}
//                   className={`flex-shrink-0 snap-start px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
//                     selectedCategory === cat.id
//                       ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg"
//                       : "bg-gray-900/80 backdrop-blur-md text-gray-400 border border-orange-500/20"
//                   }`}
//                 >
//                   <span className="mr-1">{cat.emoji}</span>
//                   {cat.label}
//                 </motion.button>
//               ))}
//             </div>
//           </motion.div>

//           {/* Error Message */}
//           {error && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 text-red-300 px-4 py-3 rounded-lg mb-4 text-sm text-center"
//             >
//               {error}
//             </motion.div>
//           )}

//           {/* Loading Spinner */}
//           {loading && (
//             <div className="flex flex-col items-center justify-center py-16">
//               <Loader2
//                 className="animate-spin text-orange-500 mb-3"
//                 size={40}
//               />
//               <p className="text-gray-400 text-sm">Loading menu...</p>
//             </div>
//           )}

//           {/* Menu Items */}
//           {!loading && !error && (
//             <>
//               {selectedCategory === "all" ? (
//                 <>
//                   {Object.entries(groupedItems).map(([category, items]) => {
//                     const categoryInfo = categories.find(
//                       (c) => c.id === category
//                     );
//                     return (
//                       <MenuSection
//                         key={category}
//                         title={`${categoryInfo?.emoji || ""} ${
//                           categoryInfo?.label || category
//                         }`}
//                         items={items}
//                       />
//                     );
//                   })}
//                 </>
//               ) : (
//                 <MenuSection title="" items={menuItems} />
//               )}

//               {/* No Results */}
//               {menuItems.length === 0 && (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   className="text-center py-16"
//                 >
//                   <div className="text-5xl mb-3">🍽️</div>
//                   <p className="text-gray-400 text-base mb-1">
//                     {searchQuery ? `No dishes found` : "No items available"}
//                   </p>
//                   <p className="text-gray-500 text-sm">
//                     Try a different search
//                   </p>
//                 </motion.div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// function MenuSection({ title, items }: { title: string; items: MenuItem[] }) {
//   if (items.length === 0) return null;

//   return (
//     <motion.section
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.3 }}
//       className="mb-6"
//     >
//       {title && (
//         <h2 className="text-xl sm:text-2xl font-bold text-orange-400 mb-3 pb-2 border-b border-orange-500/30">
//           {title}
//         </h2>
//       )}
//       <div className="space-y-3">
//         <AnimatePresence mode="popLayout">
//           {items.map((item, index) => (
//             <MenuItemCard key={item._id} item={item} index={index} />
//           ))}
//         </AnimatePresence>
//       </div>
//     </motion.section>
//   );
// }

// function MenuItemCard({ item, index }: { item: MenuItem; index: number }) {
//   return (
//     <motion.div
//       layout
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, scale: 0.95 }}
//       transition={{ delay: index * 0.03, duration: 0.2 }}
//       className="bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-md rounded-xl border border-orange-500/20 overflow-hidden"
//     >
//       {/* Mobile-optimized layout */}
//       <div className="p-4">
//         {/* Header: Name and Price */}
//         <div className="flex items-start justify-between gap-3 mb-2">
//           <div className="flex-1 min-w-0">
//             <h3 className="text-base sm:text-lg font-bold text-white mb-1 break-words">
//               {item.name}
//             </h3>
//             {item.available && (
//               <span className="inline-block px-2 py-0.5 text-xs font-semibold bg-green-500/20 text-green-400 border border-green-500/30 rounded-full">
//                 Available
//               </span>
//             )}
//           </div>
//           <div className="flex-shrink-0 bg-gradient-to-br from-orange-500 to-amber-600 text-white font-bold text-base sm:text-lg px-3 py-2 rounded-lg shadow-lg">
//             ₹{item.price}
//           </div>
//         </div>

//         {/* Description */}
//         <p className="text-gray-400 text-sm leading-relaxed mb-2">
//           {item.description}
//         </p>

//         {/* Category Tag */}
//         <span className="inline-block text-xs text-gray-500 capitalize bg-gray-800/50 px-2 py-1 rounded">
//           {item.category}
//         </span>
//       </div>
//     </motion.div>
//   );
// }

"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Search,
  X,
  Loader2,
  WifiOff,
  ShoppingCart,
  Plus,
  Wifi,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { menuAPI, MenuItem } from "@/lib/api";
import { initializeSocket, disconnectSocket } from "@/lib/socket";
import type { Socket } from "socket.io-client";
import Cart from "@/components/cart";
import CheckoutModal from "@/components/checkoutModal";

interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
}

export default function MenuClient() {
  const router = useRouter();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isOnline, setIsOnline] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [particles, setParticles] = useState<
    {
      startX: number;
      startY: number;
      endX: number;
      endY: number;
      duration: number;
    }[]
  >([]);

  // Cart states
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const categories = [
    { id: "all", label: "All", emoji: "📋" },
    { id: "starters", label: "Starters", emoji: "🍢" },
    { id: "main", label: "Main", emoji: "🍛" },
    { id: "desserts", label: "Desserts", emoji: "🍰" },
    { id: "beverages", label: "Drinks", emoji: "🥤" },
  ];

  // Initialize Socket.IO
  useEffect(() => {
    const socketInstance = initializeSocket();
    setSocket(socketInstance);

    if (socketInstance.connected) {
      setIsConnected(true);
      socketInstance.emit("join-menu");
    }

    socketInstance.on("connect", () => {
      setIsConnected(true);
      socketInstance.emit("join-menu");
    });

    socketInstance.on("disconnect", () => {
      setIsConnected(false);
    });

    socketInstance.on("menu-item-created", (newItem: MenuItem) => {
      console.log("🆕 New menu item:", newItem);
      if (newItem.available) {
        setMenuItems((prev) => [newItem, ...prev]);
      }
    });

    socketInstance.on("menu-item-updated", (updatedItem: MenuItem) => {
      console.log("✏️ Menu item updated:", updatedItem);
      setMenuItems((prev) => {
        const exists = prev.some((item) => item._id === updatedItem._id);

        if (updatedItem.available) {
          if (exists) {
            return prev.map((item) =>
              item._id === updatedItem._id ? updatedItem : item
            );
          } else {
            return [updatedItem, ...prev];
          }
        } else {
          return prev.filter((item) => item._id !== updatedItem._id);
        }
      });
    });

    socketInstance.on("menu-item-toggled", (toggledItem: MenuItem) => {
      console.log("🔄 Menu item toggled:", toggledItem);
      setMenuItems((prev) => {
        if (toggledItem.available) {
          const exists = prev.some((item) => item._id === toggledItem._id);
          if (exists) {
            return prev.map((item) =>
              item._id === toggledItem._id ? toggledItem : item
            );
          } else {
            return [toggledItem, ...prev];
          }
        } else {
          return prev.filter((item) => item._id !== toggledItem._id);
        }
      });
    });

    socketInstance.on("menu-item-deleted", (deletedItemId: string) => {
      console.log("🗑️ Menu item deleted:", deletedItemId);
      setMenuItems((prev) => prev.filter((item) => item._id !== deletedItemId));
    });

    return () => {
      socketInstance.emit("leave-menu");
      disconnectSocket();
    };
  }, []);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    const generated = [...Array(8)].map(() => ({
      startX: Math.random() * 100,
      startY: Math.random() * 100,
      endX: Math.random() * 100,
      endY: Math.random() * 100,
      duration: 15 + Math.random() * 10,
    }));
    setParticles(generated);
  }, []);

  const fetchMenuItems = async () => {
    if (!isOnline) {
      setError("You're offline. Please check your internet connection.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await menuAPI.getAll({
        category: selectedCategory !== "all" ? selectedCategory : undefined,
        available: "instock",
        search: searchQuery || undefined,
      });
      setMenuItems(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to load menu");
      console.error("Error fetching menu items:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, [selectedCategory, searchQuery, isOnline]);

  const groupedItems = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  // Cart functions - Updated to sync with card quantities
  const addToCart = (item: MenuItem) => {
    const existingItem = cartItems.find((ci) => ci.id === item._id);
    if (existingItem) {
      setCartItems(
        cartItems.map((ci) =>
          ci.id === item._id ? { ...ci, quantity: ci.quantity + 1 } : ci
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          id: item._id,
          name: item.name,
          price: item.price,
          quantity: 1,
        },
      ]);
    }
  };

  const removeFromCart = (itemId: string) => {
    const existingItem = cartItems.find((ci) => ci.id === itemId);
    if (existingItem && existingItem.quantity > 1) {
      setCartItems(
        cartItems.map((ci) =>
          ci.id === itemId ? { ...ci, quantity: ci.quantity - 1 } : ci
        )
      );
    } else {
      setCartItems(cartItems.filter((ci) => ci.id !== itemId));
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      setCartItems(cartItems.filter((item) => item.id !== id));
      return;
    }
    setCartItems(
      cartItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (orderId: string) => {
    setIsCheckoutOpen(false);
    setCartItems([]);
    router.push(`/dessy69/order-success?orderId=${orderId}`);
  };

  // Calculate number of unique items (not total quantity)
  const cartItemCount = cartItems.length;

  // Calculate total price
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Connection Status Indicator */}
      <div className="fixed top-4 right-4 z-50">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`flex items-center gap-2 px-3 py-2 rounded-full backdrop-blur-sm ${
            isConnected
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
          }`}
        >
          {isConnected ? <Wifi size={14} /> : <WifiOff size={14} />}
          <span className="text-xs font-medium">
            {isConnected ? "Live" : "Connecting..."}
          </span>
        </motion.div>
      </div>

      {/* Simplified Background */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-80">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,146,60,0.1),transparent_50%)]" />
      </div>

      {/* Floating particles */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-orange-500/30 rounded-full"
            style={{ left: `${p.startX}%`, top: `${p.startY}%` }}
            animate={{ left: `${p.endX}%`, top: `${p.endY}%` }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 px-3 py-4 pb-24 sm:p-6">
        <div className="max-w-2xl mx-auto">
          {/* Offline Banner */}
          {!isOnline && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-lg p-3 mb-4 flex items-center justify-center gap-2"
            >
              <WifiOff size={16} className="text-red-400 flex-shrink-0" />
              <p className="text-red-300 text-sm font-medium">You're offline</p>
            </motion.div>
          )}

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-4"
          >
            <motion.h1
              animate={{
                textShadow: [
                  "0 0 15px rgba(251, 146, 60, 0.5)",
                  "0 0 25px rgba(251, 146, 60, 0.8)",
                  "0 0 15px rgba(251, 146, 60, 0.5)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400"
            >
              Dessy 69 Menu
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-400 mt-1 text-sm sm:text-base"
            >
              Mysuru's Finest Culinary Experience
            </motion.p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-3"
          >
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-900/80 backdrop-blur-md border border-orange-500/30 rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-4 -mx-3 px-3"
          >
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex-shrink-0 snap-start px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg"
                      : "bg-gray-900/80 backdrop-blur-md text-gray-400 border border-orange-500/20"
                  }`}
                >
                  <span className="mr-1">{cat.emoji}</span>
                  {cat.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 text-red-300 px-4 py-3 rounded-lg mb-4 text-sm text-center"
            >
              {error}
            </motion.div>
          )}

          {/* Loading Spinner */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2
                className="animate-spin text-orange-500 mb-3"
                size={40}
              />
              <p className="text-gray-400 text-sm">Loading menu...</p>
            </div>
          )}

          {/* Menu Items */}
          {!loading && !error && (
            <>
              {selectedCategory === "all" ? (
                <>
                  {Object.entries(groupedItems).map(([category, items]) => {
                    const categoryInfo = categories.find(
                      (c) => c.id === category
                    );
                    return (
                      <MenuSection
                        key={category}
                        title={`${categoryInfo?.emoji || ""} ${
                          categoryInfo?.label || category
                        }`}
                        items={items}
                        cartItems={cartItems}
                        onAddToCart={addToCart}
                        onRemoveFromCart={removeFromCart}
                      />
                    );
                  })}
                </>
              ) : (
                <MenuSection
                  title=""
                  items={menuItems}
                  cartItems={cartItems}
                  onAddToCart={addToCart}
                  onRemoveFromCart={removeFromCart}
                />
              )}

              {menuItems.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <div className="text-5xl mb-3">🍽️</div>
                  <p className="text-gray-400 text-base mb-1">
                    {searchQuery ? `No dishes found` : "No items available"}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Try a different search
                  </p>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Floating Cart Button - Updated */}
      {cartItemCount > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="fixed bottom-0 left-0 w-full px-4 py-3 shadow-xl z-50"
        >
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 px-4 rounded-xl flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <ShoppingCart size={22} />
              <span className="font-semibold text-base">
                {cartItemCount} {cartItemCount === 1 ? "item" : "items"}
              </span>
            </div>

            <span className="font-bold text-lg">₹{cartTotal.toFixed(0)}</span>
          </button>
        </motion.div>
      )}

      {/* Cart Sidebar */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={handleCheckout}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems.map((item) => ({
          menuItemId: item.id,
          name: item.name,
          price: item.price.toString(),
          quantity: item.quantity,
        }))}
        onSuccess={handleOrderSuccess}
      />
    </div>
  );
}

function MenuSection({
  title,
  items,
  cartItems,
  onAddToCart,
  onRemoveFromCart,
}: {
  title: string;
  items: MenuItem[];
  cartItems: CartItem[];
  onAddToCart: (item: MenuItem) => void;
  onRemoveFromCart: (itemId: string) => void;
}) {
  if (items.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mb-6"
    >
      {title && (
        <h2 className="text-xl sm:text-2xl font-bold text-orange-400 mb-3 pb-2 border-b border-orange-500/30">
          {title}
        </h2>
      )}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => (
            <MenuItemCard
              key={item._id}
              item={item}
              index={index}
              cartItems={cartItems}
              onAddToCart={onAddToCart}
              onRemoveFromCart={onRemoveFromCart}
            />
          ))}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

function MenuItemCard({
  item,
  index,
  cartItems,
  onAddToCart,
  onRemoveFromCart,
}: {
  item: MenuItem;
  index: number;
  cartItems: CartItem[];
  onAddToCart: (item: MenuItem) => void;
  onRemoveFromCart: (itemId: string) => void;
}) {
  const cartItem = cartItems.find((ci) => ci.id === item._id);
  const quantity = cartItem?.quantity || 0;

  const handleAdd = () => {
    onAddToCart(item);
  };

  const handleIncrement = () => {
    onAddToCart(item);
  };

  const handleDecrement = () => {
    onRemoveFromCart(item._id);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.03, duration: 0.2 }}
      className="bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-md rounded-xl border border-orange-500/20 overflow-hidden"
    >
      <div className="p-4">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-bold text-white mb-1 break-words">
              {item.name}
            </h3>
            {item.available && (
              <span className="inline-block px-2 py-0.5 text-xs font-semibold bg-green-500/20 text-green-400 border border-green-500/30 rounded-full">
                Available
              </span>
            )}
          </div>
          <div className="flex-shrink-0 flex flex-col items-end gap-2">
            <div className="bg-gradient-to-br from-orange-500 to-amber-600 text-white font-bold text-base sm:text-lg px-3 py-2 rounded-lg shadow-lg">
              ₹{item.price}
            </div>
            {quantity === 0 ? (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleAdd}
                className="px-4 py-1.5 rounded-lg font-semibold text-sm flex items-center gap-1 bg-orange-500/20 text-orange-400 border border-orange-500/30 hover:bg-orange-500/30 transition-all"
              >
                <Plus size={16} />
                Add
              </motion.button>
            ) : (
              <div className="flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 rounded-lg px-2 py-1">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={handleDecrement}
                  className="w-6 h-6 flex items-center justify-center text-orange-400 hover:bg-orange-500/30 rounded transition-all font-bold"
                >
                  −
                </motion.button>
                <span className="text-white font-semibold min-w-[20px] text-center">
                  {quantity}
                </span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={handleIncrement}
                  className="w-6 h-6 flex items-center justify-center text-orange-400 hover:bg-orange-500/30 rounded transition-all font-bold"
                >
                  +
                </motion.button>
              </div>
            )}
          </div>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed mb-2">
          {item.description}
        </p>

        <span className="inline-block text-xs text-gray-500 capitalize bg-gray-800/50 px-2 py-1 rounded">
          {item.category}
        </span>
      </div>
    </motion.div>
  );
}