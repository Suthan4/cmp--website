// ==================== app/admin/coupons/page.tsx ====================
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
  Tag,
  Loader2,
  Percent,
  IndianRupee,
} from "lucide-react";
import ProtectedRoutes from "@/components/protectedRoutes";
import { couponAPI, Coupon } from "@/lib/coupon";

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const response = await couponAPI.getAll();
      setCoupons(response.data);
    } catch (error) {
      console.error("Failed to fetch coupons:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this coupon?")) return;

    try {
      await couponAPI.delete(id);
      setCoupons(coupons.filter((c) => c._id !== id));
    } catch (error: any) {
      alert(error.response?.data?.error || "Failed to delete coupon");
    }
  };

  const handleToggle = async (id: string) => {
    try {
      const response = await couponAPI.toggle(id);
      setCoupons(coupons.map((c) => (c._id === id ? response.data : c)));
    } catch (error: any) {
      alert(error.response?.data?.error || "Failed to toggle coupon");
    }
  };

  const handleSave = async (couponData: any) => {
    try {
      if (editingCoupon) {
        const response = await couponAPI.update(editingCoupon._id, couponData);
        setCoupons(
          coupons.map((c) => (c._id === editingCoupon._id ? response.data : c))
        );
      } else {
        const response = await couponAPI.create(couponData);
        setCoupons([response.data, ...coupons]);
      }
      setIsModalOpen(false);
      setEditingCoupon(null);
    } catch (error: any) {
      alert(error.response?.data?.error || "Failed to save coupon");
    }
  };

  return (
    <ProtectedRoutes>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400 mb-2">
                  Coupon Management
                </h1>
                <p className="text-gray-400">
                  Create and manage discount coupons
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setEditingCoupon(null);
                  setIsModalOpen(true);
                }}
                className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-lg hover:shadow-orange-500/50 transition-all"
              >
                <Plus size={20} />
                Create Coupon
              </motion.button>
            </div>
          </motion.div>

          {/* Loading */}
          {loading && (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-orange-500" size={48} />
            </div>
          )}

          {/* Coupons Grid */}
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence mode="popLayout">
                {coupons.map((coupon, index) => (
                  <CouponCard
                    key={coupon._id}
                    coupon={coupon}
                    index={index}
                    onEdit={() => {
                      setEditingCoupon(coupon);
                      setIsModalOpen(true);
                    }}
                    onDelete={() => handleDelete(coupon._id)}
                    onToggle={() => handleToggle(coupon._id)}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}

          {!loading && coupons.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Tag size={64} className="mx-auto text-gray-600 mb-4" />
              <p className="text-gray-400 text-lg">No coupons created yet</p>
              <p className="text-gray-500 text-sm">
                Create your first coupon to get started
              </p>
            </motion.div>
          )}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <CouponModal
              coupon={editingCoupon}
              onClose={() => {
                setIsModalOpen(false);
                setEditingCoupon(null);
              }}
              onSave={handleSave}
            />
          )}
        </AnimatePresence>
      </div>
    </ProtectedRoutes>
  );
}

