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
  number,
}: {
  title?: string;
  children: ReactNode;
  delay: number;
  number?: string;
}) => {
  return (
    <RevealText delay={delay}>
      <div className="mb-12">
        <div className="flex items-end gap-4 mb-4">
          {number && (
            <span className="text-4xl font-bold text-neutral-700 leading-none">
              {number}
            </span>
          )}
          <h2 className="text-2xl md:text-3xl font-bold text-black pt-1">
            {title}
          </h2>
        </div>
        <div className="text-neutral-700 leading-relaxed space-y-4 ml-0 md:ml-14">
          {children}
        </div>
      </div>
    </RevealText>
  );
};

const SubSection = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-black mb-3">{title}</h3>
      <div className="text-neutral-700 space-y-2">{children}</div>
    </div>
  );
};

export default function TermsConditions() {
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
            Terms & Conditions
          </h1>
          <p className="text-xl text-neutral-600">SMYD Global IT Services</p>
          <p className="text-lg text-neutral-500 mt-2">
            Last Updated: October 22, 2025
          </p>
        </motion.div>

        <Section delay={0.1}>
          <p>
            Welcome to SMYD Global. These Terms and Conditions ("Terms") govern
            your access to and use of our website, services, and products. By
            accessing or using our services, you agree to be bound by these
            Terms.
          </p>
          <p>
            Please read these Terms carefully before using our services. If you
            do not agree with any part of these Terms, you must not use our
            services.
          </p>
        </Section>

        <Section title="Acceptance of Terms" delay={0.15} number="1">
          <p>
            By accessing, browsing, or using the SMYD Global website and
            services, you acknowledge that you have read, understood, and agree
            to be bound by these Terms and our Privacy Policy. These Terms
            constitute a legally binding agreement between you and SMYD Global.
          </p>
          <p>
            If you are entering into these Terms on behalf of a company or legal
            entity, you represent that you have the authority to bind such
            entity to these Terms.
          </p>
        </Section>

        <Section title="Services Description" delay={0.2} number="2">
          <p>SMYD Global provides IT services including but not limited to:</p>
          <ul className="list-none space-y-2 mt-3 ml-4">
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>Software development and consulting</span>
            </li>
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>Web and mobile application development</span>
            </li>
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>Cloud services and infrastructure management</span>
            </li>
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>IT consulting and technical support</span>
            </li>
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>Digital transformation solutions</span>
            </li>
          </ul>
          <p className="mt-4">
            Specific services will be detailed in separate service agreements or
            statements of work.
          </p>
        </Section>

        <Section title="User Accounts and Registration" delay={0.25} number="3">
          <SubSection title="Account Creation">
            <p>
              To access certain features of our services, you may be required to
              create an account. You agree to provide accurate, current, and
              complete information during registration and to update such
              information to keep it accurate and current.
            </p>
          </SubSection>
          <SubSection title="Account Security">
            <p>
              You are responsible for maintaining the confidentiality of your
              account credentials and for all activities that occur under your
              account. You must notify us immediately of any unauthorized use of
              your account or any security breach.
            </p>
          </SubSection>
          <SubSection title="Account Termination">
            <p>
              We reserve the right to suspend or terminate your account if you
              violate these Terms or engage in fraudulent, abusive, or illegal
              activities.
            </p>
          </SubSection>
        </Section>

        <Section
          title="User Obligations and Prohibited Conduct"
          delay={0.3}
          number="4"
        >
          <p>You agree NOT to:</p>
          <ul className="list-none space-y-2 mt-3 ml-4">
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>
                Use our services for any illegal or unauthorized purpose
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>
                Violate any applicable local, state, national, or international
                law
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>
                Transmit any malicious code, viruses, or harmful software
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>
                Attempt to gain unauthorized access to our systems or networks
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>Interfere with or disrupt the services or servers</span>
            </li>
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>
                Use automated systems to access the services without permission
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>Impersonate any person or entity</span>
            </li>
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>
                Collect or harvest personal information of other users
              </span>
            </li>
          </ul>
        </Section>

        <Section title="Intellectual Property Rights" delay={0.35} number="5">
          <SubSection title="Our Intellectual Property">
            <p>
              All content, features, and functionality of our services,
              including but not limited to text, graphics, logos, icons, images,
              audio clips, video clips, data compilations, software, and the
              design, selection, and arrangement thereof, are owned by SMYD
              Global or our licensors and are protected by Indian and
              international copyright, trademark, patent, and other intellectual
              property laws.
            </p>
          </SubSection>
          <SubSection title="Limited License">
            <p>
              Subject to these Terms, we grant you a limited, non-exclusive,
              non-transferable, non-sublicensable license to access and use our
              services for your personal or internal business purposes.
            </p>
          </SubSection>
          <SubSection title="Client Intellectual Property">
            <p>
              You retain all rights to any content, data, or materials you
              provide to us. By providing such materials, you grant us a license
              to use them solely for the purpose of delivering our services to
              you.
            </p>
          </SubSection>
          <SubSection title="Work Product">
            <p>
              Ownership of custom work product developed specifically for you
              will be addressed in separate service agreements or statements of
              work.
            </p>
          </SubSection>
        </Section>

        <Section title="Payment and Fees" delay={0.4} number="6">
          <SubSection title="Pricing">
            <p>
              Fees for our services will be specified in service agreements,
              quotations, or invoices. All fees are in Indian Rupees (INR)
              unless otherwise stated.
            </p>
          </SubSection>
          <SubSection title="Payment Terms">
            <p>
              Payment is due as per the terms specified in the invoice or
              service agreement. Late payments may incur interest charges at the
              rate of 1.5% per month or the maximum rate permitted by law,
              whichever is lower.
            </p>
          </SubSection>
          <SubSection title="Taxes">
            <p>
              All fees are exclusive of applicable taxes (including GST). You
              are responsible for paying all taxes associated with your
              purchase.
            </p>
          </SubSection>
          <SubSection title="Refunds">
            <p>
              Refund policies will be specified in individual service
              agreements. Generally, fees paid for completed services are
              non-refundable.
            </p>
          </SubSection>
        </Section>

        <Section title="Confidentiality" delay={0.45} number="7">
          <p>
            Both parties agree to maintain the confidentiality of any
            proprietary or confidential information disclosed during the course
            of the business relationship. This obligation survives the
            termination of these Terms.
          </p>
          <p className="mt-3">
            Confidential information includes, but is not limited to, technical
            data, business strategies, customer information, and any information
            marked as confidential.
          </p>
        </Section>

        <Section title="Warranties and Disclaimers" delay={0.5} number="8">
          <SubSection title="Services Warranty">
            <p>
              We warrant that our services will be performed in a professional
              and workmanlike manner in accordance with industry standards.
            </p>
          </SubSection>
          <SubSection title="Disclaimer">
            <p>
              EXCEPT AS EXPRESSLY PROVIDED IN THESE TERMS, OUR SERVICES ARE
              PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY
              KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
              IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
              PURPOSE, AND NON-INFRINGEMENT.
            </p>
            <p className="mt-3">
              We do not warrant that our services will be uninterrupted,
              error-free, or completely secure. You acknowledge that your use of
              the services is at your sole risk.
            </p>
          </SubSection>
        </Section>

        <Section title="Limitation of Liability" delay={0.55} number="9">
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL
            SMYD GLOBAL, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, OR
            AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
            CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION,
            LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES,
            RESULTING FROM:
          </p>
          <ul className="list-none space-y-2 mt-3 ml-4">
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>
                Your access to or use of or inability to access or use the
                services
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>
                Any conduct or content of any third party on the services
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>Unauthorized access, use, or alteration of your data</span>
            </li>
          </ul>
          <p className="mt-4">
            Our total liability to you for all claims arising from or related to
            these Terms or the services shall not exceed the amount paid by you
            to us in the twelve (12) months preceding the claim, or INR 100,000,
            whichever is less.
          </p>
        </Section>

        <Section title="Indemnification" delay={0.6} number="10">
          <p>
            You agree to indemnify, defend, and hold harmless SMYD Global and
            its officers, directors, employees, contractors, agents, licensors,
            and suppliers from and against any claims, liabilities, damages,
            losses, costs, or expenses (including reasonable attorneys' fees)
            arising out of or in any way connected with:
          </p>
          <ul className="list-none space-y-2 mt-3 ml-4">
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>Your access to or use of the services</span>
            </li>
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>Your violation of these Terms</span>
            </li>
            <li className="flex items-start">
              <span className="text-black mr-2">•</span>
              <span>
                Your violation of any rights of another person or entity
              </span>
            </li>
          </ul>
        </Section>

        <Section title="Term and Termination" delay={0.65} number="11">
          <SubSection title="Term">
            <p>
              These Terms remain in effect while you use our services or have an
              account with us.
            </p>
          </SubSection>
          <SubSection title="Termination by You">
            <p>
              You may terminate your account and stop using our services at any
              time by contacting us at <strong>contactus@smyd.in</strong>
            </p>
          </SubSection>
          <SubSection title="Termination by Us">
            <p>
              We may suspend or terminate your access to our services at any
              time, with or without cause or notice, if we believe you have
              violated these Terms or for any other reason at our sole
              discretion.
            </p>
          </SubSection>
          <SubSection title="Effect of Termination">
            <p>
              Upon termination, your right to use the services will immediately
              cease. Provisions that by their nature should survive termination
              shall survive, including but not limited to ownership provisions,
              warranty disclaimers, indemnity, and limitations of liability.
            </p>
          </SubSection>
        </Section>

        <Section
          title="Dispute Resolution and Governing Law"
          delay={0.7}
          number="12"
        >
          <SubSection title="Governing Law">
            <p>
              These Terms shall be governed by and construed in accordance with
              the laws of India, without regard to its conflict of law
              provisions.
            </p>
          </SubSection>
          <SubSection title="Jurisdiction">
            <p>
              Any disputes arising out of or relating to these Terms or the
              services shall be subject to the exclusive jurisdiction of the
              courts located in [Your City], India.
            </p>
          </SubSection>
          <SubSection title="Dispute Resolution">
            <p>
              In the event of any dispute, the parties agree to first attempt to
              resolve the matter through good faith negotiations. If the dispute
              cannot be resolved through negotiation, the parties may proceed to
              mediation before initiating any legal proceedings.
            </p>
          </SubSection>
        </Section>

        <Section title="Force Majeure" delay={0.75} number="13">
          <p>
            SMYD Global shall not be liable for any failure or delay in
            performing its obligations under these Terms due to circumstances
            beyond its reasonable control, including but not limited to acts of
            God, natural disasters, war, terrorism, riots, embargoes, acts of
            civil or military authorities, fire, floods, accidents, pandemics,
            strikes, or shortages of transportation, facilities, fuel, energy,
            labor, or materials.
          </p>
        </Section>

        <Section title="Modifications to Terms" delay={0.8} number="14">
          <p>
            We reserve the right to modify or replace these Terms at any time at
            our sole discretion. We will provide notice of any material changes
            by posting the new Terms on our website and updating the "Last
            Updated" date.
          </p>
          <p className="mt-3">
            Your continued use of the services after any such changes
            constitutes your acceptance of the new Terms. If you do not agree to
            the modified Terms, you must stop using our services.
          </p>
        </Section>

        <Section title="Severability" delay={0.85} number="15">
          <p>
            If any provision of these Terms is held to be invalid, illegal, or
            unenforceable by a court of competent jurisdiction, such provision
            shall be modified to the minimum extent necessary to make it valid
            and enforceable, or if such modification is not possible, such
            provision shall be severed from these Terms. The remaining
            provisions shall continue in full force and effect.
          </p>
        </Section>

        <Section title="Entire Agreement" delay={0.9} number="16">
          <p>
            These Terms, together with our Privacy Policy and any other
            agreements or policies referenced herein, constitute the entire
            agreement between you and SMYD Global regarding the use of our
            services and supersede all prior or contemporaneous understandings
            and agreements, whether written or oral.
          </p>
        </Section>

        <Section title="Waiver" delay={0.95} number="17">
          <p>
            No waiver of any term or condition of these Terms shall be deemed a
            further or continuing waiver of such term or condition or any other
            term or condition. Any failure by SMYD Global to assert any right or
            provision under these Terms shall not constitute a waiver of such
            right or provision.
          </p>
        </Section>

        <Section title="Assignment" delay={1} number="18">
          <p>
            You may not assign or transfer these Terms or any rights or
            obligations hereunder without our prior written consent. We may
            assign or transfer these Terms or any rights or obligations
            hereunder at our sole discretion, including in connection with a
            merger, acquisition, reorganization, or sale of assets.
          </p>
        </Section>

        <Section title="Contact Information" delay={1.05} number="19">
          <p>
            If you have any questions, concerns, or feedback regarding these
            Terms and Conditions, please contact us:
          </p>
          <div className="mt-6 p-6 bg-neutral-50 border border-neutral-200 rounded-lg">
            <p className="font-bold text-black text-lg mb-3">SMYD Global</p>
            <p className="text-neutral-700">
              <strong>Email:</strong> contactus@smyd.in
            </p>
            <p className="text-neutral-600 mt-4 text-sm">
              We will respond to your inquiry as soon as possible.
            </p>
          </div>
        </Section>

        <Section title="Acknowledgment" delay={1.1}>
          <p className="font-semibold text-black">
            BY USING OUR SERVICES, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE
            TERMS AND CONDITIONS, UNDERSTAND THEM, AND AGREE TO BE BOUND BY
            THEM.
          </p>
        </Section>
      </div>
    </div>
  );
}
