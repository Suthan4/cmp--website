// "use client";
// import { useState, useRef } from "react";
// import Image from "next/image";
// import { motion, useScroll, useTransform } from "framer-motion";
// import {
//   Users,
//   GitBranch,
//   ShieldCheck,
//   Zap,
//   Droplet,
//   Sparkles,
//   Package,
//   Palette,
//   PackageCheck,
//   ArrowRight,
// } from "lucide-react";
// import SplashScreen from "./splashScreen";

// const Methodoligies = () => {
//   const containerRef = useRef(null);

//   const methodologies = [
//     {
//       icon: Users,
//       title: "Agile",
//       desc: "An iterative development approach emphasizing flexibility, collaboration, and continuous improvement. It breaks projects into small cycles (sprints) to deliver working software frequently.",
//       color: "from-orange-400 via-amber-500 to-yellow-400",
//     },
//     {
//       icon: Droplet,
//       title: "Waterfall",
//       desc: "A linear, sequential design process where progress flows steadily downwards like a waterfall. Each phase must be completed and reviewed before the next phase can begin, making it suitable for projects with clear requirements.",
//       color: "from-blue-400 via-cyan-500 to-teal-400",
//     },
//     {
//       icon: Zap,
//       title: "Hybrid",
//       desc: "Combines elements of both Agile and Waterfall methodologies, leveraging the strengths of each. It offers a flexible yet structured approach, adapting to project needs and stakeholder requirements for optimal outcomes.",
//       color: "from-purple-400 via-pink-500 to-rose-400",
//     },
//   ];

//   return (
//     <section
//       ref={containerRef}
//       className="relative py-32 bg-gradient-to-b from-white to-neutral-50 overflow-hidden"
//     >
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,191,36,0.05),transparent_50%)]" />
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(249,115,22,0.05),transparent_50%)]" />

//       <div className="container mx-auto px-6 relative z-10">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-20"
//         >
//           <h2 className="text-6xl md:text-8xl font-light mb-6 tracking-tight">
//             Our{" "}
//             <span className="italic bg-gradient-to-r from-neutral-400 to-neutral-600 bg-clip-text text-transparent">
//               Methodologies
//             </span>
//           </h2>
//           <p className="text-xl text-neutral-600 max-w-2xl mx-auto font-light">
//             Cutting-edge solutions tailored to your business needs
//           </p>
//         </motion.div>

//         <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
//           {methodologies.map((method, index) => (
//             <MethodologyCard key={index} method={method} index={index} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// const MethodologyCard = ({ method, index }: any) => {
//   const ref = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start end", "end start"],
//   });

//   const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
//   const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
//   const scale = useTransform(
//     scrollYProgress,
//     [0, 0.3, 0.7, 1],
//     [0.8, 1, 1, 0.8]
//   );

//   return (
//     <motion.div
//       ref={ref}
//       style={{ y, opacity, scale }}
//       initial={{ opacity: 0, y: 60 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.8, delay: index * 0.15 }}
//       whileHover={{ y: -12, scale: 1.02 }}
//       className="group relative"
//     >
//       <div className="relative bg-white rounded-3xl p-10 border border-neutral-200 hover:border-neutral-300 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
//         <motion.div
//           className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
//         />

//         <motion.div
//           className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-20 rounded-full blur-3xl transition-opacity duration-700`}
//         />

//         <motion.div
//           whileHover={{ scale: 1.1, rotate: 5 }}
//           transition={{ type: "spring", stiffness: 400 }}
//           className={`inline-flex p-5 rounded-2xl bg-gradient-to-br ${method.color} mb-8 shadow-lg`}
//         >
//           <method.icon className="w-8 h-8 text-white" />
//         </motion.div>

//         <h3 className="text-4xl md:text-5xl font-light mb-6 tracking-tight group-hover:text-neutral-700 transition-colors">
//           {method.title}
//         </h3>

//         <p className="text-lg text-neutral-600 leading-relaxed font-light">
//           {method.desc}
//         </p>

//         <motion.div
//           className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${method.color} scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500`}
//         />
//       </div>
//     </motion.div>
//   );
// };

// const EngagementModels = () => {
//   const containerRef = useRef(null);

