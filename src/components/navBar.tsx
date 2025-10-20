"use client";
import { ArrowRight, Layers, Menu, X } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
} from "motion/react";
import React, { RefObject, useEffect, useRef, useState } from "react";
import Image from "next/image";


const NavBar = ({
  footerRef,
}: {
  footerRef: RefObject<HTMLDivElement | null>;
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const controls = useAnimation();


  const isFooterInView = useInView(footerRef, { margin: "0px 0px -70px 0px" });
  const scrollToSection = (id: string): void => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    if (isFooterInView) {
      controls.start({ y: 200, opacity: 0, transition: { duration: 0.4 } });
    } else {
      controls.start({ y: 0, opacity: 1, transition: { duration: 0.4 } });
    }
  }, [isFooterInView, controls]);

  return (
    <>
      {/* Floating Navigation */}
      <motion.nav
        animate={controls}
        initial={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 2 }}
        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 min-w-max"
      >
        <div>
          {/* <div className="bg-gradient-to-r from-amber-200 via-orange-300 to-amber-200 border-none rounded-full px-8 py-3 shadow-lg shadow-amber-200/50"> */}
            <div className="bg-white backdrop-blur-3xl border-none rounded-full px-8 py-3 shadow-xl shadow-black-200/50">
            <div className="flex items-center justify-center gap-8">
              <motion.div
                className="flex items-center gap-3 text-xl font-light tracking-tight"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center">
                  <Image
                    src="/cmp-logo.png" // ✅ path from public folder
                    alt="Company Logo"
                    width={120} // required
                    height={120} // required
                    priority // optional: preload for performance
                  />{" "}
                  {/* <Layers className="w-4 h-4 text-white" /> */}
                </div>
                <span className="text-black font-medium hidden sm:block">
                  SMYD Global
                </span>
              </motion.div>

              <div className="hidden md:flex items-center gap-8">
                {["features", "team", "testimonials", "contact"].map((item) => (
                  <motion.button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="text-sm text-neutral-600 cursor-pointer hover:font-medium hover:scale-105 transition-all duration-75 capitalize tracking-wide ease-in-out"
                    whileTap={{ scale: 0.95 }}
                  >
                    {item}
                  </motion.button>
                ))}
                <button
                  onClick={() => scrollToSection("contact")}
                  // className="bg-gradient-to-l from-amber-200 via-orange-400 to-amber-200 inline-flex items-center cursor-pointer hover:scale-[1.1] group text-black rounded-full px-6 py-2 active:scale-[0.98] font-light transition-all"
                  className="bg-black inline-flex items-center cursor-pointer hover:scale-[1.1] group text-white rounded-full px-6 py-2 active:scale-[0.98] font-light transition-all"
                >
                  Get Started
                  <ArrowRight
                    size={18}
                    className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                  />
                </button>
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-black"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-4 bg-white/95 backdrop-blur-2xl border  border-neutral-200 rounded-3xl p-6 md:hidden shadow-xl"
            >
              {["features", "team", "testimonials", "contact"].map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left py-3 cursor-pointer text-neutral-900 hover:text-black transition-colors capitalize font-light"
                >
                  {item}
                </button>
              ))}
              <button
                type="button"
                onClick={() => scrollToSection("contact")}
                className="w-full mt-4 bg-black hover:bg-neutral-800 text-white rounded-full font-light py-3 transition-all"
              >
                Get Started
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default NavBar;
