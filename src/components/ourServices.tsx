"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  Brush,
  Cpu,
  Cloud,
  FolderLock,
  Wrench,
  BarChart3,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";

interface Iservices {
  Icon: LucideIcon;
  title: string;
  desc: string;
}

const services: Iservices[] = [
  {
    Icon: Globe,
    title: "Web Development",
    desc: "Custom web applications built with modern frameworks and best practices.",
  },
  {
    Icon: Smartphone,
    title: "Mobile Development",
    desc: "Native and cross-platform mobile apps for iOS and Android.",
  },
  {
    Icon: Brush,
    title: "UI/UX Design",
    desc: "User-centered design that creates engaging digital experiences.",
  },
  {
    Icon: Cpu,
    title: "AI Solutions",
    desc: "Intelligent systems powered by machine learning and AI.",
  },
  {
    Icon: Cloud,
    title: "Cloud & DevOps",
    desc: "Scalable cloud infrastructure and migration solutions.",
  },
  {
    Icon: FolderLock,
    title: "Cybersecurity Services",
    desc: "Comprehensive security solutions to protect your assets.",
  },
  {
    Icon: Wrench,
    title: "ServiceNow",
    desc: "Enterprise service management and workflow automation.",
  },
  {
    Icon: BarChart3,
    title: "Data Science",
    desc: "Data analytics and insights to drive business decisions.",
  },
  {
    Icon: CheckCircle2,
    title: "QA Services",
    desc: "Comprehensive testing to ensure quality and reliability.",
  },
];

interface ServiceCardProps {
  service: Iservices;
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.05 }}
      className="group relative"
    >
      <div className="relative bg-white rounded-3xl p-10 border border-neutral-200 hover:border-black transition-all duration-500 overflow-hidden h-full flex flex-col min-h-[280px]">
        <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
          <service.Icon className="w-6 h-6 text-white" />
        </div>

        <h3 className="text-2xl md:text-3xl font-light tracking-tight mb-4">
          {service.title}
        </h3>

        <p className="text-base text-neutral-600 leading-relaxed font-light flex-1">
          {service.desc}
        </p>

        <motion.div className="absolute bottom-0 left-0 right-0 h-px bg-black scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
      </div>
    </motion.div>
  );
};

const ServicesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative bg-white py-32"
    >
      <div className="min-h-0 md:min-h-screen flex flex-col md:flex-row">
        {/* Left side - Sticky heading */}
        <div className="w-full md:w-1/2 md:sticky md:top-0 md:h-screen flex items-center justify-center md:justify-start px-6 md:px-12 lg:px-20 bg-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-md"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-light mb-6 tracking-[-0.02em] leading-tight">
              Services We Offer
            </h2>
            <p className="text-base md:text-lg text-neutral-500 font-light">
              Comprehensive solutions tailored to your business needs
            </p>
          </motion.div>
        </div>

        {/* Right side - Normal scrolling cards */}
        <div className="hidden md:flex w-1/2 flex-col py-20 px-6 lg:px-12 bg-neutral-50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-2xl mx-auto w-full">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile view - Full width cards */}
      <div className="md:hidden bg-white py-10 px-6">
        <div className="grid grid-cols-1 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
