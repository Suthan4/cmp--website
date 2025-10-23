/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { AnimatedSection } from "./animatedSection";
import emailjs from "@emailjs/browser";

// 1. Define Zod schema
const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  company: z.string().min(2, "Company is required"),
  countryCode: z.string().nonempty("Select country code"),
  phoneNumber: z
    .string()
    .min(10, "Enter valid phone number")
    .max(10, "Enter valid phone number"),
  message: z.string().min(5, "Message is required"),
});

type FormData = z.infer<typeof contactSchema>;

// 2. Country code options with flag images from flagcdn.com
const countryCodes = [
  {
    code: "+1",
    flag: "https://flagcdn.com/w20/us.png",
    flag2x: "https://flagcdn.com/w40/us.png",
    country: "USA",
  },
  {
    code: "+44",
    flag: "https://flagcdn.com/w20/gb.png",
    flag2x: "https://flagcdn.com/w40/gb.png",
    country: "UK",
  },
  {
    code: "+971",
    flag: "https://flagcdn.com/w20/ae.png",
    flag2x: "https://flagcdn.com/w40/ae.png",
    country: "UAE",
  },
  {
    code: "+966",
    flag: "https://flagcdn.com/w20/sa.png",
    flag2x: "https://flagcdn.com/w40/sa.png",
    country: "Saudi Arabia",
  },
  {
    code: "+974",
    flag: "https://flagcdn.com/w20/qa.png",
    flag2x: "https://flagcdn.com/w40/qa.png",
    country: "Qatar",
  },
  {
    code: "+61",
    flag: "https://flagcdn.com/w20/au.png",
    flag2x: "https://flagcdn.com/w40/au.png",
    country: "Australia",
  },
  {
    code: "+91",
    flag: "https://flagcdn.com/w20/in.png",
    flag2x: "https://flagcdn.com/w40/in.png",
    country: "India",
  },
  {
    code: "+60",
    flag: "https://flagcdn.com/w20/my.png",
    flag2x: "https://flagcdn.com/w40/my.png",
    country: "Malaysia",
  },
  {
    code: "+94",
    flag: "https://flagcdn.com/w20/lk.png",
    flag2x: "https://flagcdn.com/w40/lk.png",
    country: "Sri Lanka",
  },
];

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<FormData>({
    mode: "all",
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      countryCode: "+91",
      phoneNumber: "",
      message: "",
    },
  });
  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // EmailJS configuration
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;

      // Template params to send
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        subject: "Contact Us",
        name: data.name,
        email: data.email,
        company: data.company,
        phone: `${data.countryCode}-${data.phoneNumber}`,
        message: data.message,
        to_email: "contactus@smyd.in",
      };

      // Send email
      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-base relative bg-neutral-50">
      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-7xl font-light mb-6 tracking-tight"
            >
              Let's Build Together
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
          <div className="bg-white border border-neutral-200 shadow-xl rounded-3xl overflow-hidden">
            <div className="p-12">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Name */}
                  <div className="relative">
                    <label className="text-sm text-neutral-600 mb-3 block font-light tracking-wide">
                      Name *
                    </label>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field: { value, onChange, ...field } }) => (
                        <>
                          <input
                            {...field}
                            type="text"
                            placeholder="John Doe"
                            value={value}
                            disabled={isSubmitting}
                            onChange={(e) => {
                              const cleaned = e.target.value.replace(
                                /[^A-Za-z\s]/g,
                                ""
                              );
                              onChange(cleaned);
                            }}
                            className="w-full no-arrows bg-white outline-none border-2 border-neutral-300 text-black h-14 rounded-xl font-light px-4 transition-all duration-300 ease-in-out focus:border-black focus:shadow-lg disabled:cursor-not-allowed disabled:bg-gray-200 disabled:border-gray-300"
                          />
                          {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.name.message}
                            </p>
                          )}
                        </>
                      )}
                    />
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <label className="text-sm text-neutral-600 mb-3 block font-light tracking-wide">
                      Email *
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      disabled={isSubmitting}
                      className="w-full bg-white outline-none border-2 border-neutral-300 text-black h-14 rounded-xl font-light px-4 transition-all duration-300 ease-in-out focus:border-black focus:shadow-lg disabled:cursor-not-allowed disabled:bg-gray-200 disabled:border-gray-300"
                      placeholder="john@company.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Company */}
                  <div className="relative">
                    <label className="text-sm text-neutral-600 mb-3 block font-light tracking-wide">
                      Company *
                    </label>
                    <input
                      {...register("company")}
                      disabled={isSubmitting}
                      className="w-full bg-white outline-none border-2 border-neutral-300 text-black h-14 rounded-xl font-light px-4 transition-all duration-300 ease-in-out focus:border-black focus:shadow-lg disabled:cursor-not-allowed disabled:bg-gray-200 disabled:border-gray-300"
                      placeholder="Your Company Inc."
                    />
                    {errors.company && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.company.message}
                      </p>
                    )}
                  </div>

                  {/* Phone with Flag Image */}
                  <div className="relative flex gap-4">
                    <div>
                      <label className="text-sm text-neutral-600 mb-3 block font-light tracking-wide">
                        Code *
                      </label>
                      <Controller
                        name="countryCode"
                        control={control}
                        render={({ field }) => {
                          const selected =
                            countryCodes.find((c) => c.code === field.value) ||
                            countryCodes[0];

                          return (
                            <div className="relative w-28" ref={dropdownRef}>
                              <button
                                type="button"
                                disabled={isSubmitting}
                                onClick={() => setOpen(!open)}
                                className="w-full h-14 flex items-center justify-between px-3 rounded-xl border-2 border-neutral-300 bg-white focus:border-black focus:shadow-lg disabled:bg-gray-200 disabled:cursor-not-allowed"
                              >
                                <div className="flex items-center gap-2">
                                  <img
                                    src={selected.flag}
                                    alt={selected.country}
                                    className="w-6 h-4 rounded-sm"
                                  />
                                  <span>{selected.code}</span>
                                </div>
                                <span
                                  className={`transition-transform ${
                                    open ? "rotate-180" : ""
                                  }`}
                                >
                                  <ChevronDown />
                                </span>
                              </button>

                              {open && (
                                <ul className="absolute z-10 w-full mt-1 bg-white border border-neutral-300 rounded-xl shadow-lg max-h-60 overflow-auto">
                                  {countryCodes.map((item) => (
                                    <li
                                      key={item.code}
                                      onClick={() => {
                                        field.onChange(item.code);
                                        setOpen(false);
                                      }}
                                      className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-neutral-100"
                                    >
                                      <img
                                        src={item.flag}
                                        alt={item.country}
                                        className="w-6 h-4 rounded-sm"
                                      />
                                      <span>{item.code}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          );
                        }}
                      />
                      {errors.countryCode && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.countryCode.message}
                        </p>
                      )}
                    </div>

                    <div className="flex-1">
                      <label className="text-sm text-neutral-600 mb-3 block font-light tracking-wide">
                        Phone Number *
                      </label>
                      <Controller
                        name="phoneNumber"
                        control={control}
                        render={({ field: { value, onChange, ...field } }) => (
                          <>
                            <input
                              {...field}
                              type="text"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              placeholder="Enter 10-digit number"
                              maxLength={10}
                              value={value}
                              disabled={isSubmitting}
                              onChange={(e) => {
                                const cleaned = e.target.value
                                  .replace(/\D/g, "")
                                  .slice(0, 10);
                                onChange(cleaned);
                              }}
                              className="w-full no-arrows bg-white outline-none border-2 border-neutral-300 text-black h-14 rounded-xl font-light px-4 transition-all duration-300 ease-in-out focus:border-black focus:shadow-lg disabled:cursor-not-allowed disabled:bg-gray-200 disabled:border-gray-300"
                            />
                            {errors.phoneNumber && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.phoneNumber.message}
                              </p>
                            )}
                          </>
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="relative">
                  <label className="text-sm text-neutral-600 mb-3 block font-light tracking-wide">
                    Message *
                  </label>
                  <textarea
                    {...register("message")}
                    disabled={isSubmitting}
                    rows={5}
                    className="w-full bg-white outline-none border-2 border-neutral-300 text-black rounded-xl font-light px-4 py-3 transition-all duration-300 ease-in-out focus:border-black focus:shadow-lg disabled:cursor-not-allowed disabled:bg-gray-200 disabled:border-gray-300 resize-none"
                    placeholder="Tell us about your project..."
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black hover:bg-neutral-800 text-white rounded-full py-4 text-lg font-light shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 hover:-translate-y-1 active:translate-y-0 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  {!isSubmitting && <ArrowRight className="w-5 h-5 inline" />}
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
