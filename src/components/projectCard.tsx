"use client";

import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

interface IProject {
  title: string;
  desc: string;
  color: string;
  icon: string;
  stats: {
    label: string;
    value: string;
  }[];
}

interface ProjectCard {
  project: IProject;
  index: number;
  total: number;
  hoveredIndex: number | null;
}

const ProjectCard = ({ project, index, total, hoveredIndex }: ProjectCard) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);

  const rotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [index * 1.5, 0, -index * 1.5]
  );

  return (
    <motion.div
      ref={cardRef}
      whileHover={{
        y: -12,
        boxShadow: "0 60px 120px rgba(217, 119, 6, 0.3)",
      }}
      style={{
        scale,
        y,
        rotate,
        top: `${index * 40}px`,
        zIndex: total - index,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="sticky top-32 mb-8 rounded-3xl overflow-hidden backdrop-blur-xl border border-gray-200 hover:border-amber-400 transition-all duration-500 bg-white shadow-lg hover:shadow-2xl"
    >
      {/* Gradient Background Overlay */}
      <motion.div
        animate={{
          opacity: hoveredIndex === index ? 1 : 0,
        }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-gradient-to-br from-amber-200 via-orange-500 to-amber-100"
      />

      {/* White Content Layer */}
      <motion.div
        animate={{
          opacity: hoveredIndex === index ? 0.95 : 1,
        }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-white"
      />

      {/* Animated Shine Effect */}
      <motion.div
        animate={{
          background:
            hoveredIndex === index
              ? [
                  "linear-gradient(90deg, transparent 0%, rgba(217, 119, 6, 0.1) 50%, transparent 100%)",
                  "linear-gradient(90deg, transparent 20%, rgba(217, 119, 6, 0.1) 70%, transparent 100%)",
                  "linear-gradient(90deg, transparent 40%, rgba(217, 119, 6, 0.1) 90%, transparent 100%)",
                ]
              : "linear-gradient(90deg, transparent 0%, transparent 100%)",
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute inset-0"
      />

      {/* Content */}
      <div className="relative z-20 p-10 md:p-16">
        {/* Top Section */}
        <div className="flex items-start justify-between mb-10">
          <motion.div
            whileHover={{ scale: 1.15, rotate: 10 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="text-7xl md:text-8xl filter drop-shadow-lg"
          >
            {project.icon}
          </motion.div>

          {/* Number Badge */}
          <motion.div
            animate={{
              background:
                hoveredIndex === index
                  ? "linear-gradient(135deg, #fbbf24 0%, #f97316 100%)"
                  : "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
              color: hoveredIndex === index ? "#000" : "#666",
              boxShadow:
                hoveredIndex === index
                  ? "0 20px 40px rgba(217, 119, 6, 0.3)"
                  : "0 10px 30px rgba(0, 0, 0, 0.1)",
            }}
            transition={{ duration: 0.3 }}
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black border-2 border-gray-300 backdrop-blur-md"
          >
            {String(index + 1).padStart(2, "0")}
          </motion.div>
        </div>

        {/* Title */}
        <motion.h3
          animate={{
            color: hoveredIndex === index ? "#7c2d12" : "#111827",
          }}
          transition={{ duration: 0.3 }}
          className="text-4xl md:text-5xl text-black mb-6 leading-tight"
        >
          {project.title}
        </motion.h3>

        {/* Description */}
        <motion.p
          animate={{
            color: hoveredIndex === index ? "#92400e" : "#4b5563",
          }}
          transition={{ duration: 0.3 }}
          className="text-lg md:text-xl leading-relaxed mb-10 font-medium text-neutral-400 max-w-3xl"
        >
          {project.desc}
        </motion.p>

        {/* Stats Grid */}
        {/* <div className="grid grid-cols-3 gap-4 md:gap-6 mb-10">
          {project.stats.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -4 }}
              className={`rounded-2xl p-4 md:p-6 border-2 transition-all ${
                hoveredIndex === index
                  ? "bg-gradient-to-br from-amber-100 to-orange-100 border-orange-300 shadow-lg"
                  : "bg-gray-50 border-gray-200 hover:bg-gray-100"
              }`}
            >
              <div
                className={`text-2xl md:text-3xl font-black ${
                  hoveredIndex === index ? "text-orange-600" : "text-gray-900"
                }`}
              >
                {stat.value}
              </div>
              <div
                className={`text-xs md:text-sm font-semibold mt-2 uppercase tracking-wider ${
                  hoveredIndex === index ? "text-orange-700" : "text-gray-600"
                }`}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div> */}

        {/* Bottom Section */}
        {/* <div className="flex items-center justify-between flex-wrap gap-6">
          <motion.button
            whileHover={{ scale: 1.05, gap: "16px" }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-4 rounded-xl font-bold text-lg inline-flex items-center gap-3 transition-all border-2 ${
              hoveredIndex === index
                ? "bg-gradient-to-r from-amber-200 via-orange-500 to-amber-100 text-gray-900 border-transparent shadow-xl hover:shadow-2xl"
                : "bg-white text-gray-900 border-gray-300 hover:border-orange-400 hover:bg-orange-50"
            }`}
          >
            Learn More
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          <motion.div
            animate={{
              background:
                hoveredIndex === index
                  ? "linear-gradient(135deg, #fbbf24 0%, #f97316 100%)"
                  : "rgba(243, 244, 246, 1)",
              boxShadow:
                hoveredIndex === index
                  ? "0 20px 40px rgba(217, 119, 6, 0.2)"
                  : "0 10px 25px rgba(0, 0, 0, 0.05)",
            }}
            transition={{ duration: 0.3 }}
            className="px-6 py-3 rounded-full border-2 border-gray-200 flex items-center gap-2 font-semibold"
          >
            <motion.span
              animate={{
                scale: hoveredIndex === index ? [1, 1.3, 1] : 1,
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className={
                hoveredIndex === index ? "text-gray-900" : "text-orange-500"
              }
            >
              ●
            </motion.span>
            <span
              className={
                hoveredIndex === index ? "text-gray-900" : "text-gray-700"
              }
            >
              Live
            </span>
          </motion.div>
        </div> */}
      </div>

      {/* Top Border Accent */}
      <motion.div
        animate={{
          scaleX: hoveredIndex === index ? 1 : 0,
          background:
            hoveredIndex === index
              ? "linear-gradient(90deg, #fbbf24 0%, #f97316 50%, #fed7aa 100%)"
              : "rgba(217, 119, 6, 0)",
        }}
        transition={{ duration: 0.4 }}
        className="absolute top-0 left-0 right-0 h-2 origin-left"
      />

      {/* Corner Accent */}
      <motion.div
        animate={{
          opacity: hoveredIndex === index ? 0.3 : 0,
        }}
        className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-amber-200 via-orange-500 to-amber-100 rounded-full blur-3xl"
      />
    </motion.div>
  );
};

export default ProjectCard;
