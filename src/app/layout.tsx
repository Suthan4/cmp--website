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
  metadataBase: new URL("https://domain.com"),
  title: {
    default: "Business Name | What you do",
    template: "", // creates apge name  | Your business Name
  },
  description: "Your compelling business description with keywords",
  keywords: [
    "primary service + location",
    "secondary service + location",
    "industry keywords",
    "local keywords",
  ],
  authors: [{ name: "Your Business Name" }],
  creator: "Your Business Name",
  publisher: "Your Business Name",
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
    url: "https://domain.com",
    title: "Your business - Peofessional Service",
    description: "Engaging description for social media sharing",
    images: [
      {
        url: "/hero-image.jpg",
        width: 1200,
        height: 630,
        alt: "Descriptive alt text for your main image",
      },
    ],
    siteName: "Your Business Name",
  },
  twitter: {
    card: "summary_large_image",
    title: "You Business - Professional service",
    description: "Engaging description for Twitter sharing",
    images: ["/hero-image.jpg"],
  },
  alternates: {
    canonical: "https://somain.com",
  },
  other: {
    "theme-color": "#your-brand-color",
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
