"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import React, { useRef, useState } from "react";
import ProjectCard from "./projectCard";

const Projects = () => {

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-900"></h2>
          <p className="text-neutral-600 text-lg"></p>
          <div className="text-center mb-24">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-light mb-6 tracking-tight"
            >
              Projects We <span className="italic text-neutral-400"> Pitched</span>
            </motion.h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto font-light">
              Solutions we've delivered for our clients
            </p>
          </div>
        </motion.div>

        <StickyStackCards />
      </div>
    </>
  );
};

export default Projects;

const StickyStackCards = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const projects = [
    {
      title: "Food App Development",
      desc: "Specializing in comprehensive mobile and web solutions for the food industry, creating intuitive and engaging platforms for ordering, delivery, and restaurant management.",
      color: "bg-neutral-100",
      icon: "🍔",
      stats: [
        { label: "Projects", value: "50+" },
        { label: "Users", value: "2M+" },
        { label: "Revenue", value: "$10M+" },
      ],
    },
    {
      title: "Shopify Integrations",
      desc: "Seamlessly integrating Shopify with various business systems to enhance e-commerce functionality, streamline operations, and boost online sales.",
      color: "bg-neutral-200",
      icon: "🛒",
      stats: [
        { label: "Transactions", value: "1B+" },
        { label: "Success Rate", value: "99.9%" },
        { label: "Partners", value: "500+" },
      ],
    },
    {
      title: "ServiceNow Application Development",
      desc: "Leveraging the ServiceNow platform to build custom applications and solutions across various domains: ITSM, IRM, SecOps, CSM, FSM. Custom applications, Integrations, SLO, ITOM, ITAM.",
      color: "bg-neutral-300",
      icon: "⚙️",
      stats: [
        { label: "Components", value: "1000+" },
        { label: "Designers", value: "100+" },
        { label: "Global Reach", value: "150+" },
      ],
    },
  ];

  return (
    <div className="relative">
      {projects.map((project, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.15, duration: 0.7 }}
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="group cursor-pointer"
        >
          <ProjectCard
            project={project}
            index={i}
            total={projects.length}
            hoveredIndex={hoveredIndex}
          />
        </motion.div>
      ))}
    </div>
  );
};
