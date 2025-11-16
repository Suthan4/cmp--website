import OrderSuccessClient from "@/components/orderSuccessClient";
import { Loader2 } from "lucide-react";
import React, { Suspense } from "react";

export default function OrderSuccess() {
  return (
    <Suspense
      fallback={<Loader2 className="animate-spin text-orange-500" size={48} />}
    >
      <OrderSuccessClient />
    </Suspense>
  );
}
