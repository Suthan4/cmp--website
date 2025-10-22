"use client";
import React, { ReactNode, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const DotBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-white" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, #e5e5e5 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />
    </div>
  );
};

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

const CookieType = ({
  name,
  purpose,
  duration,
  delay = 0,
}: {
  name: string;
  purpose: string;
  duration: string;
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
      <h3 className="text-lg font-semibold text-black mb-2">{name}</h3>
      <p className="text-neutral-600 mb-2">
        <span className="font-medium">Purpose:</span> {purpose}
      </p>
      <p className="text-neutral-600">
        <span className="font-medium">Duration:</span> {duration}
      </p>
    </motion.div>
  );
};

export default function CookiePolicy() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="min-h-screen relative">
      <DotBackground />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-black origin-left z-50"
        style={{ scaleX }}
      />

      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-black mb-6 tracking-tight">
            Cookie Policy
          </h1>
          <p className="text-xl text-neutral-600">
            Last Updated: October 22, 2025
          </p>
        </motion.div>

        {/* Introduction */}
        <Section delay={0.1}>
          <p>
            This Cookie Policy explains how our <strong>SMYD Global </strong> IT
            service company ("we," "us," or "our") uses cookies and similar
            technologies on our website operating under the .in domain. This
            policy applies to all visitors and users of our services.
          </p>
          <p>
            By using our website, you consent to the use of cookies in
            accordance with this policy. If you do not agree with our use of
            cookies, you should adjust your browser settings accordingly or
            refrain from using our website.
          </p>
        </Section>

        {/* What Are Cookies */}
        <Section title="What Are Cookies?" delay={0.15}>
          <p>
            Cookies are small text files that are placed on your device
            (computer, smartphone, or tablet) when you visit a website. They are
            widely used to make websites work more efficiently and provide
            information to website owners.
          </p>
          <p>
            Cookies help us understand how visitors interact with our website,
            remember your preferences, and improve your overall experience.
          </p>
        </Section>

        {/* Types of Cookies */}
        <Section title="Types of Cookies We Use" delay={0.2}>
          <p className="mb-6">
            We currently use, or plan to implement in the near future, the
            following categories of cookies:
          </p>

          <CookieType
            name="Essential/Strictly Necessary Cookies"
            purpose="These cookies are essential for the operation of our website and enable core functionality such as security, authentication, and network management. They cannot be disabled."
            duration="Session or up to 1 year"
            delay={0.25}
          />

          <CookieType
            name="Authentication Cookies"
            purpose="These cookies help us verify your identity when you log into our platform, maintain your login session, and provide secure access to your account and our services."
            duration="Session or persistent (up to 30 days)"
            delay={0.3}
          />

          <CookieType
            name="Analytics Cookies (Google Analytics)"
            purpose="We use Google Analytics to collect information about how visitors use our website. This helps us understand user behavior, improve our services, and optimize website performance. These cookies collect information in an aggregated form."
            duration="Up to 2 years"
            delay={0.35}
          />

          <CookieType
            name="Marketing and Tracking Cookies"
            purpose="These cookies track your online activity to help us deliver more relevant advertising and measure the effectiveness of our marketing campaigns. They may also be used to track user events and conversions."
            duration="Up to 2 years"
            delay={0.4}
          />

          <CookieType
            name="Functional/Preference Cookies"
            purpose="These cookies allow our website to remember choices you make (such as language preferences, region, or display settings) and provide enhanced, personalized features."
            duration="Up to 1 year"
            delay={0.45}
          />
        </Section>

        {/* Third-Party Cookies */}
        <Section title="Third-Party Cookies" delay={0.5}>
          <p>
            In addition to our own cookies, we may use third-party services that
            set cookies on your device. These include:
          </p>
          <ul className="list-none space-y-2 mt-4 ml-4">
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>
                <strong>Google Analytics:</strong> For website analytics and
                performance monitoring
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>
                <strong>Marketing platforms:</strong> For advertising,
                retargeting, and conversion tracking
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>
                <strong>Authentication providers:</strong> For secure login and
                identity verification
              </span>
            </li>
          </ul>
          <p className="mt-4">
            These third-party services have their own privacy and cookie
            policies, which we encourage you to review.
          </p>
        </Section>

        {/* Managing Cookies */}
        <Section title="How to Manage Cookies" delay={0.55}>
          <p>
            You have the right to decide whether to accept or reject cookies.
            You can exercise your cookie preferences through the following
            methods:
          </p>
          <div className="mt-4 space-y-3 ml-4">
            <p className="flex items-start">
              <span className="text-black font-bold mr-2">1.</span>
              <span>
                <strong>Browser Settings:</strong> Most web browsers
                automatically accept cookies, but you can modify your browser
                settings to decline cookies if you prefer. Please note that
                disabling cookies may affect the functionality of our website.
              </span>
            </p>
            <p className="flex items-start">
              <span className="text-black font-bold mr-2">2.</span>
              <span>
                <strong>Cookie Banner:</strong> When you first visit our
                website, you will be presented with a cookie consent banner
                allowing you to accept or reject non-essential cookies.
              </span>
            </p>
            <p className="flex items-start">
              <span className="text-black font-bold mr-2">3.</span>
              <span>
                <strong>Opt-Out Tools:</strong> You can opt-out of Google
                Analytics by installing the Google Analytics Opt-out Browser
                Add-on.
              </span>
            </p>
          </div>
        </Section>

        {/* Data Collection */}
        <Section title="Information Collected Through Cookies" delay={0.6}>
          <p>Cookies may collect various types of information, including:</p>
          <ul className="list-none space-y-2 mt-4 ml-4">
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>Your IP address and device information</span>
            </li>
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>Browser type and version</span>
            </li>
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>Pages visited and time spent on our website</span>
            </li>
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>User events and interactions with our services</span>
            </li>
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>Login credentials and authentication status</span>
            </li>
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>Marketing campaign performance and conversion data</span>
            </li>
          </ul>
        </Section>

        {/* Compliance */}
        <Section title="Legal Compliance" delay={0.65}>
          <p>
            As an Indian company operating under the .in domain, we comply with
            applicable Indian laws and regulations, including:
          </p>
          <ul className="list-none space-y-2 mt-4 ml-4">
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>Information Technology Act, 2000</span>
            </li>
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>
                Information Technology (Reasonable Security Practices and
                Procedures and Sensitive Personal Data or Information) Rules,
                2011
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>
                Digital Personal Data Protection Act, 2023 (when applicable)
              </span>
            </li>
          </ul>
          <p className="mt-4">
            We are committed to protecting your privacy and handling your data
            responsibly.
          </p>
        </Section>

        {/* Updates */}
        <Section title="Updates to This Policy" delay={0.7}>
          <p>
            We may update this Cookie Policy from time to time to reflect
            changes in our practices, technologies, legal requirements, or for
            other operational reasons. We encourage you to review this policy
            periodically.
          </p>
          <p>
            The "Last Updated" date at the top of this policy indicates when it
            was last revised. Your continued use of our website after any
            changes constitutes your acceptance of the updated policy.
          </p>
        </Section>

        {/* Contact */}
        <Section title="Contact Us" delay={0.75}>
          <p>
            If you have any questions or concerns about our use of cookies or
            this Cookie Policy, please contact us at:
          </p>
          <div className="mt-4 p-6 bg-neutral-50 border border-neutral-200 rounded-lg">
            <p className="font-medium text-black">
              Email: privacy@yourcompany.in
            </p>
            <p className="text-neutral-600 mt-2">
              We will respond to your inquiry as soon as possible.
            </p>
          </div>
        </Section>
      </div>
    </div>
  );
}
