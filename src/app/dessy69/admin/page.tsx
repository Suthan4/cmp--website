// "use client";
// import { motion, AnimatePresence } from "framer-motion";
// import { useState } from "react";
// import { Plus, Edit2, Trash2, Save, X, Power, Search } from "lucide-react";
// import ProtectedRoutes from "@/components/protectedRoutes";

// // Types
// interface MenuItem {
//   id: string;
//   name: string;
//   description: string;
//   price: string;
//   category: string;
//   available: boolean;
// }

// export default function AdminPanel() {
//   const [menuItems, setMenuItems] = useState<MenuItem[]>([
//     {
//       id: "1",
//       name: "Spring Rolls",
//       description: "Crispy vegetable spring rolls with sweet chili sauce",
//       price: "199",
//       category: "starters",
//       available: true,
//     },
//     {
//       id: "2",
//       name: "Garlic Bread",
//       description: "Toasted bread with garlic butter and herbs",
//       price: "149",
//       category: "starters",
//       available: true,
//     },
//     {
//       id: "3",
//       name: "Grilled Chicken",
//       description: "Marinated chicken breast with seasonal vegetables",
//       price: "399",
//       category: "main",
//       available: false,
//     },
//     {
//       id: "4",
//       name: "Chocolate Cake",
//       description: "Rich chocolate cake with vanilla ice cream",
//       price: "219",
//       category: "desserts",
//       available: true,
//     },
//   ]);

//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [stockFilter, setStockFilter] = useState<
//     "all" | "instock" | "outofstock"
//   >("all");

//   const categories = [
//     { id: "all", label: "All Items", emoji: "📋" },
//     { id: "starters", label: "Starters", emoji: "🍢" },
//     { id: "main", label: "Main Course", emoji: "🍛" },
//     { id: "desserts", label: "Desserts", emoji: "🍰" },
//     { id: "beverages", label: "Beverages", emoji: "🥤" },
//   ];

//   const filteredItems = menuItems.filter((item) => {
//     const matchesCategory =
//       selectedCategory === "all" || item.category === selectedCategory;
//     const matchesSearch =
//       item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.description.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesStock =
//       stockFilter === "all" ||
//       (stockFilter === "instock" && item.available) ||
//       (stockFilter === "outofstock" && !item.available);
//     return matchesCategory && matchesSearch && matchesStock;
//   });

//   const toggleAvailability = (id: string) => {
//     setMenuItems(
//       menuItems.map((item) =>
//         item.id === id ? { ...item, available: !item.available } : item
//       )
//     );
//   };

//   const deleteItem = (id: string) => {
//     setMenuItems(menuItems.filter((item) => item.id !== id));
//   };

//   const saveItem = (item: MenuItem) => {
//     if (editingItem) {
//       setMenuItems(menuItems.map((i) => (i.id === item.id ? item : i)));
//       setEditingItem(null);
//     } else {
//       setMenuItems([...menuItems, { ...item, id: Date.now().toString() }]);
//       setIsAddModalOpen(false);
//     }
//   };

//   return (
//     <ProtectedRoutes>
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
//         {/* Content */}
//         <div className="relative z-10 p-4 md:p-8">
//           <div className="max-w-7xl mx-auto">
//             {/* Header */}
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="mb-8"
//             >
//               <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
//                 <div>
//                   <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
//                     Admin Panel
//                   </h1>
//                   <p className="text-gray-400 mt-2">
//                     Manage Dessy 69 Menu Items
//                   </p>
//                 </div>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => setIsAddModalOpen(true)}
//                   className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-lg hover:shadow-orange-500/50 transition-all"
//                 >
//                   <Plus size={20} />
//                   Add New Item
//                 </motion.button>
//               </div>

//               {/* Category Filter */}
//               <div className="flex flex-col gap-4">
//                 {/* Search Bar */}
//                 <div className="relative w-full">
//                   <Search
//                     className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                     size={20}
//                   />
//                   <input
//                     type="text"
//                     placeholder="Search menu items..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-all"
//                   />
//                   {searchQuery && (
//                     <motion.button
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                       onClick={() => setSearchQuery("")}
//                       className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
//                     >
//                       <X size={18} />
//                     </motion.button>
//                   )}
//                 </div>

