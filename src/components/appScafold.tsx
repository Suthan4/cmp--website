"use client";
import React, { ReactNode, useRef } from "react";
import NavBar from "./navBar";
import Footer from "./footer";
import { usePathname } from "next/navigation";

export default function AppScafold({ children }: { children: ReactNode }) {
  const footerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Routes that should not have NavBar and Footer
  const excludedRoutes = ["/dessy69/menu"];
  const shouldExcludeLayout = excludedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  // If it's an excluded route, just return children without wrapper
  if (shouldExcludeLayout) {
    return <>{children}</>;
  }
  return (
    <>
      <NavBar footerRef={footerRef} />
      <main className="min-h-screen w-fit mx-auto px-4">{children}</main>
      <Footer footerRef={footerRef} />
    </>
  );
}