//   const engagements = [
//     {
//       icon: Users,
//       title: "Fixed Price Projects",
//       desc: "Ideal for projects with a clearly defined scope and requirements. This model offers predictable costs and timelines, ensuring your project is delivered within budget with no surprises.",
//       color: "from-emerald-400 via-green-500 to-teal-400",
//     },
//     {
//       icon: Droplet,
//       title: "Time & Material / Hourly Model",
//       desc: "Provides maximum flexibility for projects with evolving requirements or uncertain scope. You pay for the actual time and resources spent, allowing for agile adjustments and continuous feedback.",
//       color: "from-blue-400 via-indigo-500 to-purple-400",
//     },
//     {
//       icon: Zap,
//       title: "Dedicated Developer Model",
//       desc: "Extend your in-house team with dedicated, full-time resources. This model ensures exclusive focus on your project, deep integration with your team, and complete control over the development process.",
//       color: "from-orange-400 via-red-500 to-pink-400",
//     },
//   ];

//   return (
//     <section
//       ref={containerRef}
//       className="relative py-32 bg-gradient-to-b from-neutral-50 to-white overflow-hidden"
//     >
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.05),transparent_50%)]" />
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(168,85,247,0.05),transparent_50%)]" />

//       <div className="container mx-auto px-6 relative z-10">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-20"
//         >
//           <h2 className="text-6xl md:text-8xl font-light mb-6 tracking-tight">
//             Our{" "}
//             <span className="italic bg-gradient-to-r from-neutral-400 to-neutral-600 bg-clip-text text-transparent">
//               Engagements
//             </span>
//           </h2>
//           <p className="text-xl text-neutral-600 max-w-2xl mx-auto font-light">
//             Committed to delivering value beyond expectations
//           </p>
//         </motion.div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
//           {engagements.map((engagement, index) => (
//             <EngagementCard key={index} engagement={engagement} index={index} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// const EngagementCard = ({ engagement, index }: any) => {
//   const ref = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start end", "end start"],
//   });

//   const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
//   const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-2, 0, 2]);

//   return (
//     <motion.div
//       ref={ref}
//       style={{ y, rotate }}
//       initial={{ opacity: 0, scale: 0.9 }}
//       whileInView={{ opacity: 1, scale: 1 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.7, delay: index * 0.1 }}
//       whileHover={{ y: -16, scale: 1.03 }}
//       className="group relative"
//     >
//       <div className="relative bg-neutral-50 hover:bg-white rounded-3xl p-10 border border-neutral-200 hover:border-neutral-300 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
//         <motion.div
//           className={`absolute inset-0 bg-gradient-to-br ${engagement.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700`}
//         />

//         <motion.div
//           initial={{ opacity: 0, scale: 0 }}
//           whileHover={{ opacity: 1, scale: 1 }}
//           className="absolute top-4 right-4"
//         >
//           <Sparkles className="w-6 h-6 text-neutral-400" />
//         </motion.div>

//         <motion.div
//           whileHover={{ scale: 1.15, rotate: 10 }}
//           transition={{ type: "spring", stiffness: 400 }}
//           className={`inline-flex p-5 rounded-2xl bg-gradient-to-br ${engagement.color} mb-8 shadow-lg`}
//         >
//           <engagement.icon className="w-8 h-8 text-white" />
//         </motion.div>

//         <h3 className="text-3xl md:text-4xl font-light mb-6 tracking-tight group-hover:text-neutral-800 transition-colors">
//           {engagement.title}
//         </h3>

//         <p className="text-lg text-neutral-600 leading-relaxed font-light">
//           {engagement.desc}
//         </p>

//         <motion.div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-full opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-700" />
//       </div>
//     </motion.div>
//   );
// };

// // const Projects = () => {
// //   const projects = [
// //     {
// //       title: "Food App Development",
// //       desc: "Specializing in comprehensive mobile and web solutions for the food industry, creating intuitive and engaging platforms for ordering, delivery, and restaurant management.",
// //       icon: "🍔",
// //       gradient: "from-orange-400 via-red-500 to-pink-500",
// //     },
// //     {
// //       title: "Shopify Integrations",
// //       desc: "Seamlessly integrating Shopify with various business systems to enhance e-commerce functionality, streamline operations, and boost online sales.",
// //       icon: "🛒",
// //       gradient: "from-green-400 via-emerald-500 to-teal-500",
// //     },
// //     {
// //       title: "ServiceNow Application Development",
// //       desc: "Leveraging the ServiceNow platform to build custom applications and solutions across various domains: ITSM, IRM, SecOps, CSM, FSM. Custom applications, Integrations, SLO, ITOM, ITAM.",
// //       icon: "⚙️",
// //       gradient: "from-blue-400 via-indigo-500 to-purple-500",
// //     },
// //   ];

