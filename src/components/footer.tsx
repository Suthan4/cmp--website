"use client";
import { Globe, Linkedin, Mail, Twitter } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import React, { RefObject, useRef } from "react";

const Footer = ({
  footerRef,
}: {
  footerRef: RefObject<HTMLDivElement | null>;
}) => {
  return (
    <>
      <div ref={footerRef} className="w-full p-4 md:p-6">
        <motion.footer className="w-full bg-gradient-to-r from-amber-200 via-orange-300 to-amber-200 text-black py-8 rounded-2xl md:py-16 md:rounded-4xl shadow-lg shadow-amber-200/50 backdrop-blur-3xl">
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            {/* Grid Layout */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 mb-8 md:mb-12">
              {/* Navigation */}
              <div>
                <h4 className="text-black font-semibold mb-4 md:mb-6 text-xs md:text-sm uppercase tracking-wider">
                  Navigation
                </h4>
                <ul className="space-y-2 md:space-y-3">
                  <li>
                    <a
                      href="#"
                      className="text-neutral-700 hover:text-black transition-colors text-xs md:text-sm"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-neutral-700 hover:text-black transition-colors text-xs md:text-sm"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-neutral-700 hover:text-black transition-colors text-xs md:text-sm"
                    >
                      Careers
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-neutral-700 hover:text-black transition-colors text-xs md:text-sm"
                    >
                      Blog
                    </a>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4 className="text-black font-semibold mb-4 md:mb-6 text-xs md:text-sm uppercase tracking-wider">
                  Legal
                </h4>
                <ul className="space-y-2 md:space-y-3">
                  <li>
                    <Link
                      href="/privacy-policy"
                      className="text-neutral-700 hover:text-black transition-colors text-xs md:text-sm"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms-and-conditions"
                      className="text-neutral-700 hover:text-black transition-colors text-xs md:text-sm"
                    >
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cookie-policy"
                      className="text-neutral-700 hover:text-black transition-colors text-xs md:text-sm"
                    >
                      Cookie Policy
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Social */}
              {/* <div>
                <h4 className="text-black font-semibold mb-4 md:mb-6 text-xs md:text-sm uppercase tracking-wider">
                  Stay in touch
                </h4>
                <ul className="space-y-2 md:space-y-3">
                  <li>
                    <a
                      href="#"
                      className="text-neutral-700 hover:text-black transition-colors text-xs md:text-sm"
                    >
                      Discord
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-neutral-700 hover:text-black transition-colors text-xs md:text-sm"
                    >
                      Twitter / X
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-neutral-700 hover:text-black transition-colors text-xs md:text-sm"
                    >
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </div> */}
            </div>
            {/* Divider */}
            <div className="border-t border-black/20 pt-6 md:pt-8 mb-12">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
                <p className="text-neutral-700 text-xs md:text-xs">
                  © SMYD Global 2025. All rights reserved.
                </p>
                {/* <div className="flex gap-4 md:gap-6">
                  <button className="text-neutral-700 hover:text-black transition-colors duration-200">
                    <Globe className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                  <button className="text-neutral-700 hover:text-black transition-colors duration-200">
                    <Twitter className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                  <button className="text-neutral-700 hover:text-black transition-colors duration-200">
                    <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                  <button className="text-neutral-700 hover:text-black transition-colors duration-200">
                    <Mail className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div> */}
              </div>
            </div>
            {/* <div className="text-center md:mb-12">
              <h3 className="text-[5.2rem] md:text-[13rem] lg:text-[20rem] font-medium mb-2 md:mb-3 leading-[0.95] tracking-tight">
                SMYD Global
              </h3>
              <p className="text-neutral-700 text-xs md:text-sm font-light">
                Every AI for everyone
              </p>
            </div> */}
          </div>
        </motion.footer>
      </div>
    </>
  );
};

export default Footer;
