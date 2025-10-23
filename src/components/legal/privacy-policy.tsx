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

export default function PrivacyPolicy() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="min-h-screen relative">
      <DotBackground />

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
            Privacy Policy
          </h1>
          <p className="text-xl text-neutral-600">SMYD Global IT Services</p>
          <p className="text-lg text-neutral-500 mt-2">
            Last Updated: October 22, 2025
          </p>
        </motion.div>

        <Section delay={0.1}>
          <p>
            SMYD Global ("we," "us," or "our") is committed to protecting your
            privacy. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you visit our website and use
            our IT services.
          </p>
          <p>
            By accessing or using our services, you agree to this Privacy
            Policy. If you do not agree with the terms, please discontinue use
            of our services immediately.
          </p>
        </Section>

        <Section title="Information We Collect" delay={0.15}>
          <p className="font-semibold text-black mb-3">Personal Information</p>
          <p>
            We may collect personal information that you voluntarily provide to
            us, including:
          </p>
          <ul className="list-none space-y-2 mt-3 ml-4">
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>Name, email address, phone number</span>
            </li>
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>Company name and business information</span>
            </li>
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>Billing and payment information</span>
            </li>
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>Login credentials and account information</span>
            </li>
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>Communication preferences and feedback</span>
            </li>
          </ul>

          <p className="font-semibold text-black mb-3 mt-6">
            Automatically Collected Information
          </p>
          <p>
            When you access our website, we automatically collect certain
            information, including:
          </p>
          <ul className="list-none space-y-2 mt-3 ml-4">
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>IP address, browser type, and device information</span>
            </li>
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>Usage data, pages visited, and time spent</span>
            </li>
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>Cookies and tracking technologies (see Cookie Policy)</span>
            </li>
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>Analytics data through Google Analytics</span>
            </li>
          </ul>
        </Section>

        <Section title="How We Use Your Information" delay={0.2}>
          <p>We use the collected information for the following purposes:</p>
          <InfoBox title="Service Delivery" delay={0.25}>
            <p>
              To provide, maintain, and improve our IT services, process
              transactions, and fulfill service requests.
            </p>
          </InfoBox>
          <InfoBox title="Communication" delay={0.3}>
            <p>
              To respond to inquiries, send service updates, technical notices,
              and marketing communications (with your consent).
            </p>
          </InfoBox>
          <InfoBox title="Analytics & Improvement" delay={0.35}>
            <p>
              To analyze usage patterns, improve user experience, and develop
              new features and services.
            </p>
          </InfoBox>
          <InfoBox title="Security & Compliance" delay={0.4}>
            <p>
              To protect against fraud, ensure security of our systems, and
              comply with legal obligations.
            </p>
          </InfoBox>
          <InfoBox title="Marketing" delay={0.45}>
            <p>
              To send promotional materials, track campaign effectiveness, and
              deliver targeted advertising (with consent).
            </p>
          </InfoBox>
        </Section>

        <Section title="How We Share Your Information" delay={0.5}>
          <p>We may share your information in the following circumstances:</p>
          <ul className="list-none space-y-2 mt-3 ml-4">
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>
                <strong>Service Providers:</strong> With third-party vendors who
                perform services on our behalf (hosting, analytics, payment
                processing)
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>
                <strong>Business Transfers:</strong> In connection with mergers,
                acquisitions, or sale of assets
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>
                <strong>Legal Requirements:</strong> When required by law or to
                protect our rights and safety
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>
                <strong>With Consent:</strong> When you explicitly authorize us
                to share your information
              </span>
            </li>
          </ul>
          <p className="mt-4">
            We do not sell your personal information to third parties.
          </p>
        </Section>

        <Section title="Data Security" delay={0.55}>
          <p>
            We implement appropriate technical and organizational security
            measures to protect your personal information against unauthorized
            access, alteration, disclosure, or destruction. These measures
            include:
          </p>
          <ul className="list-none space-y-2 mt-3 ml-4">
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>Encryption of data in transit and at rest</span>
            </li>
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>Regular security assessments and updates</span>
            </li>
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>Access controls and authentication mechanisms</span>
            </li>
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>Employee training on data protection</span>
            </li>
          </ul>
          <p className="mt-4">
            However, no method of transmission over the internet is 100% secure,
            and we cannot guarantee absolute security.
          </p>
        </Section>

        <Section title="Data Retention" delay={0.6}>
          <p>
            We retain your personal information only for as long as necessary to
            fulfill the purposes outlined in this Privacy Policy, unless a
            longer retention period is required or permitted by law. When
            information is no longer needed, we will securely delete or
            anonymize it.
          </p>
        </Section>

        <Section title="Your Rights" delay={0.65}>
          <p>
            Under applicable Indian data protection laws, you have the following
            rights:
          </p>
          <ul className="list-none space-y-2 mt-3 ml-4">
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>
                <strong>Access:</strong> Request access to your personal
                information
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>
                <strong>Correction:</strong> Request correction of inaccurate or
                incomplete data
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>
                <strong>Deletion:</strong> Request deletion of your personal
                information
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>
                <strong>Withdrawal of Consent:</strong> Withdraw consent for
                processing (where applicable)
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>
                <strong>Opt-Out:</strong> Opt-out of marketing communications
              </span>
            </li>
          </ul>
          <p className="mt-4">
            To exercise these rights, please contact us at contactus@smyd.in
          </p>
        </Section>

        <Section title="Third-Party Services" delay={0.7}>
          <p>
            Our website may contain links to third-party websites or integrate
            third-party services (such as Google Analytics). We are not
            responsible for the privacy practices of these third parties. We
            encourage you to review their privacy policies.
          </p>
        </Section>

        <Section title="Children's Privacy" delay={0.75}>
          <p>
            Our services are not intended for individuals under the age of 18.
            We do not knowingly collect personal information from children. If
            you believe we have collected information from a child, please
            contact us immediately.
          </p>
        </Section>

        <Section title="International Data Transfers" delay={0.8}>
          <p>
            Your information may be transferred to and processed in countries
            other than India. We ensure appropriate safeguards are in place to
            protect your information in accordance with this Privacy Policy and
            applicable laws.
          </p>
        </Section>

        <Section title="Legal Compliance" delay={0.85}>
          <p>This Privacy Policy complies with:</p>
          <ul className="list-none space-y-2 mt-3 ml-4">
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
              <span>Digital Personal Data Protection Act, 2023</span>
            </li>
          </ul>
        </Section>

        <Section title="Changes to This Policy" delay={0.9}>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of any material changes by posting the new policy on this page
            and updating the "Last Updated" date. Your continued use of our
            services after changes constitutes acceptance of the updated policy.
          </p>
        </Section>

        <Section title="Contact Us" delay={0.95}>
          <p>
            If you have questions, concerns, or requests regarding this Privacy
            Policy or our data practices, please contact us:
          </p>
          <div className="mt-4 p-6 bg-neutral-50 border border-neutral-200 rounded-lg">
            <p className="font-bold text-black text-lg mb-3">SMYD Global</p>
            <p className="text-neutral-700">
              <strong>Email:</strong> contactus@smyd.in
            </p>
            <p className="text-neutral-600 mt-4 text-sm">
              We will respond to your inquiry as soon as possible.
            </p>
          </div>
        </Section>
      </div>
    </div>
  );
}
