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


export default function CancellationRefundPolicy() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="min-h-screen relative">

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-black origin-left z-50"
        style={{ scaleX }}
      />

      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-black mb-6 tracking-tight">
            Cancellation & Refunds
          </h1>
          <p className="text-xl text-neutral-600">SMYD Global IT Services</p>
        </motion.div>

        <Section delay={0.1}>
          <p>
            At SMYD Global, we strive to ensure that our clients are satisfied
            with the services purchased. This Cancellation & Refund Policy
            explains how cancellations and refunds are handled.
          </p>
        </Section>

        <Section title="Cancellation Policy" delay={0.15}>
          <InfoBox title="Before Project Start" delay={0.2}>
            <p>
              You may cancel your service request before the project begins.
              Full cancellation is allowed without any charges.
            </p>
          </InfoBox>

          <InfoBox title="After Project Commencement" delay={0.25}>
            <p>
              Once the project development has started, cancellation may incur
              charges based on the work already completed.
            </p>
          </InfoBox>

          <InfoBox title="Service Subscription Cancellation" delay={0.3}>
            <p>
              Monthly or yearly subscription services can be cancelled anytime.
              However, cancellations do not automatically qualify for refunds.
            </p>
          </InfoBox>
        </Section>

        <Section title="Refund Policy" delay={0.35}>
          <InfoBox title="Eligibility for Refund" delay={0.4}>
            <p>
              Refunds are provided only if the work has not been initiated or if
              there is a proven service delivery failure from our side.
            </p>
          </InfoBox>

          <InfoBox title="Non-Refundable Services" delay={0.45}>
            <ul className="space-y-1 text-neutral-600">
              <li>• Domain purchases</li>
              <li>• Hosting services</li>
              <li>• Completed project modules</li>
              <li>• Third-party integrated services</li>
            </ul>
          </InfoBox>

          <InfoBox title="Refund Processing Time" delay={0.5}>
            <p>Approved refunds will be processed within 7–14 business days.</p>
          </InfoBox>
        </Section>

        <Section title="Contact for Cancellation/Refund" delay={0.55}>
          <p>
            To request cancellation or refund, contact our support team at{" "}
            <strong>contactus@smyd.in</strong>.
          </p>
        </Section>

        {/* ⭐ Added Shop Management Services Section */}
        <Section title="Shop Management Services" delay={1.0}>
          <p>
            In addition to our IT services, SMYD Global also provides Shop
            Management Services, including digital menu systems, QR-based menu
            access, analytics, and related operational tools for businesses.
          </p>

          <p>
            When you use our Shop Management Services, we may collect certain
            business and operational information required to deliver these
            services effectively. This may include:
          </p>

          <ul className="list-none space-y-2 mt-3 ml-4">
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>Shop or business details provided by you</span>
            </li>
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>
                Menu information such as item names, prices, images, and
                categories
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>
                Analytics data like customer visits, QR scans, and engagement
                metrics
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>Billing, subscription, and account details</span>
            </li>
          </ul>

          <p className="mt-4">
            This information is used solely for operating, improving, and
            supporting your shop’s digital system. We do not sell or share your
            business data with outside parties except for essential service
            providers involved in hosting, analytics, or payment processing.
          </p>

          <p className="mt-4">
            If you wish to update or delete data related to your shop, please
            reach out to us at <strong>contactus@smyd.in</strong>.
          </p>
        </Section>
      </div>
    </div>
  );
}
