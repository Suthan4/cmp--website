"use client";
import React, { ReactNode, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
const RevealText = ({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};
const Section = ({
  title,
  children,
  delay = 0,
}: {
  title?: string;
  children: ReactNode;
  delay: number;
}) => {
  return (
    <RevealText delay={delay}>
      <div className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-black">
          {title}
        </h2>
        <div className="text-neutral-700 leading-relaxed space-y-4">
          {children}
        </div>
      </div>
    </RevealText>
  );
};

const InfoBox = ({
  title,
  children,
  delay = 0,
}: {
  title: string;
  children: ReactNode;
  delay: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5, delay }}
      className="border-l-2 border-neutral-300 pl-6 py-4 mb-6"
    >
      <h3 className="text-lg font-semibold text-black mb-2">{title}</h3>
      <div className="text-neutral-600 space-y-2">{children}</div>
    </motion.div>
  );
};
export default function ContactUs() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="min-h-screen relative">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-black origin-left z-50"
        style={{ scaleX }}
      />

      <div className="max-w-3xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-black mb-3 tracking-tight">
            Contact Us
          </h1>
          <p className="text-xl text-neutral-600">
            We're here to help you anytime.
          </p>
        </motion.div>

        <Section delay={0.1}>
          <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-lg space-y-3">
            <p className="font-semibold text-black text-xl">SMYD Global</p>

            <p className="text-neutral-700">
              <strong>Email:</strong> contactus@smyd.in
            </p>

            <p className="text-neutral-700">
              <strong>Phone:</strong> +91 XXXXXXXXXX
            </p>

            <p className="text-neutral-700">
              <strong>Address:</strong> Chennai, Tamil Nadu, India
            </p>

            <p className="text-neutral-500 text-sm pt-2">
              Our support team will respond within 24 hours.
            </p>
          </div>
        </Section>
      </div>
    </div>
  );
}
