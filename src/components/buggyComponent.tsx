"use client";
import { useState } from "react";

export default function BuggyComponent() {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error("💥 Test error triggered!");
  }

  return (
    <div className="text-center py-10">
      <h2 className="text-2xl font-semibold mb-4">
        This is the Buggy Component
      </h2>
      <button
        className="px-4 py-2 bg-red-500 text-white rounded"
        onClick={() => setShouldThrow(true)}
      >
        Trigger Error
      </button>
    </div>
  );
}