function CouponCard({
  coupon,
  index,
  onEdit,
  onDelete,
  onToggle,
}: {
  coupon: Coupon;
  index: number;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
}) {
  const isExpired =
    coupon.validUntil && new Date(coupon.validUntil) < new Date();
  const usageLimitReached =
    coupon.usageLimit && coupon.usageCount >= coupon.usageLimit;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.05 }}
      className={`bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md p-5 rounded-xl border-2 transition-all ${
        coupon.isActive && !isExpired && !usageLimitReached
          ? "border-orange-500/30"
          : "border-gray-700/30 opacity-75"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onToggle}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              coupon.isActive
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : "bg-red-500/20 text-red-400 border border-red-500/30"
            }`}
          >
            <Power size={14} />
            {coupon.isActive ? "Active" : "Inactive"}
          </motion.button>
          {isExpired && (
            <span className="px-2 py-1 text-xs bg-red-500/20 text-red-400 rounded-full">
              Expired
            </span>
          )}
          {usageLimitReached && (
            <span className="px-2 py-1 text-xs bg-yellow-500/20 text-yellow-400 rounded-full">
              Limit Reached
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onEdit}
            className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30"
          >
            <Edit2 size={16} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onDelete}
            className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30"
          >
            <Trash2 size={16} />
          </motion.button>
        </div>
      </div>

      {/* Code */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Tag className="text-orange-400" size={20} />
          <h3 className="text-2xl font-bold font-mono text-white">
            {coupon.code}
          </h3>
        </div>
      </div>

      {/* Discount Info */}
      <div className="bg-gray-900/50 rounded-lg p-3 mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400 text-sm">Discount</span>
          <div className="flex items-center gap-1">
            {coupon.discountType === "percentage" ? (
              <>
                <Percent size={16} className="text-orange-400" />
                <span className="text-xl font-bold text-orange-400">
                  {coupon.discount}%
                </span>
              </>
            ) : (
              <>
                <IndianRupee size={16} className="text-orange-400" />
                <span className="text-xl font-bold text-orange-400">
                  {coupon.discount}
                </span>
              </>
            )}
          </div>
        </div>

        {coupon.minOrderAmount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Min. Order</span>
            <span className="text-gray-300">₹{coupon.minOrderAmount}</span>
          </div>
        )}

        {coupon.maxDiscount && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Max. Discount</span>
            <span className="text-gray-300">₹{coupon.maxDiscount}</span>
          </div>
        )}
      </div>

      {/* Usage Stats */}
      {coupon.usageLimit && (
        <div className="mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">Usage</span>
            <span className="text-gray-300">
              {coupon.usageCount} / {coupon.usageLimit}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-orange-500 h-2 rounded-full transition-all"
              style={{
                width: `${Math.min(
                  (coupon.usageCount / coupon.usageLimit) * 100,
                  100
                )}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Valid Until */}
      {coupon.validUntil && (
        <div className="text-sm text-gray-400">
          Valid until: {new Date(coupon.validUntil).toLocaleDateString()}
        </div>
      )}
    </motion.div>
  );
}

function CouponModal({
  coupon,
  onClose,
  onSave,
}: {
  coupon: Coupon | null;
  onClose: () => void;
  onSave: (data: any) => void;
}) {
  const [formData, setFormData] = useState({
    code: coupon?.code || "",
    discount: coupon?.discount || 0,
    discountType:
      coupon?.discountType || ("percentage" as "percentage" | "fixed"),
    minOrderAmount: coupon?.minOrderAmount || 0,
    maxDiscount: coupon?.maxDiscount || undefined,
    isActive: coupon?.isActive ?? true,
    validUntil: coupon?.validUntil
      ? new Date(coupon.validUntil).toISOString().split("T")[0]
      : "",
    usageLimit: coupon?.usageLimit || undefined,
  });

  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(formData);
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto border-2 border-orange-500/30"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
            {coupon ? "Edit Coupon" : "Create Coupon"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Coupon Code
            </label>
            <input
              type="text"
              required
              pattern="[A-Z0-9]+"
              value={formData.code}
              onChange={(e) =>
                setFormData({ ...formData, code: e.target.value.toUpperCase() })
              }
              className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white font-mono focus:border-orange-500 focus:outline-none"
              placeholder="e.g., WELCOME10"
            />
            <p className="text-xs text-gray-500 mt-1">
              Uppercase letters and numbers only
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Discount Type
              </label>
              <select
                value={formData.discountType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    discountType: e.target.value as any,
                  })
                }
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-orange-500 focus:outline-none"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed (₹)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Discount Value
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.discount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    discount: parseFloat(e.target.value),
                  })
                }
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-orange-500 focus:outline-none"
                placeholder={
                  formData.discountType === "percentage" ? "10" : "50"
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Min. Order Amount (₹)
              </label>
              <input
                type="number"
                min="0"
                value={formData.minOrderAmount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    minOrderAmount: parseFloat(e.target.value),
                  })
                }
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-orange-500 focus:outline-none"
                placeholder="0"
              />
            </div>

            {formData.discountType === "percentage" && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Max. Discount (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.maxDiscount || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      maxDiscount: e.target.value
                        ? parseFloat(e.target.value)
                        : undefined,
                    })
                  }
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-orange-500 focus:outline-none"
                  placeholder="Optional"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Usage Limit
              </label>
              <input
                type="number"
                min="1"
                value={formData.usageLimit || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    usageLimit: e.target.value
                      ? parseInt(e.target.value)
                      : undefined,
                  })
                }
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-orange-500 focus:outline-none"
                placeholder="Unlimited"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Valid Until
              </label>
              <input
                type="date"
                value={formData.validUntil}
                onChange={(e) =>
                  setFormData({ ...formData, validUntil: e.target.value })
                }
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-orange-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) =>
                setFormData({ ...formData, isActive: e.target.checked })
              }
              className="w-5 h-5 rounded accent-orange-500"
            />
            <label htmlFor="isActive" className="text-gray-300">
              Active
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
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
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
