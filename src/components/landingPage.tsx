"use client";

import { useState, useEffect, useRef, FormEvent, ChangeEvent, ReactNode, ElementType } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  useAnimation,
  Variants,
} from "framer-motion";
import {
  Brain,
  Cloud,
  BarChart3,
  ArrowRight,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Globe,
  Layers,
  LucideIcon,
  Twitter,
  Linkedin,
  Mail,
  Users,
  GitBranch,
  HandPlatter,
  ShieldCheck,
  PackageCheck,
} from "lucide-react";
import SplashScreen from "./splashScreen";
import Projects from "./projects";
import { AnimatedSection } from "./animatedSection";
import Methodoligies from "./methodoligies";
import EngagementModels from "./engagementModels";
import Image from "next/image";

// import { toast } from "sonner";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
}

interface TeamMember {
  name: string;
  role: string;
  icon: ElementType;
}

interface Testimonial {
  quote: string;
  author: string;
  position: string;
}

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

const features: Feature[] = [
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description:
      "Harness the power of artificial intelligence to transform your business operations and decision-making processes.",
    image:
      "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?crop=entropy&cs=srgb&fm=jpg&q=85",
  },
  {
    icon: BarChart3,
    title: "Data Analytics",
    description:
      "Turn raw data into actionable insights with our advanced analytics solutions and predictive modeling.",
    image:
      "https://images.unsplash.com/photo-1617791160536-598cf32026fb?crop=entropy&cs=srgb&fm=jpg&q=85",
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description:
      "Scale effortlessly with our cloud infrastructure solutions designed for the modern enterprise.",
    image:
      "https://images.unsplash.com/photo-1655993810480-c15dccf9b3a0?crop=entropy&cs=srgb&fm=jpg&q=85",
  },
];

const team: TeamMember[] = [
  {
    name: " Developers (Mobile & Web)",
    role: "Our skilled developers build robust and scalable applications for both mobile and web platforms, leveraging the latest technologies to bring your ideas to life.",
    icon: GitBranch,
  },
  {
    name: "UI/UX Designers",
    role: "Our UI/UX designers craft intuitive and engaging user experiences, focusing on user-centered design principles to ensure aesthetic appeal and seamless interaction.",
    icon: HandPlatter
  },
  {
    name: "QA Engineers",
    role: "Our meticulous QA engineers ensure the highest quality standards, meticulously testing every aspect of your product to guarantee flawless and reliable performance.",
    icon: ShieldCheck
  },
  {
    name: "Project Managers",
    role: "Our experienced project managers oversee the entire development lifecycle, ensuring projects are delivered on time, within budget, and to the highest client satisfaction through effective communication and coordination.",
    icon: PackageCheck,
  },
];

const testimonials: Testimonial[] = [
  {
    quote:
      "SMYD Global transformed our data infrastructure. Their AI solutions increased our operational efficiency by 45%.",
    author: "John Martinez",
    position: "CEO, TechFlow Inc.",
  },
  {
    quote:
      "The team's expertise in machine learning helped us predict customer behavior with unprecedented accuracy.",
    author: "Lisa Thompson",
    position: "VP of Analytics, DataCorp",
  },
  {
    quote:
      "Outstanding cloud migration support. We reduced costs by 30% while improving performance significantly.",
    author: "David Park",
    position: "CTO, CloudBase Systems",
  },
];