// //   return (
// //     <div className="max-w-7xl mx-auto py-10 px-4">
// //       <motion.div
// //         initial={{ opacity: 0, y: 30 }}
// //         whileInView={{ opacity: 1, y: 0 }}
// //         viewport={{ once: true }}
// //         transition={{ duration: 0.8 }}
// //         className="text-center mb-20"
// //       >
// //         <h2 className="text-6xl md:text-8xl font-light mb-6 tracking-tight">
// //           Projects We <span className="italic bg-gradient-to-r from-neutral-400 to-neutral-600 bg-clip-text text-transparent">Pitched</span>
// //         </h2>
// //         <p className="text-xl text-neutral-600 max-w-2xl mx-auto font-light">
// //           Solutions we've delivered for our clients
// //         </p>
// //       </motion.div>

// //       <StickyStackCards projects={projects} />
// //     </div>
// //   );
// // };

// // const StickyStackCards = ({ projects }:any) => {
// //   const [hoveredIndex, setHoveredIndex] = useState(null);

// //   return (
// //     <div className="relative space-y-8">
// //       {projects.map((project:any, i:number) => (
// //         <ProjectCard
// //           key={i}
// //           project={project}
// //           index={i}
// //           total={projects.length}
// //           hoveredIndex={hoveredIndex}
// //           setHoveredIndex={setHoveredIndex}
// //         />
// //       ))}
// //     </div>
// //   );
// // };

// // const ProjectCard = ({ project, index, total, hoveredIndex, setHoveredIndex }:any) => {
// //   const cardRef = useRef(null);
// //   const { scrollYProgress } = useScroll({
// //     target: cardRef,
// //     offset: ["start end", "end start"],
// //   });

// //   const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
// //   const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);
// //   const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);

// //   return (
// //     <motion.div
// //       ref={cardRef}
// //       style={{
// //         scale,
// //         y,
// //         opacity,
// //         top: `${index * 60}px`,
// //         zIndex: total - index,
// //       }}
// //       whileHover={{
// //         y: -20,
// //         scale: 1.02,
// //       }}
// //       onMouseEnter={() => setHoveredIndex(index)}
// //       onMouseLeave={() => setHoveredIndex(null)}
// //       transition={{ type: "spring", stiffness: 300, damping: 30 }}
// //       className="sticky top-32 rounded-3xl overflow-hidden backdrop-blur-xl border-2 border-neutral-200 hover:border-neutral-300 transition-all duration-500 bg-white shadow-xl hover:shadow-2xl cursor-pointer"
// //     >
// //       <motion.div
// //         animate={{
// //           opacity: hoveredIndex === index ? 0.1 : 0,
// //         }}
// //         transition={{ duration: 0.5 }}
// //         className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`}
// //       />

// //       <motion.div
// //         animate={{
// //           x: hoveredIndex === index ? ["-100%", "200%"] : "-100%",
// //         }}
// //         transition={{
// //           duration: 1.5,
// //           repeat: hoveredIndex === index ? Infinity : 0,
// //           ease: "easeInOut",
// //         }}
// //         className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
// //       />

// //       <div className="relative z-10 p-12 md:p-16">
// //         <div className="flex items-start justify-between mb-10">
// //           <motion.div
// //             whileHover={{ scale: 1.2, rotate: 10 }}
// //             transition={{ type: "spring", stiffness: 400 }}
// //             className="text-7xl md:text-8xl filter drop-shadow-2xl"
// //           >
// //             {project.icon}
// //           </motion.div>

// //           <motion.div
// //             animate={{
// //               background:
// //                 hoveredIndex === index
// //                   ? `linear-gradient(135deg, #fbbf24, #f97316)`
// //                   : "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
// //               color: hoveredIndex === index ? "#fff" : "#666",
// //             }}
// //             transition={{ duration: 0.4 }}
// //             className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-black border-2 border-neutral-300 backdrop-blur-md shadow-lg"
// //           >
// //             {String(index + 1).padStart(2, "0")}
// //           </motion.div>
// //         </div>

