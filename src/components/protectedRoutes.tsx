"use client";

import { useState, useEffect, ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  password?: string;
}

export default function ProtectedRoute({
  children,
  password = "dessy69-2025",
}: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authStatus = sessionStorage.getItem("adminAuth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Use environment variable or prop password
    const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password;

    if (inputPassword === correctPassword) {
      sessionStorage.setItem("adminAuth", "true");
      setIsAuthenticated(true);
    } else {
      setError("Incorrect password. Please try again.");
      setInputPassword("");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">
            Protected Access
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Enter Password
              </label>
              <input
                type="password"
                id="password"
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
                required
                autoFocus
              />
            </div>
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 px-4 text-base font-medium rounded-md hover:bg-blue-600 active:bg-blue-700 transition-colors touch-manipulation"
            >
              Access
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
