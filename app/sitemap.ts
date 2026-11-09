import type { MetadataRoute } from "next";
import { API_BASE_URL } from "@/src/shared/config/api";
import { generateTripSlug, generateSlug } from "@/src/features/tours/utils/slugify";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://safarihurghada.net";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/trips`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/destinations`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  let tripRoutes: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${API_BASE_URL}/api/Trips?PageNumber=1&PageSize=100`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      const items = data?.data || [];
      if (Array.isArray(items)) {
        tripRoutes = items.map((trip: { id: number; name: string }) => ({
          url: `${baseUrl}/trips/${generateTripSlug(trip.id, trip.name)}`,
          lastModified: new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.9,
        }));
      }
    }
  } catch {
    // Fallback if API offline during build
  }

  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${API_BASE_URL}/api/Blogs?PageNumber=1&PageSize=100`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      const items = data?.data || [];
      if (Array.isArray(items)) {
        blogRoutes = items.map((blog: { id: number; title: string }) => ({
          url: `${baseUrl}/blogs/${generateSlug(blog.id, blog.title)}`,
          lastModified: new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.8,
        }));
      }
    }
  } catch {
    // Fallback if API offline during build
  }

  return [...staticRoutes, ...tripRoutes, ...blogRoutes];
}

