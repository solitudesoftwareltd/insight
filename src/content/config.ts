import { defineCollection, z } from "astro:content";

const site = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    url: z
      .string()
      .regex(/^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/[^\s]*)?$/)
      .optional(),
    cover: z.string().optional(),
    logo: z.string().optional(),
  }),
});

const navigation = defineCollection({
  type: "data",
  schema: z.object({
    top: z.object({
      items: z
        .array(
          z.object({
            label: z.string(),
            href: z.string(),
          }),
        )
        .default([]),
    }),
  }),
});

const contact = defineCollection({
  type: "data",
  schema: z.object({
    address: z.string(),
    socialMedia: z
      .array(
        z.object({
          url: z.string(),
          icon: z.string(),
        }),
      )
      .default([]), 
  }),
});

// ---------- Pages (content) schemas ----------
const heroSchema = z.object({
  heading: z.string(),
  cover: z.string(),
});

const introSectionSchema = z.object({
  type: z.literal("intro"),
  title: z.string(),
  content: z.string(),
});

const whatItemSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const whatGroupSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  items: z.array(whatItemSchema).default([]),
});

const whatSectionSchema = z.object({
  type: z.literal("what"),
  physical: whatGroupSchema,
  digital: whatGroupSchema,
});

const carouselSlideSchema = z.object({
  image: z.string(),
  sector: z.string(),
  caption: z.string(),
  link: z.string().url(),
  problem: z.string(),
  solution: z.string(),
  value: z.string(),
  fullDescription: z.string(),
});

const carouselSectionSchema = z.object({
  type: z.literal("carousel"),
  title: z.string(),
  subtitle: z.string(),
  slides: z.array(carouselSlideSchema).default([]),
});


const whySectionSchema = z.object({
  type: z.literal("why"),
  title: z.string(),
  content: z.string(),
});

const testimonialSlideSchema = z.object({
  image: z.string(),
  quote: z.string(),
  name: z.string(),
});

const testimonialsSectionSchema = z.object({
  type: z.literal("testimonials"),
  slides: z.array(testimonialSlideSchema).default([]),
});

const howAndWhoSlideSchema = z.object({
  image: z.string(),
  content: z.string(),
  button: z.string().optional(),
});

const howAndWhoSectionSchema = z.object({
  type: z.literal("how"),
  slides: z.array(howAndWhoSlideSchema).default([]),
});

const mugshotSchema = z.object({
  image: z.string(),
  name: z.string(),
  position: z.string(),
});

const aboutSectionSchema = z.object({
  type: z.literal("about"),
  title: z.string(),
  content: z.string(),
  cover: z.string(),
  image: z.string(),
  mugshots: z.array(mugshotSchema).max(3).default([]),
});

const sectionsSchema = z
  .array(
    z.discriminatedUnion("type", [
      introSectionSchema,
      carouselSectionSchema,
      whatSectionSchema,
      whySectionSchema,
      howAndWhoSectionSchema,
      testimonialsSectionSchema,
      aboutSectionSchema,
    ]),
  )
  .default([]);

// ---------- Pages collection ----------
const pages = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    hero: heroSchema,
    sections: sectionsSchema,
  }),
});

export const collections = {
  site,
  navigation,
  contact,
  pages,
};