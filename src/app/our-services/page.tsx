"use client";
import {
  BarChart3,
  Brush,
  CheckCircle2,
  ClipboardCheck,
  Cloud,
  Cpu,
  Database,
  FolderLock,
  Globe,
  Monitor,
  Settings,
  Smartphone,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import React, { ElementType, useRef } from "react";
interface Iservices {
  Icon: LucideIcon;
  title: string;
  desc: string;
}
interface ITechnologies {
  Icon: LucideIcon;
  title: string;
  items: string[];
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
    title: "Cloud Services",
    desc: "Scalable cloud infrastructure and migration solutions.",
  },
  {
    Icon: FolderLock,
    title: "Cybersecurity Services",
    desc: "Comprehensive security solutions to protect your assets.",
  },
  {
    Icon: Wrench,
    title: "ServiceNow Services",
    desc: "Enterprise service management and workflow automation.",
  },
  {
    Icon: BarChart3,
    title: "Data Science Services",
    desc: "Data analytics and insights to drive business decisions.",
  },
  {
    Icon: CheckCircle2,
    title: "QA Services",
    desc: "Comprehensive testing to ensure quality and reliability.",
  },
];
const technologies: ITechnologies[] = [
  {
    Icon: Monitor,
    title: "Frontend",
    items: ["React", "Angular", "Next.js", "Flutter"],
  },
  {
    Icon: Database,
    title: "Backend",
    items: ["Node.js", "Python", "Java", ".NET"],
  },
  {
    Icon: Database,
    title: "Database",
    items: ["MySQL", "MongoDB", "PostgreSQL"],
  },
  {
    Icon: Cloud,
    title: "Cloud",
    items: ["AWS", "Azure", "Google Cloud"],
  },
  {
    Icon: Settings,
    title: "Automation",
    items: ["Playwright", "Postman", "GitHub Actions"],
  },
  {
    Icon: ClipboardCheck,
    title: "Project Management",
    items: ["JIRA"],
  },
];
const ServicesSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      id="services"
      ref={containerRef}
      className="py-40 bg-white relative overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-32"
        >
          <h2 className="text-7xl md:text-9xl font-light mb-6 tracking-[-0.02em] leading-none">
            Services We <span className="italic text-neutral-400">Offer</span>
          </h2>
          <p className="text-lg md:text-xl text-neutral-500 max-w-2xl mx-auto font-light">
            Comprehensive solutions tailored to your business needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {services.map((service: any, index: number) => {
            return (
              <ServiceCard
                key={index}
                service={service}
                index={index}
                scrollYProgress={scrollYProgress}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
interface ServiceCardProps {
  service: Iservices;
  index: number;
  scrollYProgress: MotionValue<number>;
}
const ServiceCard = ({ service, index, scrollYProgress }: ServiceCardProps) => {
  const y = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      index % 3 === 0 ? 80 : index % 3 === 1 ? 40 : 60,
      0,
      index % 3 === 0 ? -40 : index % 3 === 1 ? -80 : -60,
    ]
  );
  console.log("service.Icon:", service.Icon);

  return (
    <motion.div
      style={{ y }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.05 }}
      className="group relative"
    >
      <div className="relative bg-white rounded-3xl p-10 border border-neutral-200 hover:border-black transition-all duration-500 overflow-hidden h-full">
        <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <service.Icon className="w-6 h-6 text-white" />
        </div>

        <h3 className="text-2xl md:text-3xl font-light tracking-tight mb-4">
          {service.title}
        </h3>

        <p className="text-sm text-neutral-600 leading-relaxed font-light">
          {service.desc}
        </p>

        <motion.div className="absolute bottom-0 left-0 right-0 h-px bg-black scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
      </div>
    </motion.div>
  );
};

const TechnologySection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={containerRef}
      className="py-40 bg-white relative overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-32"
        >
          <h2 className="text-7xl md:text-9xl font-light mb-6 tracking-[-0.02em] leading-none">
            Our Technology{" "}
            <span className="italic text-neutral-400">Stacks</span>
          </h2>
          <p className="text-lg md:text-xl text-neutral-500 max-w-2xl mx-auto font-light">
            Cutting-edge technologies powering innovative solutions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {technologies.map((tech, index) => (
            <TechnologyCard
              key={index}
              tech={tech}
              index={index}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface TechnologyCardProps {
  tech: ITechnologies;
  index: number;
  scrollYProgress: MotionValue<number>;
}
const TechnologyCard = ({
  tech,
  index,
  scrollYProgress,
}: TechnologyCardProps) => {
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [index % 2 === 0 ? 60 : 80, index % 2 === 0 ? -80 : -60]
  );

  return (
    <motion.div
      style={{ y }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative bg-white rounded-3xl p-10 border border-neutral-200 hover:border-black transition-all duration-500 overflow-hidden">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <tech.Icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-3xl md:text-4xl font-light tracking-tight">
            {tech.title}
          </h3>
        </div>

        <p className="text-base text-neutral-600 leading-relaxed font-light">
          {tech.items.join(", ")}
        </p>

        <motion.div className="absolute bottom-0 left-0 right-0 h-px bg-black scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
      </div>
    </motion.div>
  );
};

export default function OurServicesPage() {
  return (
    <>
      <ServicesSection />
      <TechnologySection />
    </>
  );
}
