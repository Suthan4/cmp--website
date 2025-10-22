import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "./animatedSection";

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

// 2. Country code options
const countryCodes = ["+91", "+1", "+44", "+61"];

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
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

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          phoneNumber: `${data.countryCode} ${data.phoneNumber}`,
        }),
      });
      const result = await res.json();
      setIsSubmitting(false);
      if (result.success) {
        alert("Email sent successfully!");
        reset();
      } else {
        alert("Failed to send email");
      }
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      alert("Failed to send email");
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
                    <input
                      {...register("name")}
                      disabled={isSubmitting}
                      className="w-full bg-white outline-none border-2 border-neutral-300 text-black h-14 rounded-xl font-light px-4 transition-all duration-300 ease-in-out focus:border-black focus:shadow-lg disabled:cursor-not-allowed disabled:bg-gray-200 disabled:border-gray-300"
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
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

                  {/* Phone */}
                  <div className="relative flex gap-4">
                    <div>
                      <label className="text-sm text-neutral-600 mb-3 block font-light tracking-wide">
                        Code *
                      </label>
                      <select
                        {...register("countryCode")}
                        disabled={isSubmitting}
                        className="h-14 rounded-xl border-2 border-neutral-300 bg-white px-4 outline-none focus:border-black focus:shadow-lg disabled:bg-gray-200 disabled:border-gray-300 disabled:cursor-not-allowed"
                      >
                        {countryCodes.map((code) => (
                          <option key={code} value={code} disabled={code !== "+91"}>
                            {code}
                          </option>
                        ))}
                      </select>
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
                      <input
                        {...register("phoneNumber")}
                        type="number"
                        disabled={isSubmitting}
                        className="w-full no-arrows bg-white outline-none border-2 border-neutral-300 text-black h-14 rounded-xl font-light px-4 transition-all duration-300 ease-in-out focus:border-black focus:shadow-lg disabled:cursor-not-allowed disabled:bg-gray-200 disabled:border-gray-300"
                        placeholder="9901211212"
                      />
                      {errors.phoneNumber && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.phoneNumber.message}
                        </p>
                      )}
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
