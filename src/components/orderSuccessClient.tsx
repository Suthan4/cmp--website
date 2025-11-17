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

//   const downloadReceipt = () => {
//     if (!order) return;

//     const receiptContent = `
// DESSY 69 - ORDER RECEIPT
// ========================

// Order ID: ${order.orderId}
// Customer: ${order.customerName}
// Phone: ${order.customerPhone}
// Date: ${new Date(order.createdAt).toLocaleString()}

// ITEMS:
// ${order.items
//   .map(
//     (item) =>
//       `${item.name} x${item.quantity} - ₹${
//         parseFloat(item.price) * item.quantity
//       }`
//   )
//   .join("\n")}

// Subtotal: ₹${order.subtotal}
// ${order.discount > 0 ? `Discount: -₹${order.discount}\n` : ""}Total: ₹${
//       order.total
//     }

// Status: ${order.status.toUpperCase()}
// Payment: ${order.paymentStatus.toUpperCase()}

// Thank you for ordering!
//     `;

//     const blob = new Blob([receiptContent], { type: "text/plain" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = `receipt-${order.orderId}.txt`;
//     link.click();
//   };
const downloadReceipt = async () => {
  if (!order) return;

  try {
    // Dynamically import jsPDF
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();

    // Set colors
    const orange: [number, number, number] = [249, 115, 22];
    const gray: [number, number, number] = [107, 114, 128];
    const black: [number, number, number] = [0, 0, 0];

    // Header
    doc.setFontSize(24);
    doc.setTextColor(...orange);
    doc.text("DESSY 69", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.setTextColor(...gray);
    doc.text("ORDER RECEIPT", 105, 28, { align: "center" });

    doc.setDrawColor(...orange);
    doc.setLineWidth(0.5);
    doc.line(20, 32, 190, 32);

    // Order details
    let yPos = 45;
    doc.setFontSize(10);
    doc.setTextColor(...gray);
    doc.text("Order ID", 20, yPos);
    doc.setFontSize(14);
    doc.setTextColor(...black);
    doc.setFont("helvetica", "bold");
    doc.text(order.orderId, 20, yPos + 6);
    doc.setFont("helvetica", "normal");

    yPos += 20;
    doc.setFontSize(10);
    doc.setTextColor(...gray);
    doc.text("Customer", 20, yPos);
    doc.setFontSize(11);
    doc.setTextColor(...black);
    doc.text(order.customerName, 20, yPos + 6);
    doc.setTextColor(...gray);
    doc.text(order.customerPhone, 20, yPos + 12);

    yPos += 22;
    doc.setFontSize(10);
    doc.setTextColor(...gray);
    doc.text("Date", 20, yPos);
    doc.setTextColor(...black);
    doc.text(new Date(order.createdAt).toLocaleString(), 20, yPos + 6);

    // Items
    yPos += 20;
    doc.setFontSize(10);
    doc.setTextColor(...gray);
    doc.text("ITEMS", 20, yPos);
    yPos += 5;

    order.items.forEach((item) => {
      yPos += 7;
      doc.setTextColor(...black);
      doc.setFontSize(10);
      doc.text(`${item.name} x${item.quantity}`, 20, yPos);
      doc.text(`₹${parseFloat(item.price) * item.quantity}`, 190, yPos, {
        align: "right",
      });
      doc.setDrawColor(238, 238, 238);
      doc.setLineWidth(0.1);
      doc.line(20, yPos + 2, 190, yPos + 2);
    });

    // Totals
    yPos += 12;
    doc.setDrawColor(...black);
    doc.setLineWidth(0.5);
    doc.line(20, yPos, 190, yPos);
    yPos += 8;

    doc.setFontSize(10);
    doc.setTextColor(...black);
    doc.text("Subtotal", 20, yPos);
    doc.text(`₹${order.subtotal}`, 190, yPos, { align: "right" });

    if (order.discount > 0) {
      yPos += 7;
      doc.text("Discount", 20, yPos);
      doc.text(`-₹${order.discount}`, 190, yPos, { align: "right" });
    }

    yPos += 12;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...orange);
    doc.text("TOTAL PAID", 20, yPos);
    doc.text(`₹${order.total}`, 190, yPos, { align: "right" });
    doc.setFont("helvetica", "normal");

    // Status
    yPos += 15;
    doc.setFontSize(10);
    doc.setTextColor(...gray);
    doc.text("Status", 20, yPos);
    doc.setTextColor(...black);
    doc.text(order.status.toUpperCase(), 60, yPos);

    doc.setTextColor(...gray);
    doc.text("Payment", 120, yPos);
    doc.setTextColor(...black);
    doc.text(order.paymentStatus.toUpperCase(), 160, yPos);

    // Tracking section
    yPos += 15;
    doc.setFillColor(254, 243, 199);
    doc.roundedRect(20, yPos, 170, 20, 3, 3, "F");

    yPos += 7;
    doc.setFontSize(9);
    doc.setTextColor(...gray);
    doc.text("Track your order live:", 105, yPos, { align: "center" });

    yPos += 7;
    doc.setFontSize(10);
    doc.setTextColor(...orange);
    doc.textWithLink(
      `https://smyd.in/dessy69/track?orderId=${order.orderId}`,
      105,
      yPos,
      {
        align: "center",
        url: `https://smyd.in/dessy69/track?orderId=${order.orderId}`,
      }
    );

    // Footer
    yPos += 15;
    doc.setFontSize(10);
    doc.setTextColor(...gray);
    doc.text("Thank you for ordering from DESSY 69!", 105, yPos, {
      align: "center",
    });

    yPos += 7;
    doc.setFontSize(9);
    doc.text("Contact us: +91 88385 62459", 105, yPos, {
      align: "center",
    });

    // Save PDF
    doc.save(`receipt-${order.orderId}.pdf`);
  } catch (error) {
    console.error("Failed to generate PDF:", error);
    alert("Failed to download receipt. Please try again.");
  }
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
