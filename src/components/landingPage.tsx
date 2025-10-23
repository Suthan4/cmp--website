"use client";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import {
  Users,
  GitBranch,
  ShieldCheck,
  Zap,
  Droplet,
  Package,
  Palette,
  ArrowRight,
  Smartphone,
  ShoppingCart,
  TrendingUp,
  BarChart,
  Database,
  Layers,
} from "lucide-react";
import Image from "next/image";
import SplashScreen from "./splashScreen";
import ServicesSection from "./ourServices";
import ContactSection from "./contactForm";

const HeroSection = () => {
  const { scrollYProgress } = useScroll();
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  return (
    <motion.section
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ opacity: heroOpacity, y: heroY }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-4 md:py-0 mt-4 md:mt-4"
        >
          <motion.h1
            initial="initial"
            className="flex items-center justify-center gap-0 font-light leading-[0.95] tracking-tight"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center flex-shrink-0">
              <Image
                src="/company-logo.png"
                alt="Company Logo"
                width={140}
                height={140}
                priority
              />{" "}
            </div>
            <span className="text-black text-xl font-medium hidden sm:block">
              SMYD Global
            </span>
          </motion.h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-7xl mx-auto"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-[0.95] tracking-tight">
            <span className="block text-black">Transform</span>
            <span className="block text-black">Your Business</span>
            <span className="block text-black text-6xl md:text-8xl">
              with Impact
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-xl text-neutral-600 mb-4 max-w-4xl mx-auto leading-relaxed"
          >
            Empowering enterprises with cutting-edge artificial intelligence,
            data analytics, and cloud solutions.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <button
              onClick={() => scrollToSection("contact")}
              className="relative bg-gradient-to-l from-amber-200 via-orange-400 to-amber-200 text-black rounded-full px-10 py-3 text-lg font-semibold transition-all backdrop-blur-md hover:backdrop-blur-lg overflow-hidden group"
            >
              <span className="relative z-10 flex items-center">
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="relative border-2 border-black/40 hover:border-black/80 hover:bg-black/10 text-black rounded-full px-10 py-3 text-lg font-semibold transition-all backdrop-blur-md hover:backdrop-blur-lg overflow-hidden group"
            >
              <span className="relative z-10">Explore Solutions</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2"
          >
            <motion.div className="w-1.5 h-2 bg-white/60 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

const team = [
  {
    name: "Developers",
    subtitle: "IT Solutions",
    role: "Delivering end-to-end application development solutions, focusing on quality, scalability, and cutting-edge technology adoption.",
    icon: GitBranch,
  },
  {
    name: "UI/UX Designers",
    subtitle: "Experience Crafters",
    role: "Crafting intuitive and engaging user experiences with a focus on user-centered design principles and aesthetic excellence.",
    icon: Palette,
  },
  {
    name: "Senior QA Engineers",
    subtitle: "Quality Assurance",
    role: "Ensuring the highest quality standards through meticulous testing of every aspect of your product for flawless performance.",
    icon: ShieldCheck,
  },
  {
    name: "Project Managers",
    subtitle: "Delivery Experts",
    role: "Overseeing the entire development lifecycle, ensuring on-time delivery within budget and maintaining the highest client satisfaction.",
    icon: Package,
  },
  {
    name: "Business Executive Analyst",
    subtitle: "Strategic Insights",
    role: "Analyzing business processes and market trends to provide actionable insights and support strategic decision-making.",
    icon: BarChart,
  },
  {
    name: "Data Scientist",
    subtitle: "Data Innovators",
    role: "Leveraging data to build predictive models, extract actionable insights, and drive data-informed business decisions.",
    icon: Database,
  },
  {
    name: "Architect",
    subtitle: "Solution Architect",
    role: "Designing scalable and efficient software architectures, ensuring alignment with business goals and technical standards.",
    icon: Layers,
  },
];

const TeamStackedCard = ({
  member,
  index,
  totalCards,
}: {
  member: (typeof team)[0];
  index: number;
  totalCards: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const targetScale = 1 - (totalCards - index - 1) * 0.05;
  const targetY = (totalCards - index - 1) * 40;

  const Icon = member.icon;

  return (
    <motion.div
      ref={cardRef}
      className="sticky top-24 mb-8 bg-white"
      style={{
        transform: `scale(${targetScale}) translateY(${targetY}px)`,
        transformOrigin: "top center",
        transition: "transform 0.3s ease-out",
      }}
    >
      <motion.div
        transition={{ duration: 0.3 }}
        viewport={{ once: true, margin: "-100px" }}
        className="rounded-2xl p-6 shadow-xl flex flex-col justify-between relative overflow-hidden border border-gray-200 min-h-[280px]"
      >
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gray-500 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-start gap-4 mb-4">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className={`p-3 rounded-xl flex-shrink-0 shadow-lg`}
            >
              <Icon className={`w-6 h-6 `} />
            </motion.div>

            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-bold mb-1">
                {member.name}
              </h3>
              <p className="text-sm md:text-base font-medium">
                {member.subtitle}
              </p>
            </div>
          </div>

          <p className="text-base md:text-lg leading-relaxed">{member.role}</p>
        </div>

        {/* Card Number Badge */}
        <div className="relative z-10 flex justify-end">
          <div
            className={` bg-opacity-10 backdrop-blur-sm px-4 py-2 rounded-full border`}
          >
            <span className={` text-lg font-bold`}>
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const TeamSection = () => {
  return (
    <section
      id="team"
      className="max-w-6xl section-base mx-auto px-8 pb-32 bg-white"
    >
      <div className="space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h2 className="text-6xl md:text-7xl font-light mb-6 tracking-tight leading-none">
            Our Team
          </h2>
          <p className="text-lg md:text-xl text-neutral-500 max-w-2xl mx-auto font-light">
            A passionate team turning ideas into impactful solutions.
          </p>
        </motion.div>
        <div className="relative" style={{ height: `${team.length * 450}px` }}>
          {team.map((member, index) => (
            <TeamStackedCard
              key={member.name}
              member={member}
              index={index}
              totalCards={team.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ProjCardData {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  details?: string[];
}

const projCards: ProjCardData[] = [
  {
    id: 1,
    title: "Food App Development",
    description:
      "Specializing in comprehensive mobile and web solutions for the food industry, creating intuitive and engaging platforms for ordering, delivery, and restaurant management.",
    icon: <Smartphone className="w-12 h-12" />,
  },
  {
    id: 2,
    title: "Shopify Integrations",
    description:
      "Seamlessly integrating Shopify with various business systems to enhance e-commerce functionality, streamline operations, and boost online sales.",
    icon: <ShoppingCart className="w-12 h-12" />,
  },
  {
    id: 3,
    title: "ServiceNow Application Development",
    description:
      "Leveraging the ServiceNow platform to build custom applications and solutions across various domains:",
    icon: <TrendingUp className="w-12 h-12" />,
    details: [
      "ITSM: IT Service Management",
      "IRM: Integrated Risk Management",
      "SecOps: Security Operations",
      "CSM: Customer Service Management",
      "FSM: Field Service Management",
      "Custom applications, Integrations, SLO, ITOM, ITAM.",
    ],
  },
];

const ProjCard = ({ card, index }: { card: ProjCardData; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <motion.div
      ref={ref}
      style={{
        scale,
        y,
        top: `${index * 50}px`,
      }}
      className="sticky w-full"
    >
      <div className="relative rounded-3xl bg-white p-10 shadow-2xl border border-neutral-200 overflow-hidden group hover:shadow-3xl transition-shadow duration-500">
        {/* Subtle gradient overlay on hover */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" /> */}

        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-neutral-900 to-neutral-700 opacity-5 rounded-bl-full" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-neutral-900 to-neutral-700 opacity-5 rounded-tr-full" />

        <div className="relative z-10">
          {/* Icon and Number */}
          <div className="flex items-start justify-between mb-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="p-5 bg-neutral-900 rounded-2xl text-white shadow-xl shadow-neutral-900/20 group-hover:shadow-2xl group-hover:shadow-neutral-900/30 transition-shadow duration-500"
            >
              {card.icon}
            </motion.div>
            {/* <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-8xl font-bold text-neutral-100"
            >
              {card.id}
            </motion.div> */}
          </div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-neutral-900 mb-5 leading-tight"
          >
            {card.title}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-neutral-600 leading-relaxed mb-6"
          >
            {card.description}
          </motion.p>

          {/* Details List */}
          {card.details && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-3 mt-8"
            >
              {card.details.map((detail, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                  className="flex items-start gap-3 group/item"
                >
                  <div className="w-2 h-2 rounded-full bg-neutral-900 mt-2 flex-shrink-0 group-hover/item:scale-125 transition-transform" />
                  <p className="text-neutral-700 text-base font-medium">
                    {detail}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-neutral-900 via-neutral-600 to-transparent rounded-full mt-8 origin-left"
          />
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section
      id="projects"
      className="max-w-6xl section-base mx-auto px-8 pb-32 bg-white"
    >
      <div className="space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl md:text-7xl font-light mb-6 tracking-tight leading-none">
            Projects We Pitched{" "}
          </h2>
          <p className="text-lg md:text-xl text-neutral-500 max-w-2xl mx-auto font-light">
            Delivering innovative solutions that make a real impact.
          </p>
        </motion.div>
        {projCards.map((card, index) => (
          <ProjCard key={card.id} card={card} index={index} />
        ))}
      </div>
    </section>
  );
};

const EngagementModels = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const engagements = [
    {
      icon: Users,
      title: "Fixed Price",
      subtitle: "Clear Scope Projects",
      desc: "Predictable costs and timelines for projects with well-defined requirements.",
    },
    {
      icon: Droplet,
      title: "Time & Material",
      subtitle: "Flexible Approach",
      desc: "Maximum flexibility for evolving requirements with agile adjustments.",
    },
    {
      icon: Zap,
      title: "Dedicated Team",
      subtitle: "Extended Resources",
      desc: "Full-time dedicated resources integrated with your team for complete control.",
    },
  ];

  return (
    <section
      id="engagements"
      ref={containerRef}
      className="relative section-base bg-white overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl md:text-7xl font-light mb-6 tracking-[-0.02em] leading-none">
            Our Engagements
          </h2>
          <p className="text-lg md:text-xl text-neutral-500 max-w-2xl mx-auto font-light">
            Committed to delivering value beyond expectations
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {engagements.map((engagement, index) => (
            <EngagementCard
              key={index}
              engagement={engagement}
              index={index}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const EngagementCard = ({ engagement, index, scrollYProgress }: any) => {
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <motion.div
      style={{ y }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative bg-white rounded-3xl p-10 border border-neutral-200 hover:border-black transition-all duration-500 overflow-hidden h-full flex flex-col">
        <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
          <engagement.icon className="w-7 h-7 text-white" />
        </div>

        <h3 className="text-3xl md:text-4xl font-light tracking-tight mb-2">
          {engagement.title}
        </h3>

        <p className="text-sm text-neutral-500 font-medium tracking-wide uppercase mb-6">
          {engagement.subtitle}
        </p>

        <p className="text-base text-neutral-600 leading-relaxed font-light flex-1">
          {engagement.desc}
        </p>

        <motion.div className="absolute bottom-0 left-0 right-0 h-px bg-black scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
      </div>
    </motion.div>
  );
};

interface FormData {
  name: string;
  email: string;
  company: string;
  phoneNumber: string;
  message: string;
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <TeamSection />
      <Projects />
      <ServicesSection />
      <EngagementModels />
      <ContactSection />
    </div>
  );
}
