"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, Tag, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { orderAPI, OrderItem } from "@/lib/orderApi";
import { couponAPI, Coupon } from "@/lib/coupon";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: OrderItem[];
  onSuccess: (orderId: string) => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  items,
  onSuccess,
}: CheckoutModalProps) {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [verifyingCoupon, setVerifyingCoupon] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  // Coupon dropdown
  const [availableCoupons, setAvailableCoupons] = useState<Coupon[]>([]);
  const [showCouponDropdown, setShowCouponDropdown] = useState(false);
  const [loadingCoupons, setLoadingCoupons] = useState(false);

  const subtotal = items.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );
  const total = subtotal - discount;

  // Fetch available coupons
  useEffect(() => {
    if (isOpen) {
      fetchCoupons();
    }
  }, [isOpen]);

  const fetchCoupons = async () => {
    try {
      setLoadingCoupons(true);
      const response = await couponAPI.getAllActive();
      setAvailableCoupons(response.data);
    } catch (error) {
      console.error("Failed to fetch coupons:", error);
    } finally {
      setLoadingCoupons(false);
    }
  };

  const verifyCoupon = async () => {
    if (!couponCode.trim()) return;

    try {
      setVerifyingCoupon(true);
      setCouponError("");
      const response = await orderAPI.verifyCoupon(couponCode, subtotal);
      setDiscount(response.data.discount);
      setCouponApplied(true);
      setShowCouponDropdown(false);
    } catch (error: any) {
      setCouponError(error.response?.data?.error || "Invalid coupon");
      setDiscount(0);
      setCouponApplied(false);
    } finally {
      setVerifyingCoupon(false);
    }
  };

  const selectCoupon = (coupon: Coupon) => {
    setCouponCode(coupon.code);
    setShowCouponDropdown(false);
    setCouponApplied(false);
    setCouponError("");
    setDiscount(0);
  };

  const removeCoupon = () => {
    setCouponCode("");
    setCouponApplied(false);
    setCouponError("");
    setDiscount(0);
  };

  const getCouponDescription = (coupon: Coupon) => {
    let desc = "";
    if (coupon.discountType === "percentage") {
      desc = `${coupon.discount}% off`;
      if (coupon.maxDiscount) {
        desc += ` (max ₹${coupon.maxDiscount})`;
      }
    } else {
      desc = `₹${coupon.discount} off`;
    }
    if (coupon.minOrderAmount > 0) {
      desc += ` on orders above ₹${coupon.minOrderAmount}`;
    }
    return desc;
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const orderResponse = await orderAPI.createOrder({
        customerName,
        customerPhone,
        items,
        couponCode: couponApplied ? couponCode : undefined,
      });

      const { razorpayOrderId, amount, currency, keyId, orderId } =
        orderResponse.data;

      const options = {
        key: keyId,
        amount: amount * 100,
        currency,
        name: "Dessy 69",
        description: "Order Payment",
        order_id: razorpayOrderId,
        handler: async function (response: any) {
          try {
            await orderAPI.verifyPayment({
              orderId,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });

            window.location.href = `/dessy69/order-success?orderId=${orderId}`;
          } catch (error) {
            alert("Payment verification failed. Please contact support.");
            console.error("Payment verification error:", error);
          }
        },
        prefill: {
          name: customerName,
          contact: customerPhone,
        },
        theme: {
          color: "#f97316",
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response: any) {
        alert("Payment failed. Please try again.");
        setLoading(false);
      });

      rzp.open();
    } catch (error: any) {
      alert(error.response?.data?.error || "Failed to process order");
      setLoading(false);
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => console.log("Razorpay script loaded");
    script.onerror = () => console.error("Failed to load Razorpay script");
  }, []);

  if (!isOpen) return null;

  return (
    <>
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
          className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto border-2 border-orange-500/30"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-orange-400">Checkout</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleCheckout} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                required
                minLength={2}
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-orange-500 focus:outline-none"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Phone
              </label>
              <input
                type="tel"
                required
                pattern="[6-9][0-9]{9}"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-orange-500 focus:outline-none"
                placeholder="10-digit mobile number"
              />
            </div>

            {/* Enhanced Coupon Section */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Coupon Code (Optional)
              </label>

              <div className="flex gap-2 mb-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value.toUpperCase());
                      setCouponApplied(false);
                      setCouponError("");
                      setDiscount(0);
                    }}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 pr-10 text-white focus:border-orange-500 focus:outline-none"
                    placeholder="Enter code"
                    disabled={couponApplied}
                  />
                  {couponApplied && (
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  onClick={verifyCoupon}
                  disabled={verifyingCoupon || couponApplied || !couponCode}
                  className="px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 flex items-center gap-2"
                >
                  {verifyingCoupon ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <Tag size={16} />
                  )}
                  {couponApplied ? "Applied" : "Apply"}
                </button>
              </div>

              {/* Available Coupons Dropdown */}
              {availableCoupons.length > 0 && !couponApplied && (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowCouponDropdown(!showCouponDropdown)}
                    className="w-full text-left bg-gray-800/30 border border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-400 hover:text-white hover:border-orange-500/30 transition-all flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <Tag size={14} />
                      {loadingCoupons
                        ? "Loading coupons..."
                        : `${availableCoupons.length} coupon(s) available`}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        showCouponDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {showCouponDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-10 w-full mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl max-h-60 overflow-y-auto"
                      >
                        {availableCoupons.map((coupon) => (
                          <button
                            key={coupon._id}
                            type="button"
                            onClick={() => selectCoupon(coupon)}
                            className="w-full text-left px-4 py-3 hover:bg-gray-700 transition-all border-b border-gray-700 last:border-b-0"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-mono font-bold text-orange-400 text-sm">
                                    {coupon.code}
                                  </span>
                                  <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full">
                                    {coupon.discountType === "percentage"
                                      ? `${coupon.discount}%`
                                      : `₹${coupon.discount}`}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-400">
                                  {getCouponDescription(coupon)}
                                </p>
                                {coupon.validUntil && (
                                  <p className="text-xs text-gray-500 mt-1">
                                    Valid until{" "}
                                    {new Date(
                                      coupon.validUntil
                                    ).toLocaleDateString()}
                                  </p>
                                )}
                              </div>
                            </div>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {couponError && (
                <p className="text-red-400 text-sm mt-1">{couponError}</p>
              )}
              {couponApplied && (
                <p className="text-green-400 text-sm mt-1 flex items-center gap-1">
                  ✓ Coupon applied! You saved ₹{discount}
                </p>
              )}
            </div>

            <div className="bg-gray-800/30 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(0)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-400">
                  <span>Discount</span>
                  <span>-₹{discount.toFixed(0)}</span>
                </div>
              )}
              <div className="flex justify-between text-xl font-bold text-orange-400 pt-2 border-t border-gray-700">
                <span>Total</span>
                <span>₹{total.toFixed(0)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Processing...
                </>
              ) : (
                <>Pay ₹{total.toFixed(0)}</>
              )}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </>
  );
}