//                 {/* Stock Filter Buttons */}
//                 <div className="flex gap-2 w-full">
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={() => setStockFilter("all")}
//                     className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-all ${
//                       stockFilter === "all"
//                         ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
//                         : "bg-gray-800/50 text-gray-400 hover:bg-gray-800"
//                     }`}
//                   >
//                     All Items
//                   </motion.button>
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={() => setStockFilter("instock")}
//                     className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-all ${
//                       stockFilter === "instock"
//                         ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
//                         : "bg-gray-800/50 text-gray-400 hover:bg-gray-800"
//                     }`}
//                   >
//                     ✓ In Stock
//                   </motion.button>
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={() => setStockFilter("outofstock")}
//                     className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-all ${
//                       stockFilter === "outofstock"
//                         ? "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg"
//                         : "bg-gray-800/50 text-gray-400 hover:bg-gray-800"
//                     }`}
//                   >
//                     ✗ Out of Stock
//                   </motion.button>
//                 </div>

//                 {/* Category Chips */}
//                 <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
//                   {categories.map((cat) => (
//                     <motion.button
//                       key={cat.id}
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={() => setSelectedCategory(cat.id)}
//                       className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
//                         selectedCategory === cat.id
//                           ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg"
//                           : "bg-gray-800/50 text-gray-400 hover:bg-gray-800"
//                       }`}
//                     >
//                       {cat.emoji} {cat.label}
//                     </motion.button>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>

//             {/* Menu Items Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               <AnimatePresence mode="popLayout">
//                 {filteredItems.map((item, index) => (
//                   <MenuItemCard
//                     key={item.id}
//                     item={item}
//                     index={index}
//                     onToggle={toggleAvailability}
//                     onEdit={setEditingItem}
//                     onDelete={deleteItem}
//                   />
//                 ))}
//               </AnimatePresence>
//             </div>

//             {filteredItems.length === 0 && (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="text-center py-20"
//               >
//                 <p className="text-gray-500 text-lg">
//                   {searchQuery
//                     ? `No items found matching "${searchQuery}"`
//                     : "No items in this category yet"}
//                 </p>
//               </motion.div>
//             )}
//           </div>
//         </div>

//         {/* Add/Edit Modal */}
//         <AnimatePresence>
//           {(isAddModalOpen || editingItem) && (
//             <ItemModal
//               item={editingItem}
//               onClose={() => {
//                 setIsAddModalOpen(false);
//                 setEditingItem(null);
//               }}
//               onSave={saveItem}
//             />
//           )}
//         </AnimatePresence>
//       </div>
//     </ProtectedRoutes>
//   );
// }

// function MenuItemCard({
//   item,
//   index,
//   onToggle,
//   onEdit,
//   onDelete,
// }: {
//   item: MenuItem;
//   index: number;
//   onToggle: (id: string) => void;
//   onEdit: (item: MenuItem) => void;
//   onDelete: (id: string) => void;
// }) {
//   return (
//     <motion.div
//       layout
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.9 }}
//       transition={{ delay: index * 0.05 }}
//       className={`bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md p-4 sm:p-5 rounded-xl border-2 transition-all ${
//         item.available
//           ? "border-orange-500/30 hover:border-orange-500/60"
//           : "border-gray-700/30 hover:border-gray-600/60 opacity-75"
//       }`}
//     >
//       {/* Availability Toggle */}
//       <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-3 mb-4">
//         <motion.button
//           whileTap={{ scale: 0.9 }}
//           onClick={() => onToggle(item.id)}
//           className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
//             item.available
//               ? "bg-green-500/20 text-green-400 border border-green-500/30"
//               : "bg-red-500/20 text-red-400 border border-red-500/30"
//           }`}
//         >
//           <Power size={14} />
//           {item.available ? "Available" : "Out of Stock"}
//         </motion.button>

//         <div className="flex gap-2 ml-auto xs:ml-0">
//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             onClick={() => onEdit(item)}
//             className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all"
//           >
//             <Edit2 size={16} />
//           </motion.button>
//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             onClick={() => onDelete(item.id)}
//             className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
//           >
//             <Trash2 size={16} />
//           </motion.button>
//         </div>
//       </div>

