import React from "react";
import { AnimatedSection } from "./animatedSection";
import { motion } from "motion/react";
import { Droplet, Users, Zap } from "lucide-react";

const EngagementModels = () => {
  return (
    <section id="features" className="py-32 relative bg-white">
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
              Our <span className="italic text-neutral-400">Engagements</span>
            </motion.h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto font-medium">
              Committed to delivering value beyond expectations
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <div className="bg-neutral-50 p-8 rounded-4xl">
            <div
              className={`inline-flex p-4 rounded-xl bg-gradient-to-br from-amber-200 via-orange-500 to-amber-200 mb-6 relative z-10`}
            >
              <Users className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl md:text-5xl font-normal mb-6 tracking-tighter">
              Fixed Price Projects
            </h2>
            <p className="text-xl md:text-xl text-neutral-500 tracking-tight">
              Ideal for projects with a clearly defined scope and requirements.
              This model offers predictable costs and timelines, ensuring your
              project is delivered within budget with no surprises.
            </p>
          </div>
          <div className="bg-neutral-50 p-8 rounded-4xl">
            <div
              className={`inline-flex p-4 rounded-xl bg-gradient-to-br from-amber-200 via-orange-500 to-amber-200 mb-6 relative z-10`}
            >
              <Droplet className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl md:text-5xl font-normal mb-6 tracking-tighter">
              Time & Material / Hourly Model
            </h2>
            <p className="text-xl md:text-xl text-neutral-500 tracking-tight">
              Provides maximum flexibility for projects with evolving
              requirements or uncertain scope. You pay for the actual time and
              resources spent, allowing for agile adjustments and continuous
              feedback.
            </p>
          </div>
          <div className="bg-neutral-50 p-8 rounded-4xl">
            <div
              className={`inline-flex p-4 rounded-xl bg-gradient-to-br from-amber-200 via-orange-500 to-amber-200 mb-6 relative z-10`}
            >
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl md:text-5xl font-normal mb-6 tracking-tighter">
              Dedicated Developer Model
            </h2>
            <p className="text-xl md:text-xl text-neutral-500 tracking-tight">
              Extend your in-house team with dedicated, full-time resources.
              This model ensures exclusive focus on your project, deep
              integration with your team, and complete control over the
              development process.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EngagementModels;
