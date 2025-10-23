"use client";
import React, { ReactNode, useRef } from "react";
import NavBar from "./navBar";
import Footer from "./footer";
import { ErrorBoundary } from "./errorBoundary";

export default function AppScafold({ children }: { children: ReactNode }) {
  const footerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <NavBar footerRef={footerRef} />
      <main className="min-h-screen w-fit mx-auto px-4">{children}</main>
      <Footer footerRef={footerRef} />
    </>
  );
}
