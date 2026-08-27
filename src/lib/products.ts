import pOud from "@/assets/p-oud-noir.jpg";
import pAmber from "@/assets/p-royal-amber.jpg";
import pMusk from "@/assets/p-blue-musk.jpg";
import pRose from "@/assets/p-velvet-rose.jpg";
import pLeather from "@/assets/p-intense-leather.jpg";
import pCitrus from "@/assets/p-citrus-elixir.jpg";
import pAttars from "@/assets/attars.jpg";
import pTravel from "@/assets/travel.jpg";
import pGift from "@/assets/gift-set.jpg";
import bottleNoir from "@/assets/bottle-noir.svg";
import bottleAmber from "@/assets/bottle-amber.svg";
import bottleBlue from "@/assets/bottle-blue.svg";

export type Family =
  | "Oud"
  | "Woody"
  | "Fresh"
  | "Floral"
  | "Musk"
  | "Vanilla"
  | "Citrus"
  | "Leather"
  | "Spicy";

export type Category = "men" | "women" | "unisex" | "attars" | "gift-sets" | "travel-sprays";

export interface Review {
  name: string;
  city: string;
  rating: number;
  text: string;
}

export interface Product {
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  mrp: number;
  rating: number;
  reviewCount: number;
  categories: Category[];
  families: Family[];
  image: string;
  sizes: { label: string; multiplier: number }[];
  notes: { top: string[]; heart: string[]; base: string[] };
  description: string;
  concentration: string;
  longevity: string;
  isNew?: boolean;
  bestseller?: boolean;
  reviews: Review[];
}

export const FAMILIES: Family[] = [
  "Oud",
  "Woody",
  "Fresh",
  "Floral",
  "Musk",
  "Vanilla",
  "Citrus",
  "Leather",
  "Spicy",
];

const standardSizes = [
  { label: "10 ml", multiplier: 0.45 },
  { label: "50 ml", multiplier: 1 },
  { label: "100 ml", multiplier: 1.75 },
];

