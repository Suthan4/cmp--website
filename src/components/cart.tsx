"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingCart } from "lucide-react";
import { useState } from "react";

interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export default function Cart({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartProps) {
  const subtotal = items.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-gradient-to-b from-gray-900 to-black border-l border-orange-500/30 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-orange-500/30">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-orange-400 flex items-center gap-2">
                  <ShoppingCart size={24} />
                  Your Cart
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="text-center py-20">
                  <ShoppingCart
                    size={64}
                    className="mx-auto text-gray-600 mb-4"
                  />
                  <p className="text-gray-400">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="bg-gray-800/50 rounded-lg p-3 border border-orange-500/20"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-white">
                          {item.name}
                        </h3>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 bg-gray-900/50 rounded-lg p-1">
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            className="w-7 h-7 flex items-center justify-center rounded bg-orange-500/20 text-orange-400 disabled:opacity-50"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-white font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-7 h-7 flex items-center justify-center rounded bg-orange-500/20 text-orange-400"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="text-orange-400 font-bold">
                          ₹{(parseFloat(item.price) * item.quantity).toFixed(0)}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-4 border-t border-orange-500/30 bg-gray-900/50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-2xl font-bold text-orange-400">
                    ₹{subtotal.toFixed(0)}
                  </span>
                </div>
                <button
                  onClick={onCheckout}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all"
                >
                  Grab It Now! 🔥
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