// //         <motion.h3
// //           animate={{
// //             color: hoveredIndex === index ? "#000" : "#111827",
// //           }}
// //           transition={{ duration: 0.3 }}
// //           className="text-4xl md:text-6xl font-light mb-8 leading-tight tracking-tight"
// //         >
// //           {project.title}
// //         </motion.h3>

// //         <motion.p
// //           animate={{
// //             color: hoveredIndex === index ? "#404040" : "#6b7280",
// //           }}
// //           transition={{ duration: 0.3 }}
// //           className="text-lg md:text-xl leading-relaxed font-light max-w-3xl"
// //         >
// //           {project.desc}
// //         </motion.p>

// //         <motion.div
// //           animate={{
// //             opacity: hoveredIndex === index ? 0.4 : 0,
// //             scale: hoveredIndex === index ? 1 : 0,
// //           }}
// //           transition={{ duration: 0.5 }}
// //           className={`absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br ${project.gradient} rounded-full blur-3xl`}
// //         />
// //       </div>

// //       <motion.div
// //         animate={{
// //           scaleX: hoveredIndex === index ? 1 : 0,
// //         }}
// //         transition={{ duration: 0.4 }}
// //         className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.gradient} origin-left`}
// //       />
// //     </motion.div>
// //   );
// // };

// interface IProject {
//   title: string;
//   desc: string;
//   icon: string;
//   gradient: string;
// }

// const Projects = () => {
//   const projects: IProject[] = [
//     {
//       title: "Food App Development",
//       desc: "Specializing in comprehensive mobile and web solutions for the food industry, creating intuitive and engaging platforms for ordering, delivery, and restaurant management.",
//       icon: "🍔",
//       gradient: "from-orange-400 via-red-500 to-pink-500",
//     },
//     {
//       title: "Shopify Integrations",
//       desc: "Seamlessly integrating Shopify with various business systems to enhance e-commerce functionality, streamline operations, and boost online sales.",
//       icon: "🛒",
//       gradient: "from-green-400 via-emerald-500 to-teal-500",
//     },
//     {
//       title: "ServiceNow Application Development",
//       desc: "Leveraging the ServiceNow platform to build custom applications and solutions across various domains: ITSM, IRM, SecOps, CSM, FSM. Custom applications, Integrations, SLO, ITOM, ITAM.",
//       icon: "⚙️",
//       gradient: "from-blue-400 via-indigo-500 to-purple-500",
//     },
//   ];

//   return (
//     <div className="max-w-7xl mx-auto py-20 px-4">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.8 }}
//         className="text-center mb-32"
//       >
//         <h2 className="text-6xl md:text-8xl font-light mb-6 tracking-tight">
//           Projects We{" "}
//           <span className="italic bg-gradient-to-r from-neutral-400 to-neutral-600 bg-clip-text text-transparent">
//             Pitched
//           </span>
//         </h2>
//         <p className="text-xl text-neutral-600 max-w-2xl mx-auto font-light">
//           Solutions we've delivered for our clients
//         </p>
//       </motion.div>

//       <StickyStackCards projects={projects} />
//     </div>
//   );
// };

// const StickyStackCards = ({ projects }: { projects: IProject[] }) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"],
//   });

//   return (
//     <div
//       ref={containerRef}
//       className="relative"
//       style={{ height: `${projects.length * 100}vh` }}
//     >
//       {projects.map((project, index) => {
//         const start = index / projects.length;
//         const end = (index + 1) / projects.length;

//         // Each card fades and moves up out of view in its scroll segment
//         const y = useTransform(scrollYProgress, [start, end], ["0%", "-120%"]);
//         const opacity = useTransform(scrollYProgress, [start, end], [1, 0]);

//         // initial stack offset
//         const stackOffset = 10 + index * 2; // 10vh + 2vh * index

//         return (
//           <motion.div
//             key={index}
//             style={{
//               y,
//               opacity,
//               zIndex: projects.length - index,
//             }}
//             className={`sticky flex justify-center items-center h-[80vh]`}
//           >
//             <div
//               className="w-full flex justify-center items-center"
//               style={{ top: `${stackOffset}vh`, position: "sticky" }}
//             >
//               <ProjectCard project={project} index={index} />
//             </div>
//           </motion.div>
//         );
//       })}
//     </div>
//   );
// };

// const ProjectCard = ({
//   project,
//   index,
// }: {
//   project: IProject;
//   index: number;
// }) => (
//   <div
//     className={`relative w-full max-w-4xl rounded-3xl border border-neutral-200 shadow-2xl bg-white overflow-hidden`}
//   >
//     {/* Gradient overlay */}
//     <div
//       className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-10`}
//     />