//       {/* Item Details */}
//       <h3 className="text-lg sm:text-xl font-bold text-white mb-2 break-words">
//         {item.name}
//       </h3>
//       <p className="text-gray-400 text-xs sm:text-sm mb-4 line-clamp-2">
//         {item.description}
//       </p>

//       {/* Price */}
//       <div className="flex justify-between items-center">
//         <span className="text-xs text-gray-500 uppercase tracking-wide">
//           {item.category}
//         </span>
//         <span className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
//           ₹{item.price}
//         </span>
//       </div>
//     </motion.div>
//   );
// }

// function ItemModal({
//   item,
//   onClose,
//   onSave,
// }: {
//   item: MenuItem | null;
//   onClose: () => void;
//   onSave: (item: MenuItem) => void;
// }) {
//   const [formData, setFormData] = useState<MenuItem>(
//     item || {
//       id: "",
//       name: "",
//       description: "",
//       price: "",
//       category: "starters",
//       available: true,
//     }
//   );

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSave(formData);
//     onClose();
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
//       onClick={onClose}
//     >
//       <motion.div
//         initial={{ scale: 0.9, y: 20 }}
//         animate={{ scale: 1, y: 0 }}
//         exit={{ scale: 0.9, y: 20 }}
//         onClick={(e) => e.stopPropagation()}
//         className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-5 sm:p-6 md:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto border-2 border-orange-500/30 shadow-2xl"
//       >
//         <div className="flex justify-between items-center mb-4 sm:mb-6">
//           <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
//             {item ? "Edit Item" : "Add New Item"}
//           </h2>
//           <motion.button
//             whileHover={{ scale: 1.1, rotate: 90 }}
//             whileTap={{ scale: 0.9 }}
//             onClick={onClose}
//             className="text-gray-400 hover:text-white transition-colors"
//           >
//             <X size={24} />
//           </motion.button>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">
//               Item Name
//             </label>
//             <input
//               type="text"
//               required
//               value={formData.name}
//               onChange={(e) =>
//                 setFormData({ ...formData, name: e.target.value })
//               }
//               className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:border-orange-500 focus:outline-none transition-all"
//               placeholder="e.g., Spring Rolls"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">
//               Description
//             </label>
//             <textarea
//               required
//               value={formData.description}
//               onChange={(e) =>
//                 setFormData({ ...formData, description: e.target.value })
//               }
//               rows={3}
//               className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:border-orange-500 focus:outline-none transition-all resize-none"
//               placeholder="Describe the dish..."
//             />
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-2">
//                 Price (₹)
//               </label>
//               <input
//                 type="number"
//                 required
//                 value={formData.price}
//                 onChange={(e) =>
//                   setFormData({ ...formData, price: e.target.value })
//                 }
//                 className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:border-orange-500 focus:outline-none transition-all"
//                 placeholder="199"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-2">
//                 Category
//               </label>
//               <select
//                 value={formData.category}
//                 onChange={(e) =>
//                   setFormData({ ...formData, category: e.target.value })
//                 }
//                 className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:border-orange-500 focus:outline-none transition-all"
//               >
//                 <option value="starters">Starters</option>
//                 <option value="main">Main Course</option>
//                 <option value="desserts">Desserts</option>
//                 <option value="beverages">Beverages</option>
//               </select>
//             </div>
//           </div>

//           <div className="flex items-center gap-3">
//             <input
//               type="checkbox"
//               id="available"
//               checked={formData.available}
//               onChange={(e) =>
//                 setFormData({ ...formData, available: e.target.checked })
//               }
//               className="w-5 h-5 rounded accent-orange-500"
//             />
//             <label htmlFor="available" className="text-gray-300">
//               Available for order
//             </label>
//           </div>

//           <div className="flex gap-2 sm:gap-3 pt-4">
//             <motion.button
//               type="button"
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={onClose}
//               className="flex-1 bg-gray-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all text-sm sm:text-base"
//             >
//               Cancel
//             </motion.button>
//             <motion.button
//               type="submit"
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-orange-500/50 transition-all text-sm sm:text-base"
//             >
//               <Save size={18} />
//               Save
//             </motion.button>
//           </div>
//         </form>
//       </motion.div>
//     </motion.div>
//   );
// }
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Power,
  Search,
  Loader2,
} from "lucide-react";
import ProtectedRoutes from "@/components/protectedRoutes";
import { menuAPI, MenuItem } from "@/lib/api";

