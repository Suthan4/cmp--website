import OrderTrack from "@/components/orderTrack";
import { Loader2 } from "lucide-react";
import React, { Suspense } from "react";

export default function TrackOrder() {
  return (
    <>
      <Suspense
        fallback={
          <Loader2 className="animate-spin text-orange-500" size={48} />
        }
      >
        <OrderTrack />
      </Suspense>
    </>
  );
}
