"use client";

export default function ErrorFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-2">
        Something went wrong.
      </h1>
      <button
        onClick={() => location.reload()}
        className="mt-4 px-4 py-2 bg-black text-white rounded"
      >
        Refresh
      </button>
    </div>
  );
}