export default function AdminPanel() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [stockFilter, setStockFilter] = useState<
    "all" | "instock" | "outofstock"
  >("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    { id: "all", label: "All Items", emoji: "📋" },

    { id: "fruit-shakes", label: "Fruit Shakes", emoji: "🍓" },

    { id: "fruit-icecreams", label: "Fruit Ice-Creams", emoji: "🍨" },

    { id: "fresh-fruit-juice", label: "Fresh Fruit Juice", emoji: "🧃" },

    { id: "quick-bites", label: "Quick Bites", emoji: "🍟" },

    { id: "maggie", label: "Maggie", emoji: "🍜" },
  ];

  // Fetch menu items
  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await menuAPI.getAll({
        category: selectedCategory !== "all" ? selectedCategory : undefined,
        available: stockFilter !== "all" ? stockFilter : undefined,
        search: searchQuery || undefined,
      });
      setMenuItems(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to fetch menu items");
      console.error("Error fetching menu items:", err);
    } finally {
      setLoading(false);
    }
  };

  // Load menu items on mount and when filters change
  useEffect(() => {
    fetchMenuItems();
  }, [selectedCategory, stockFilter, searchQuery]);

  // Toggle availability
  const toggleAvailability = async (id: string) => {
    try {
      const response = await menuAPI.toggleAvailability(id);
      setMenuItems(
        menuItems.map((item) => (item._id === id ? response.data : item))
      );
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to toggle availability");
    }
  };

  // Delete item
  const deleteItem = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      await menuAPI.delete(id);
      setMenuItems(menuItems.filter((item) => item._id !== id));
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to delete item");
    }
  };

  // Save item (create or update)
  const saveItem = async (item: MenuItem) => {
    try {
      if (editingItem) {
        // Update existing item
        const response = await menuAPI.update(item._id, {
          name: item.name,
          description: item.description,
          price: item.price,
          category: item.category,
          available: item.available,
        });
        setMenuItems(
          menuItems.map((i) => (i._id === item._id ? response.data : i))
        );
        setEditingItem(null);
      } else {
        // Create new item
        const response = await menuAPI.create({
          name: item.name,
          description: item.description,
          price: item.price,
          category: item.category,
          available: item.available,
        });
        setMenuItems([response.data, ...menuItems]);
        setIsAddModalOpen(false);
      }
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to save item");
    }
  };

  return (
    <ProtectedRoutes>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
        <div className="relative z-10 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
                    Admin Panel
                  </h1>
                  <p className="text-gray-400 mt-2">
                    Manage Dessy 69 Menu Items
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsAddModalOpen(true)}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-lg hover:shadow-orange-500/50 transition-all"
                >
                  <Plus size={20} />
                  Add New Item
                </motion.button>
              </div>

              {/* Filters */}
              <div className="flex flex-col gap-4">
                {/* Search Bar */}
                <div className="relative w-full">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search menu items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-all"
                  />
                  {searchQuery && (
                    <motion.button
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      <X size={18} />
                    </motion.button>
                  )}
                </div>

                {/* Stock Filter Buttons */}
                <div className="flex gap-2 w-full">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStockFilter("all")}
                    className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-all ${
                      stockFilter === "all"
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                        : "bg-gray-800/50 text-gray-400 hover:bg-gray-800"
                    }`}
                  >
                    All Items
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStockFilter("instock")}
                    className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-all ${
                      stockFilter === "instock"
                        ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                        : "bg-gray-800/50 text-gray-400 hover:bg-gray-800"
                    }`}
                  >
                    ✓ In Stock
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStockFilter("outofstock")}
                    className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-all ${
                      stockFilter === "outofstock"
                        ? "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg"
                        : "bg-gray-800/50 text-gray-400 hover:bg-gray-800"
                    }`}
                  >
                    ✗ Out of Stock
                  </motion.button>
                </div>

                {/* Category Chips */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {categories.map((cat) => (
                    <motion.button
                      key={cat.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                        selectedCategory === cat.id
                          ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg"
                          : "bg-gray-800/50 text-gray-400 hover:bg-gray-800"
                      }`}
                    >
                      {cat.emoji} {cat.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            {/* Loading Spinner */}
            {loading && (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="animate-spin text-orange-500" size={48} />
              </div>
            )}

            {/* Menu Items Grid */}
            {!loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence mode="popLayout">
                  {menuItems.map((item, index) => (
                    <MenuItemCard
                      key={item._id}
                      item={item}
                      index={index}
                      onToggle={toggleAvailability}
                      onEdit={setEditingItem}
                      onDelete={deleteItem}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}

            {!loading && menuItems.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-gray-500 text-lg">
                  {searchQuery
                    ? `No items found matching "${searchQuery}"`
                    : "No items in this category yet"}
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Add/Edit Modal */}
        <AnimatePresence>
          {(isAddModalOpen || editingItem) && (
            <ItemModal
              item={editingItem}
              onClose={() => {
                setIsAddModalOpen(false);
                setEditingItem(null);
              }}
              onSave={saveItem}
            />
          )}
        </AnimatePresence>
      </div>
    </ProtectedRoutes>
  );
}

function MenuItemCard({
  item,
  index,
  onToggle,
  onEdit,
  onDelete,
}: {
  item: MenuItem;
  index: number;
  onToggle: (id: string) => void;
  onEdit: (item: MenuItem) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.05 }}
      className={`bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md p-4 sm:p-5 rounded-xl border-2 transition-all ${
        item.available
          ? "border-orange-500/30 hover:border-orange-500/60"
          : "border-gray-700/30 hover:border-gray-600/60 opacity-75"
      }`}
    >
      <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-3 mb-4">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onToggle(item._id)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
            item.available
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : "bg-red-500/20 text-red-400 border border-red-500/30"
          }`}
        >
          <Power size={14} />
          {item.available ? "Available" : "Out of Stock"}
        </motion.button>

        <div className="flex gap-2 ml-auto xs:ml-0">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onEdit(item)}
            className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all"
          >
            <Edit2 size={16} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(item._id)}
            className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
          >
            <Trash2 size={16} />
          </motion.button>
        </div>
      </div>

      <h3 className="text-lg sm:text-xl font-bold text-white mb-2 break-words">
        {item.name}
      </h3>
      <p className="text-gray-400 text-xs sm:text-sm mb-4 line-clamp-2">
        {item.description}
      </p>

      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500 uppercase tracking-wide">
          {item.category}
        </span>
        <span className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
          ₹{item.price}
        </span>
      </div>
    </motion.div>
  );
}

function ItemModal({
  item,
  onClose,
  onSave,
}: {
  item: MenuItem | null;
  onClose: () => void;
  onSave: (item: MenuItem) => void;
}) {
  const [formData, setFormData] = useState<MenuItem>(
    item || {
      _id: "",
      name: "",
      description: "",
      price: "",
      category: "starters",
      available: true,
    }
  );
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error("Error saving item:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-5 sm:p-6 md:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto border-2 border-orange-500/30 shadow-2xl"
      >
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
            {item ? "Edit Item" : "Add New Item"}
          </h2>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </motion.button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Item Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:border-orange-500 focus:outline-none transition-all"
              placeholder="e.g., Spring Rolls"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:border-orange-500 focus:outline-none transition-all resize-none"
              placeholder="Describe the dish..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Price (₹)
              </label>
              <input
                type="text"
                required
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:border-orange-500 focus:outline-none transition-all"
                placeholder="199"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:border-orange-500 focus:outline-none transition-all"
              >
                <option value="fruit-shakes">🍓 Fruit Shakes</option>
                <option value="fruit-icecreams">🍨 Fruit Ice-Creams</option>
                <option value="fresh-fruit-juice">🧃 Fresh Fruit Juice</option>
                <option value="quick-bites">🍟 Quick Bites</option>
                <option value="maggie">🍜 Maggie</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="available"
              checked={formData.available}
              onChange={(e) =>
                setFormData({ ...formData, available: e.target.checked })
              }
              className="w-5 h-5 rounded accent-orange-500"
            />
            <label htmlFor="available" className="text-gray-300">
              Available for order
            </label>
          </div>

          <div className="flex gap-2 sm:gap-3 pt-4">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              disabled={saving}
              className="flex-1 bg-gray-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all text-sm sm:text-base disabled:opacity-50"
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={saving}
              className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-orange-500/50 transition-all text-sm sm:text-base disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save
                </>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