export const products: Product[] = [
  {
    slug: "sarkar-oud-noir",
    name: "Sarkar Oud Noir",
    subtitle: "Extrait de Parfum",
    price: 1000000,
    mrp: 1000000,
    rating: 4.8,
    reviewCount: 214,
    categories: ["men", "unisex"],
    families: ["Oud", "Woody", "Spicy"],
    image: bottleNoir,
    sizes: standardSizes,
    notes: {
      top: ["Black Pepper", "Saffron"],
      heart: ["Assam Agarwood", "Cinnamon Bark"],
      base: ["Mysore Sandalwood", "Dark Amber"],
    },
    description:
      "Our darkest composition. Aged agarwood is folded into saffron and warm spice, then rested on sandalwood until it turns smooth as lacquer. Built for evenings that are meant to be remembered.",
    concentration: "Extrait 30%",
    longevity: "10–12 hours",
    bestseller: true,
    reviews: [
      {
        name: "Rehan Qureshi",
        city: "Hyderabad",
        rating: 5,
        text: "Two sprays on the collar and it stayed with me through a full wedding night. The oud is real, not synthetic sweetness.",
      },
      {
        name: "Aditya Nair",
        city: "Bengaluru",
        rating: 4,
        text: "Serious, grown-up fragrance. Opens sharp with pepper, settles into something very warm after twenty minutes.",
      },
    ],
  },
  {
    slug: "sarkar-royal-amber",
    name: "Sarkar Royal Amber",
    subtitle: "Eau de Parfum",
    price: 1000000,
    mrp: 1000000,
    rating: 4.7,
    reviewCount: 168,
    categories: ["unisex", "men"],
    families: ["Vanilla", "Woody", "Spicy"],
    image: bottleAmber,
    sizes: standardSizes,
    notes: {
      top: ["Bergamot", "Pink Pepper"],
      heart: ["Labdanum", "Tonka Bean"],
      base: ["Golden Amber", "Bourbon Vanilla"],
    },
    description:
      "Resinous amber melted into tonka and vanilla, with just enough pepper to keep it from turning sweet. A winter signature that wears close and glows.",
    concentration: "EDP 22%",
    longevity: "8–10 hours",
    bestseller: true,
    reviews: [
      {
        name: "Meher Kapadia",
        city: "Mumbai",
        rating: 5,
        text: "Warm without being heavy. My husband keeps borrowing it, which tells you everything.",
      },
    ],
  },
  {
    slug: "sarkar-blue-musk",
    name: "Sarkar Blue Musk",
    subtitle: "Eau de Parfum",
    price: 1000000,
    mrp: 1000000,
    rating: 4.6,
    reviewCount: 302,
    categories: ["men", "unisex"],
    families: ["Fresh", "Musk", "Citrus"],
    image: bottleBlue,
    sizes: standardSizes,
    notes: {
      top: ["Sicilian Lemon", "Sea Salt"],
      heart: ["Lavender", "Violet Leaf"],
      base: ["White Musk", "Driftwood"],
    },
    description:
      "Clean, cool and unfussy. Salt-air freshness over a soft musk drydown that survives an Indian summer commute.",
    concentration: "EDP 20%",
    longevity: "7–9 hours",
    reviews: [
      {
        name: "Ishan Mehrotra",
        city: "Pune",
        rating: 5,
        text: "My daily office scent. Inoffensive in the best way and it genuinely lasts till evening.",
      },
    ],
  },
  {
    slug: "sarkar-velvet-rose",
    name: "Sarkar Velvet Rose",
    subtitle: "Extrait de Parfum",
    price: 1000000,
    mrp: 1000000,
    rating: 4.9,
    reviewCount: 141,
    categories: ["women", "unisex"],
    families: ["Floral", "Oud", "Musk"],
    image: bottleAmber,
    sizes: standardSizes,
    notes: {
      top: ["Kannauj Rose", "Raspberry"],
      heart: ["Turkish Rose Absolute", "Clove"],
      base: ["Patchouli", "Soft Oud"],
    },
    description:
      "A rose with weight. Petal freshness at the top, jammy depth in the heart, and a whisper of oud underneath so it never turns powdery.",
    concentration: "Extrait 28%",
    longevity: "9–11 hours",
    bestseller: true,
    reviews: [
      {
        name: "Tanvi Deshpande",
        city: "Nagpur",
        rating: 5,
        text: "The most beautiful rose I have owned. It smells expensive from the first spray.",
      },
    ],
  },
  {
    slug: "sarkar-intense-leather",
    name: "Sarkar Intense Leather",
    subtitle: "Extrait de Parfum",
    price: 1000000,
    mrp: 1000000,
    rating: 4.7,
    reviewCount: 96,
    categories: ["men"],
    families: ["Leather", "Woody", "Spicy"],
    image: bottleNoir,
    sizes: standardSizes,
    notes: {
      top: ["Cardamom", "Birch"],
      heart: ["Suede", "Tobacco Leaf"],
      base: ["Vetiver", "Smoked Cedar"],
    },
    description:
      "Suede and tobacco over a dry, smoky vetiver. Confident and unmistakably masculine — the fragrance equivalent of a well-worn leather jacket.",
    concentration: "Extrait 30%",
    longevity: "10–12 hours",
    isNew: true,
    reviews: [
      {
        name: "Kabir Sethi",
        city: "Delhi",
        rating: 5,
        text: "Smoky, dry, and grown-up. Compliments every single time I wear it out.",
      },
    ],
  },
  {
    slug: "sarkar-citrus-elixir",
    name: "Sarkar Citrus Elixir",
    subtitle: "Eau de Parfum",
    price: 1000000,
    mrp: 1000000,
    rating: 4.5,
    reviewCount: 187,
    categories: ["unisex", "women"],
    families: ["Citrus", "Fresh", "Woody"],
    image: bottleBlue,
    sizes: standardSizes,
    notes: {
      top: ["Bergamot", "Yuzu", "Neroli"],
      heart: ["Green Tea", "Ginger"],
      base: ["Cedarwood", "Clean Musk"],
    },
    description:
      "Bright bergamot and yuzu held together by green tea and cedar, so the sparkle lasts far longer than a typical citrus.",
    concentration: "EDP 18%",
    longevity: "6–8 hours",
    isNew: true,
    reviews: [
      {
        name: "Sanya Bhatt",
        city: "Ahmedabad",
        rating: 4,
        text: "Perfect for humid mornings. Fresh but not soapy.",
      },
    ],
  },
  {
    slug: "sarkar-attar-collection",
    name: "Sarkar Heritage Attar Trio",
    subtitle: "Alcohol-free Perfume Oils",
    price: 1000000,
    mrp: 1000000,
    rating: 4.8,
    reviewCount: 74,
    categories: ["attars", "unisex"],
    families: ["Oud", "Floral", "Woody"],
    image: pAttars,
    sizes: [
      { label: "3 × 6 ml", multiplier: 1 },
      { label: "3 × 12 ml", multiplier: 1.8 },
    ],
    notes: {
      top: ["Rose Ruh", "Kewda"],
      heart: ["Shamama", "Mitti"],
      base: ["Sandalwood Oil", "Oud Muattar"],
    },
    description:
      "Three concentrated perfume oils in ornate glass vials — rose ruh, earthy mitti and a smoky oud muattar. No alcohol, no filler, just oil that blooms on skin.",
    concentration: "Pure oil",
    longevity: "12+ hours",
    bestseller: true,
    reviews: [
      {
        name: "Faizan Ali",
        city: "Lucknow",
        rating: 5,
        text: "The mitti attar took me straight back to monsoon evenings at home. Beautifully done.",
      },
    ],
  },
  {
    slug: "sarkar-noir-gift-set",
    name: "Sarkar Noir Gift Set",
    subtitle: "Two 50 ml Parfums in Crest Box",
    price: 1000000,
    mrp: 1000000,
    rating: 4.9,
    reviewCount: 58,
    categories: ["gift-sets", "unisex"],
    families: ["Oud", "Vanilla", "Woody"],
    image: pGift,
    sizes: [{ label: "2 × 50 ml", multiplier: 1 }],
    notes: {
      top: ["Saffron", "Bergamot"],
      heart: ["Agarwood", "Labdanum"],
      base: ["Sandalwood", "Amber"],
    },
    description:
      "Oud Noir and Royal Amber paired in a matte-black rigid box with gold-foil crest, cream information card and a corded gift bag. Ready to hand over as-is.",
    concentration: "Mixed",
    longevity: "10–12 hours",
    reviews: [
      {
        name: "Nikhil Raghavan",
        city: "Chennai",
        rating: 5,
        text: "Gifted this to my father-in-law. The packaging alone made the impression.",
      },
    ],
  },
  {
    slug: "sarkar-travel-quintet",
    name: "Sarkar Travel Quintet",
    subtitle: "Five 8 ml Pocket Sprays",
    price: 1000000,
    mrp: 1000000,
    rating: 4.6,
    reviewCount: 112,
    categories: ["travel-sprays", "unisex", "gift-sets"],
    families: ["Oud", "Fresh", "Floral", "Leather", "Citrus"],
    image: pTravel,
    sizes: [{ label: "5 × 8 ml", multiplier: 1 }],
    notes: {
      top: ["Bergamot", "Pepper"],
      heart: ["Rose", "Suede"],
      base: ["Musk", "Cedar"],
    },
    description:
      "Five refillable pocket sprays covering the full house — the easiest way to find your signature before committing to a full bottle.",
    concentration: "Mixed",
    longevity: "7–10 hours",
    isNew: true,
    reviews: [
      {
        name: "Aarav Khanna",
        city: "Jaipur",
        rating: 5,
        text: "Great discovery set. Ended up buying the full-size Oud Noir a week later.",
      },
    ],
  },
];