//     {/* Content */}
//     <div className="relative z-10 p-12 md:p-16">
//       <div className="flex items-start justify-between mb-8">
//         <div className="text-8xl">{project.icon}</div>
//         <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold border border-neutral-300 bg-neutral-50">
//           {String(index + 1).padStart(2, "0")}
//         </div>
//       </div>

//       <h3 className="text-4xl md:text-6xl font-light mb-6">{project.title}</h3>
//       <p className="text-lg md:text-xl text-neutral-600 leading-relaxed font-light">
//         {project.desc}
//       </p>
//     </div>
//   </div>
// );

// const TeamSection = () => {
//   const team = [
//     {
//       name: "Developers (Mobile & Web)",
//       role: "Our skilled developers build robust and scalable applications for both mobile and web platforms, leveraging the latest technologies to bring your ideas to life.",
//       icon: GitBranch,
//       gradient: "from-blue-400 via-cyan-500 to-teal-400",
//     },
//     {
//       name: "UI/UX Designers",
//       role: "Our UI/UX designers craft intuitive and engaging user experiences, focusing on user-centered design principles to ensure aesthetic appeal and seamless interaction.",
//       icon: Palette,
//       gradient: "from-purple-400 via-pink-500 to-rose-400",
//     },
//     {
//       name: "QA Engineers",
//       role: "Our meticulous QA engineers ensure the highest quality standards, meticulously testing every aspect of your product to guarantee flawless and reliable performance.",
//       icon: ShieldCheck,
//       gradient: "from-green-400 via-emerald-500 to-teal-400",
//     },
//     {
//       name: "Project Managers",
//       role: "Our experienced project managers oversee the entire development lifecycle, ensuring projects are delivered on time, within budget, and to the highest client satisfaction through effective communication and coordination.",
//       icon: Package,
//       gradient: "from-orange-400 via-amber-500 to-yellow-400",
//     },
//   ];

//   return (
//     <section className="py-32 bg-gradient-to-b from-white to-neutral-50 relative overflow-hidden">
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(139,92,246,0.05),transparent_50%)]" />
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(236,72,153,0.05),transparent_50%)]" />

//       <div className="container mx-auto px-6 relative z-10">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-20"
//         >
//           <h2 className="text-6xl md:text-8xl font-light mb-6 tracking-tight">
//             Meet Our{" "}
//             <span className="italic inline-block pr-[1px] bg-gradient-to-r from-neutral-400 to-neutral-600 bg-clip-text text-transparent">
//               Team
//             </span>
//           </h2>
//           <p className="text-xl text-neutral-600 max-w-2xl mx-auto font-light">
//             Industry experts driving innovation forward
//           </p>
//         </motion.div>

//         <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
//           {team.map((member, index) => (
//             <TeamCard key={index} member={member} index={index} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// const TeamCard = ({ member, index }: any) => {
//   const ref = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start end", "end start"],
//   });

//   const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
//   const rotate = useTransform(
//     scrollYProgress,
//     [0, 0.5, 1],
//     [index % 2 ? 2 : -2, 0, index % 2 ? -2 : 2]
//   );

//   return (
//     <motion.div
//       ref={ref}
//       style={{ y, rotate }}
//       initial={{ opacity: 0, scale: 0.9 }}
//       whileInView={{ opacity: 1, scale: 1 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.7, delay: index * 0.1 }}
//       whileHover={{ y: -16, scale: 1.02 }}
//       className="group relative"
//     >
//       <div className="relative bg-white rounded-3xl p-10 border border-neutral-200 hover:border-neutral-300 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
//         <motion.div
//           className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
//         />

//         <motion.div
//           whileHover={{ scale: 1.15, rotate: 10 }}
//           transition={{ type: "spring", stiffness: 400 }}
//           className={`inline-flex p-5 rounded-2xl bg-gradient-to-br ${member.gradient} mb-8 shadow-lg`}
//         >
//           <member.icon className="w-8 h-8 text-white" />
//         </motion.div>

//         <h3 className="text-3xl md:text-4xl font-light mb-6 tracking-tight group-hover:text-neutral-800 transition-colors">
//           {member.name}
//         </h3>

//         <p className="text-lg text-neutral-600 leading-relaxed font-light">
//           {member.role}
//         </p>

