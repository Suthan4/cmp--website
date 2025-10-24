import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow: ["/"],
        disallow: ["/api/"],
        crawlDelay: 2,
      },
      {
        userAgent: ["Applebot", "Bingbot"],
        allow: ["/"],
        disallow: ["/api/"],
      },

      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://smyd.in/sitemap.xml",
  };
}
