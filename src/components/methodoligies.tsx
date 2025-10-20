"use client";
import React from "react";
import { AnimatedSection } from "./animatedSection";
import { motion } from "motion/react";
import { Zap, Users, Droplet, Target } from "lucide-react";

const Methodoligies = () => {
  return (
    <>
      <section id="features" className="py-32 relative bg-neutral-50">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-24">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl font-light mb-6 tracking-tight"
              >
                Our{" "}
                <span className="italic text-neutral-400">Methodoligies</span>
              </motion.h2>
              <p className="text-xl text-neutral-600 max-w-2xl mx-auto font-medium">
                Cutting-edge solutions tailored to your business needs
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <div className="bg-white p-8 rounded-4xl">
              <div
                className={`inline-flex p-4 rounded-xl bg-gradient-to-br from-amber-200 via-orange-500 to-amber-200 mb-6 relative z-10`}
              >
                <Users className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl md:text-5xl font-normal mb-6 tracking-tighter">
                Agile
              </h2>
              <p className="text-xl md:text-xl text-neutral-500 tracking-tight">
                An iterative development approach emphasizing flexibility,
                collaboration, and continuous improvement. It breaks projects
                into small cycles (sprints) to deliver working software
                frequently.
              </p>
            </div>
            <div className="bg-white p-8 rounded-4xl">
              <div
                className={`inline-flex p-4 rounded-xl bg-gradient-to-br from-amber-200 via-orange-500 to-amber-200 mb-6 relative z-10`}
              >
                <Droplet className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl md:text-5xl font-normal mb-6 tracking-tighter">
                Waterfall
              </h2>
              <p className="text-xl md:text-xl text-neutral-500 tracking-tight">
                A linear, sequential design process where progress flows
                steadily downwards like a waterfall. Each phase must be
                completed and reviewed before the next phase can begin, making
                it suitable for projects with clear requirements.
              </p>
            </div>
            <div className="bg-white p-8 rounded-4xl">
              <div
                className={`inline-flex p-4 rounded-xl bg-gradient-to-br from-amber-200 via-orange-500 to-amber-200 mb-6 relative z-10`}
              >
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl md:text-5xl font-normal mb-6 tracking-tighter">
                Hybrid
              </h2>
              <p className="text-xl md:text-xl text-neutral-500 tracking-tight">
                Combines elements of both Agile and Waterfall methodologies,
                leveraging the strengths of each. It offers a flexible yet
                structured approach, adapting to project needs and stakeholder
                requirements for optimal outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>{" "}
    </>
  );
};

export default Methodoligies;
