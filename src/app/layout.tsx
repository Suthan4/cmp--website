import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppScafold from "@/components/appScafold";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.smyd.in"),
  title: {
    default: "SMYD Global | IT Services",
    template: "SMYD Global",
  },
  description:
    "SMYD Global delivers innovative IT services and digital solutions designed to help businesses streamline operations, enhance security, and accelerate growth in a connected world.",
  keywords: [
    "IT services in India",
    "software development company in India",
    "digital transformation services",
    "cloud solutions provider",
    "cybersecurity and data protection",
    "AI and automation consulting",
    "web and mobile app development",
    "enterprise IT solutions",
    "managed IT support",
    "technology consulting company",
  ],
  authors: [{ name: "SMYD Global" }],
  creator: "Hari suthan",
  publisher: "Hari suthan",
  robots: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "www.smyd.in",
    title: "SMYD Global - IT Service",
    description:
      "SMYD Global delivers innovative IT services and digital solutions designed to help businesses streamline operations, enhance security, and accelerate growth in a connected world.",
    images: [
      {
        url: "/company-logo.png",
        width: 1200,
        height: 630,
        alt: "SMYD Global",
      },
    ],
    siteName: "SMYPD Global",
  },
  twitter: {
    card: "summary_large_image",
    title: "SMYD - IT service",
    description: "Engaging description for Twitter sharing",
    images: ["/company-logo.png"],
  },
  alternates: {
    canonical: "www.smyd.in",
  },
  other: {
    "theme-color": "Black",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${inter.className} antialiased`}>
        <AppScafold>{children}</AppScafold>
      </body>
    </html>
  );
}
