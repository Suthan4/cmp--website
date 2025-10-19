"use client";
import React, { ReactNode, useRef } from "react";
import NavBar from "./navBar";
import Footer from "./footer";

export default function AppScafold({ children }: { children: ReactNode }) {
  const footerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <NavBar footerRef={footerRef} />
      <main className="min-h-screen mx-auto px-4 w-full">{children}</main>
      <Footer footerRef={footerRef} />
    </>
  );
}
