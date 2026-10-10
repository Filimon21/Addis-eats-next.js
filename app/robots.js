const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/+$/, "");

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/menu"],
      disallow: [
        "/orders",
        "/checkout",
        "/kitchen",
        "/signin",
        "/api/",
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}