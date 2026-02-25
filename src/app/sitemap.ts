import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";
import { categoryOrder, areaRegions } from "@/lib/crafts";
import { stories } from "@/data/stories";
import { artists } from "@/data/artists";
import { shops } from "@/data/shops";
import { seasonalFeatures } from "@/data/seasonal";
import { regions } from "@/data/regions";
import { SITE_URL } from "@/lib/metadata";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/philosophy`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/stories`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/events`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/craftspeople`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/seasonal`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/search`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/favorites`, lastModified: now, changeFrequency: "monthly", priority: 0.2 },
  ];

  // Crafts from Supabase
  const { data: crafts } = await supabase.from("crafts").select("id");
  const craftPages: MetadataRoute.Sitemap = (crafts ?? []).map((c) => ({
    url: `${SITE_URL}/crafts/${c.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = categoryOrder.map((name) => ({
    url: `${SITE_URL}/category/${encodeURIComponent(name)}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Area pages
  const areaPages: MetadataRoute.Sitemap = areaRegions.map((r) => ({
    url: `${SITE_URL}/area/${r.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Stories
  const storyPages: MetadataRoute.Sitemap = stories.map((s) => ({
    url: `${SITE_URL}/stories/${s.slug}`,
    lastModified: s.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Artists
  const artistPages: MetadataRoute.Sitemap = artists.map((a) => ({
    url: `${SITE_URL}/artists/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Shops
  const shopPages: MetadataRoute.Sitemap = shops.map((s) => ({
    url: `${SITE_URL}/shops/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Seasonal
  const seasonalPages: MetadataRoute.Sitemap = seasonalFeatures.map((f) => ({
    url: `${SITE_URL}/seasonal/${f.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Regions
  const regionPages: MetadataRoute.Sitemap = regions.map((r) => ({
    url: `${SITE_URL}/regions/${r.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...craftPages,
    ...categoryPages,
    ...areaPages,
    ...storyPages,
    ...artistPages,
    ...shopPages,
    ...seasonalPages,
    ...regionPages,
  ];
}
