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

const careerItemSchema = z.object({
  title: z.string(),
  description: z.string(),
  form: z.string()
});

const careersSectionSchema = z.object({
  type: z.literal("careers"),
  title: z.string(),
  items: z.array(careerItemSchema).default([]),
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

const mugshotSchema = z.object({
  image: z.string(),
  name: z.string(),
  position: z.string(),
});

const aboutSectionSchema = z.object({
  type: z.literal("about"),
  title: z.string(),
  content: z.string(),
  mugshots: z.array(mugshotSchema).max(2).default([]),
});

const sectionsSchema = z
  .array(
    z.discriminatedUnion("type", [
      introSectionSchema,
      carouselSectionSchema,
      careersSectionSchema,
      whySectionSchema,
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