//         <motion.div
//           className={`absolute -bottom-12 -right-12 w-40 h-40 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-20 rounded-full blur-3xl transition-opacity duration-700`}
//         />
//       </div>
//     </motion.div>
//   );
// };

// const HeroSection = () => {
//   const { scrollYProgress, scrollY } = useScroll();
//   const scrollToSection = (id: string): void => {
//     document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
//   };
//   const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
//   const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
//   return (
//     <>
//       {/* Hero Section */}
//       <motion.section
//         initial={{ opacity: 1 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1 }}
//         style={{ opacity: heroOpacity, y: heroY }}
//         className="relative min-h-screen flex items-center justify-center overflow-hidden"
//       >
//         <div className="absolute z-10 container mx-auto px-6 text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 60 }}
//             animate={{ opacity: 1, y: 0 }}
//           >
//             <motion.h1
//               initial="initial"
//               className="flex items-center justify-center gap-3 font-light leading-[0.95] tracking-tight"
//             >
//               <div className="w-8 h-8  rounded-full flex items-center justify-center">
//                 <Image
//                   src="/company-logo.png" // ✅ path from public folder
//                   alt="Company Logo"
//                   width={120} // required
//                   height={120} // required
//                   priority // optional: preload for performance
//                 />{" "}
//               </div>
//               <span className="text-black font-medium hidden sm:block">
//                 SMYD Global
//               </span>
//             </motion.h1>
//           </motion.div>
//           <motion.div
//             initial={{ opacity: 0, y: 60 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{
//               duration: 1.2,
//               delay: 0.3,
//               ease: [0.22, 1, 0.36, 1],
//             }}
//             className="max-w-7xl mx-auto"
//           >
//             <h1 className="text-6xl md:text-8xl lg:text-9xl font-light m-4 leading-[0.95] tracking-tight">
//               <span className="block text-black">Transform</span>
//               <span className="block text-black">Your Business</span>
//               <span className="block text-neutral-400 italic text-6xl md:text-8xl">
//                 with Impact
//               </span>
//             </h1>

//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 1, delay: 0.8 }}
//               className="text-xl text-neutral-600 mb-10 max-w-4xl mx-auto leading-relaxed"
//             >
//               Empowering enterprises with cutting-edge artificial intelligence,
//               data analytics, and cloud solutions.
//             </motion.p>

//             <motion.div
//               className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-24"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 1, delay: 1 }}
//             >
//               <button
//                 onClick={() => scrollToSection("features")}
//                 className="relative bg-gradient-to-l from-amber-200 via-orange-400 to-amber-200 text-black rounded-full px-10 py-3 text-lg font-semibold transition-all backdrop-blur-md hover:backdrop-blur-lg overflow-hidden group"
//               >
//                 <span className="relative z-10 flex items-center">
//                   Start Your Journey
//                   <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
//                 </span>{" "}
//                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
//               </button>
//               <button
//                 onClick={() => scrollToSection("features")}
//                 className="relative border-2 border-black/40 hover:border-black/80 hover:bg-black/10 text-black rounded-full px-10 py-3 text-lg font-semibold transition-all backdrop-blur-md hover:backdrop-blur-lg overflow-hidden group"
//               >
//                 <span className="relative z-10">Explore Solutions</span>
//                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
//               </button>
//             </motion.div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1.8, duration: 1 }}
//             className="absolute bottom-8 left-1/2 -translate-x-1/2"
//           >
//             <motion.div
//               animate={{ y: [0, 12, 0] }}
//               transition={{ duration: 2, repeat: Infinity }}
//               className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2"
//             >
//               <motion.div className="w-1.5 h-2 bg-white/60 rounded-full" />
//             </motion.div>
//           </motion.div>
//         </div>
//       </motion.section>
//     </>
//   );
// };

// export default function App() {
//   const [showSplash, setShowSplash] = useState(true);

//   if (showSplash) {
//     return <SplashScreen onFinish={() => setShowSplash(false)} />;
//   }
//   return (
//     <div className="min-h-screen bg-white">
//       <HeroSection />
//       <TeamSection />
//       <Projects />
//       <Methodoligies />
//       <EngagementModels />
//     </div>
//   );
// }

"use client";

import { useRef } from "react";
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
    <section className="py-40 px-4 bg-white">
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

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <TeamSection />
      <Projects />
      <Methodologies />
      <EngagementModels />
    </div>
  );
}