export default function LandingPage() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTestimonial, setActiveTestimonial] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  const { scrollYProgress, scrollY } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 100]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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

  const scrollToSection = (id: string): void => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }
  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      {/* Hero Section */}
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
                onClick={() => scrollToSection("features")}
                className="relative bg-gradient-to-l from-amber-200 via-orange-400 to-amber-200 text-black rounded-full px-10 py-3 text-lg font-semibold transition-all backdrop-blur-md hover:backdrop-blur-lg overflow-hidden group"
              >
                <span className="relative z-10 flex items-center">
                  Start Your Journey
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>{" "}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>
              <button
                onClick={() => scrollToSection("features")}
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

      {/* Features Section */}
      {/* <section id="features" className="py-32 relative bg-white">
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
                Our <span className="italic text-neutral-400">Expertise</span>
              </motion.h2>
              <p className="text-xl text-neutral-600 max-w-2xl mx-auto font-medium">
                Cutting-edge solutions tailored to your business needs
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <Featurediv key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section> */}

      {/* Team Section */}
      <section
        id="team"
        className="py-32 bg-neutral-50 relative overflow-hidden"
      >
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
                Meet Our <span className="italic text-neutral-400">Team</span>
              </motion.h2>
              <p className="text-xl text-neutral-600 max-w-2xl mx-auto font-light">
                Industry experts driving innovation forward
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {team.map((member, index) => (
              <Teamdiv key={index} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-white">
        <Projects />
      </section>

      {/* Testimonials Section */}
      {/* <section id="testimonials" className="py-32 relative bg-white">
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
                Client{" "}
                <span className="italic text-neutral-400">Success Stories</span>
              </motion.h2>
              <p className="text-xl text-neutral-600 max-w-2xl mx-auto font-light">
                Trusted by leading companies worldwide
              </p>
            </div>
          </AnimatedSection>

          <div className="max-w-5xl mx-auto relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="bg-neutral-50 border border-neutral-200 rounded-3xl p-16 backdrop-blur-sm"
              >
                <div className="text-8xl text-neutral-300 mb-8 font-serif">
                  "
                </div>
                <p className="text-2xl md:text-3xl text-neutral-700 mb-12 leading-relaxed font-light">
                  {testimonials[activeTestimonial].quote}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-neutral-800 to-neutral-600 rounded-full" />
                  <div>
                    <p className="font-medium text-black text-lg">
                      {testimonials[activeTestimonial].author}
                    </p>
                    <p className="text-neutral-500 text-sm font-light">
                      {testimonials[activeTestimonial].position}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-2 mt-10">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === activeTestimonial
                      ? "w-10 bg-black"
                      : "w-2 bg-neutral-300 hover:bg-neutral-400"
                  }`}
                />
              ))}
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() =>
                  setActiveTestimonial(
                    (prev) =>
                      (prev - 1 + testimonials.length) % testimonials.length
                  )
                }
                className="rounded-full border-2 border-black hover:bg-black hover:text-white text-black w-10 h-10 flex items-center justify-center transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() =>
                  setActiveTestimonial(
                    (prev) => (prev + 1) % testimonials.length
                  )
                }
                className="rounded-full border-2 border-black hover:bg-black hover:text-white text-black w-10 h-10 flex items-center justify-center transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section> */}

      {/* Methodoligies */}
      <Methodoligies />
      {/* Engagements */}
      <EngagementModels />
      {/* Contact Section */}
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
    </div>
  );
}

interface FeaturedivProps {
  feature: Feature;
  index: number;
}

function Featurediv({ feature, index }: FeaturedivProps) {
  const Icon = feature.icon;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
        whileHover={{ y: -8, scale: 1.01 }}
        transition={{ duration: 0.3 }}
        className="group relative h-full"
      >
        <div className="bg-white border-neutral-200 hover:border-neutral-300 hover:shadow-2xl transition-all duration-500 overflow-hidden h-full rounded-3xl">
          <div className="p-0">
            <div className="relative h-72 overflow-hidden bg-neutral-100">
              <motion.img
                src={feature.image}
                alt={feature.title}
                className="w-full h-full object-cover  group-hover: transition-all duration-700"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.7 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent opacity-60" />
              <div className="absolute bottom-6 left-6">
                <div className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-neutral-200 shadow-lg">
                  <Icon className="w-7 h-7 text-black" />
                </div>
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-light mb-4 group-hover:text-neutral-600 transition-colors tracking-tight">
                {feature.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed font-light">
                {feature.description}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

interface TeamdivProps {
  member: TeamMember;
  index: number;
}

function Teamdiv({ member, index }: TeamdivProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={
        isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
      }
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
        whileHover={{ y: -12 }}
        transition={{ duration: 0.3 }}
        className="group relative"
      >
        <div className="bg-white border-neutral-200 hover:border-neutral-300 hover:shadow-xl transition-all duration-500 overflow-hidden rounded-3xl">
          <div className="p-4">
            <div
              className={`inline-flex p-4 rounded-xl bg-gradient-to-br from-amber-200 via-orange-500 to-amber-200 mb-6 relative z-10`}
            >
              <member.icon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl md:text-5xl font-light mb-6 tracking-tighter">
              {member.name}
            </h2>

            <p className="text-xl md:text-xl text-neutral-500 tracking-tight">
              {member.role}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