export const categories: {
  slug: Category | "new-arrivals";
  title: string;
  copy: string;
  image: string;
}[] = [
  { slug: "men", title: "Men's Perfumes", copy: "Oud, leather and smoke.", image: pLeather },
  { slug: "women", title: "Women's Perfumes", copy: "Rose, musk and light florals.", image: pRose },
  { slug: "unisex", title: "Unisex Fragrances", copy: "Shared signatures for everyone.", image: pAmber },
  { slug: "attars", title: "Attars", copy: "Alcohol-free perfume oils.", image: pAttars },
  { slug: "gift-sets", title: "Gift Sets", copy: "Crest boxes, ready to gift.", image: pGift },
  { slug: "travel-sprays", title: "Travel Sprays", copy: "Pocket-sized, refillable.", image: pTravel },
];

export const categoryMeta: Record<string, { title: string; blurb: string }> = {
  men: { title: "Men's Perfumes", blurb: "Dark oud, dry leather and smoked woods built for presence." },
  women: { title: "Women's Perfumes", blurb: "Rose absolutes, soft musks and luminous florals." },
  unisex: { title: "Unisex Fragrances", blurb: "Compositions that read differently on every skin." },
  attars: { title: "Attars", blurb: "Alcohol-free perfume oils in the Indian tradition." },
  "gift-sets": { title: "Gift Sets", blurb: "Matte-black crest boxes with gold foil and cream labels." },
  "travel-sprays": { title: "Travel Sprays", blurb: "Refillable 8 ml sprays that live in a jacket pocket." },
  "new-arrivals": { title: "New Arrivals", blurb: "The newest additions to the Sarkar house." },
};

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function productsByCategory(slug: string) {
  if (slug === "new-arrivals") return products.filter((p) => p.isNew);
  return products.filter((p) => p.categories.includes(slug as Category));
}

export function formatINR(value: number) {
  return "₹" + Math.round(value).toLocaleString("en-IN");
}

export const testimonials = [
  {
    name: "Vikram Sundaram",
    city: "Coimbatore",
    text: "I have bought French niche for years. Sarkar Oud Noir holds its own next to bottles twice the price, and the oud actually smells like oud.",
    rating: 5,
  },
  {
    name: "Zoya Kamdar",
    city: "Surat",
    text: "Velvet Rose arrived double-boxed with a handwritten card. Presentation was as considered as the fragrance itself.",
    rating: 5,
  },
  {
    name: "Harmeet Grewal",
    city: "Chandigarh",
    text: "The travel quintet is a brilliant idea. I wore each one for a week before deciding on Intense Leather.",
    rating: 4,
  },
];
