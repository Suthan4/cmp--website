"use client";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Users,
  GitBranch,
  ShieldCheck,
  Zap,
  Droplet,
  Package,
  Palette,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import { AnimatedSection } from "./animatedSection";
import SplashScreen from "./splashScreen";

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
        >
          <motion.h1
            initial="initial"
            className="flex items-center justify-center gap-3 font-light leading-[0.95] tracking-tight"
          >
            <div className="w-8 h-8  rounded-full flex items-center justify-center">
              <Image
                src="/company-logo.png" // ✅ path from public folder
                alt="Company Logo"
                width={120} // required
                height={120} // required
                priority // optional: preload for performance
              />{" "}
            </div>
            <span className="text-black font-medium hidden sm:block">
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
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-light m-4 leading-[0.95] tracking-tight">
            <span className="block text-black">Transform</span>
            <span className="block text-black">Your Business</span>
            <span className="block text-neutral-400 italic text-6xl md:text-8xl">
              with Impact
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-xl text-neutral-600 mb-10 max-w-4xl mx-auto leading-relaxed"
          >
            Empowering enterprises with cutting-edge artificial intelligence,
            data analytics, and cloud solutions.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-24"
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
              </span>{" "}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>
            <button
              onClick={() => scrollToSection("engagements")}
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

const TeamSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const team = [
    {
      name: "Developers",
      subtitle: "Mobile & Web",
      role: "Building robust and scalable applications for mobile and web platforms, leveraging cutting-edge technologies to bring your ideas to life.",
      icon: GitBranch,
    },
    {
      name: "UI/UX Designers",
      subtitle: "Experience Crafters",
      role: "Crafting intuitive and engaging user experiences with a focus on user-centered design principles and aesthetic excellence.",
      icon: Palette,
    },
    {
      name: "QA Engineers",
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
  ];

  return (
    <section
      id="team"
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
            Meet Our <span className="italic text-neutral-400">Team</span>
          </h2>
          <p className="text-lg md:text-xl text-neutral-500 max-w-2xl mx-auto font-light">
            Industry experts driving innovation forward
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {team.map((member, index) => (
            <TeamCard
              key={index}
              member={member}
              index={index}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const TeamCard = ({ member, index, scrollYProgress }: any) => {
  const y = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [index % 2 === 0 ? 100 : 50, 0, index % 2 === 0 ? -50 : -100]
  );

  return (
    <motion.div
      style={{ y }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative bg-white rounded-3xl p-12 border border-neutral-200 hover:border-neutral-900 transition-all duration-500 overflow-hidden">
        <div className="flex items-start gap-6 mb-8">
          <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-black flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <member.icon className="w-7 h-7 text-white" />
          </div>

          <div>
            <h3 className="text-3xl md:text-4xl font-light tracking-tight mb-1">
              {member.name}
            </h3>
            <p className="text-sm text-neutral-500 font-medium tracking-wide uppercase">
              {member.subtitle}
            </p>
          </div>
        </div>

        <p className="text-base text-neutral-600 leading-relaxed font-light">
          {member.role}
        </p>

        <motion.div className="absolute bottom-0 left-0 right-0 h-px bg-black scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
      </div>
    </motion.div>
  );
};

interface IProject {
  title: string;
  desc: string;
  icon: string;
}

const Projects = () => {
  const projects: IProject[] = [
    {
      title: "Food App Development",
      desc: "Comprehensive mobile and web solutions for the food industry, creating intuitive platforms for ordering, delivery, and restaurant management.",
      icon: "🍔",
    },
    {
      title: "Shopify Integrations",
      desc: "Seamlessly integrating Shopify with various business systems to enhance e-commerce functionality and boost online sales.",
      icon: "🛒",
    },
    {
      title: "ServiceNow Development",
      desc: "Building custom applications and solutions across ITSM, IRM, SecOps, CSM, FSM with integrations and custom workflows.",
      icon: "⚙️",
    },
  ];

  return (
    <section id="projects" className="py-40 px-4 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-32 max-w-7xl mx-auto"
      >
        <h2 className="text-7xl md:text-9xl font-light mb-6 tracking-[-0.02em] leading-none">
          Projects We <span className="italic text-neutral-400">Delivered</span>
        </h2>
        <p className="text-lg md:text-xl text-neutral-500 max-w-2xl mx-auto font-light">
          Solutions we've crafted for our clients
        </p>
      </motion.div>

      <StickyStackCards projects={projects} />
    </section>
  );
};

const StickyStackCards = ({ projects }: { projects: IProject[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={containerRef}
      className="relative max-w-5xl mx-auto"
      style={{ height: `${projects.length * 100}vh` }}
    >
      {projects.map((project, index) => {
        const start = index / projects.length;
        const end = (index + 1) / projects.length;

        const y = useTransform(scrollYProgress, [start, end], ["0vh", "-25vh"]);
        const opacity = useTransform(
          scrollYProgress,
          [start, end - 0.15, end],
          [1, 1, 0]
        );
        const scale = useTransform(scrollYProgress, [start, end], [1, 0.95]);

        return (
          <motion.div
            key={index}
            style={{ y, opacity, scale, zIndex: projects.length - index }}
            className="sticky top-20 flex justify-center items-center min-h-screen py-10"
          >
            <ProjectCard project={project} index={index} />
          </motion.div>
        );
      })}
    </div>
  );
};

const ProjectCard = ({
  project,
  index,
}: {
  project: IProject;
  index: number;
}) => (
  <div className="w-full max-w-4xl mx-4">
    <div className="relative rounded-[2rem] border border-neutral-200 bg-white overflow-hidden group hover:border-black transition-all duration-500">
      <div className="p-16 md:p-20">
        <div className="flex items-start justify-between mb-12">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="text-7xl md:text-8xl"
          >
            {project.icon}
          </motion.div>

          <div className="text-8xl md:text-9xl font-light text-neutral-200 group-hover:text-neutral-300 transition-colors">
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>

        <h3 className="text-4xl md:text-6xl font-light mb-8 tracking-[-0.01em] leading-tight">
          {project.title}
        </h3>

        <p className="text-lg md:text-xl text-neutral-600 leading-relaxed font-light">
          {project.desc}
        </p>
      </div>

      <motion.div className="absolute bottom-0 left-0 right-0 h-1 bg-black scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
    </div>
  </div>
);

const Methodologies = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const methodologies = [
    {
      icon: Users,
      title: "Agile",
      desc: "An iterative development approach emphasizing flexibility and continuous improvement through small cycles.",
    },
    {
      icon: Droplet,
      title: "Waterfall",
      desc: "A linear, sequential process where each phase must be completed before the next begins.",
    },
    {
      icon: Zap,
      title: "Hybrid",
      desc: "Combines elements of both Agile and Waterfall, adapting to project needs for optimal outcomes.",
    },
  ];

  return (
    <section
      id="methodologies"
      ref={containerRef}
      className="relative py-40 bg-white overflow-hidden"
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
            Our <span className="italic text-neutral-400">Methodologies</span>
          </h2>
          <p className="text-lg md:text-xl text-neutral-500 max-w-2xl mx-auto font-light">
            Cutting-edge approaches tailored to your needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {methodologies.map((method, index) => (
            <MethodologyCard
              key={index}
              method={method}
              index={index}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const MethodologyCard = ({ method, index, scrollYProgress }: any) => {
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <motion.div
      style={{ y }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className="group relative"
    >
      <div className="relative bg-white rounded-3xl p-12 border border-neutral-200 hover:border-black transition-all duration-500 overflow-hidden">
        <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
          <method.icon className="w-7 h-7 text-white" />
        </div>

        <h3 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">
          {method.title}
        </h3>

        <p className="text-base text-neutral-600 leading-relaxed font-light">
          {method.desc}
        </p>

        <motion.div className="absolute bottom-0 left-0 right-0 h-px bg-black scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
      </div>
    </motion.div>
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
      className="relative py-40 bg-white overflow-hidden"
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
            Our <span className="italic text-neutral-400">Engagements</span>
          </h2>
          <p className="text-lg md:text-xl text-neutral-500 max-w-2xl mx-auto font-light">
            Committed to delivering value beyond expectations
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
      <div className="relative bg-white rounded-3xl p-12 border border-neutral-200 hover:border-black transition-all duration-500 overflow-hidden">
        <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
          <engagement.icon className="w-7 h-7 text-white" />
        </div>

        <h3 className="text-3xl md:text-4xl font-light tracking-tight mb-2">
          {engagement.title}
        </h3>

        <p className="text-sm text-neutral-500 font-medium tracking-wide uppercase mb-6">
          {engagement.subtitle}
        </p>

        <p className="text-base text-neutral-600 leading-relaxed font-light">
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
  message: string;
}
const ContactSection = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // toast.success(data.message);
        setFormData({ name: "", email: "", company: "", message: "" });
      } else {
        // toast.error(data.error || "Something went wrong");
      }
    } catch (error) {
      // toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section id="contact" className="py-32 relative bg-neutral-50">
      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-24">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-light mb-6 tracking-tight"
            >
              Let's Build{" "}
              <span className="italic text-neutral-400">Together</span>
            </motion.h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto font-light">
              Ready to transform your business? Get in touch with us today.
            </p>
          </div>
        </AnimatedSection>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white border-neutral-200 shadow-xl rounded-3xl overflow-hidden">
            <div className="p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative">
                    <label className="text-sm text-neutral-600 mb-3 block font-light tracking-wide transition-colors duration-300">
                      Name *
                    </label>
                    <input
                      required
                      value={formData.name}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-white outline-none border-2 border-neutral-300 text-black h-14 rounded-xl font-light px-4 transition-all duration-300 ease-in-out focus:border-black focus:shadow-lg focus:-translate-y-0.5"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="relative">
                    <label className="text-sm text-neutral-600 mb-3 block font-light tracking-wide transition-colors duration-300">
                      Email *
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-white border-2 border-neutral-300 text-black h-14 rounded-xl font-light px-4 transition-all duration-300 ease-in-out focus:border-black focus:shadow-lg focus:-translate-y-0.5"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="text-sm text-neutral-600 mb-3 block font-light tracking-wide transition-colors duration-300">
                    Company
                  </label>
                  <input
                    value={formData.company}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="w-full bg-white border-2 border-neutral-300 text-black h-14 rounded-xl font-light px-4 transition-all duration-300 ease-in-out focus:border-black focus:shadow-lg focus:-translate-y-0.5"
                    placeholder="Your Company Inc."
                  />
                </div>

                <div className="relative">
                  <label className="text-sm text-neutral-600 mb-3 block font-light tracking-wide transition-colors duration-300">
                    Message *
                  </label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full bg-white border-2 border-neutral-300 text-black min-h-40 rounded-xl font-light p-4 transition-all duration-300 ease-in-out focus:border-black focus:shadow-lg focus:-translate-y-0.5 resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black hover:bg-neutral-800 text-white rounded-full py-4 text-lg font-light shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 hover:-translate-y-1 active:translate-y-0"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  {!isSubmitting && (
                    <ArrowRight className="ml-2 w-5 h-5 inline transition-transform duration-300 group-hover:translate-x-1" />
                  )}
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

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
      <Methodologies />
      <EngagementModels />
      <ContactSection />
    </div>
  );
}
