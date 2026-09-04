import type { Business } from "../../../../types/business";

export const maduraiBeautyParlourBusinesses: Business[] = [

  {
    id: "madurai-beauty-parlour-rachnas-beauty-studio",
    name: "Rachna's Beauty Studio",
    slug: "rachnas-beauty-studio",
    city: "Madurai",
    citySlug: "madurai",
    category: "Beauty Parlour",
    categorySlug: "beauty-parlour",
    description:
      "Rachna's Beauty Studio is a women's salon in Madurai's KK Nagar specialising in bridal makeup, hair treatments, facials and manicure/pedicure.",
    services: ["Bridal Makeup", "Hair Care", "Manicure & Pedicure"],
    address: "A/7, Vasantamaligai, KK Nagar, 100 Feet Road, above Bata showroom, Madurai",
    phone: "+91 82201 24220",
    email: "makeoverbyrachnasbeautystudio@gmail.com",
    website: "https://www.rachnasbeauty.com/",
    image: "https://static.wixstatic.com/media/75b353_7897cbf32c294b0b897bd0b7bc398676.jpg/v1/fit/w_2500,h_1330,al_c/75b353_7897cbf32c294b0b897bd0b7bc398676.jpg",
    openingHours: [
      { day: "Monday", hours: "9:00 AM – 8:00 PM" },
      { day: "Tuesday", hours: "Closed" },
      { day: "Wednesday", hours: "9:00 AM – 8:00 PM" },
      { day: "Thursday", hours: "9:00 AM – 8:00 PM" },
      { day: "Friday", hours: "9:00 AM – 8:00 PM" },
      { day: "Saturday", hours: "9:00 AM – 8:00 PM" },
      { day: "Sunday", hours: "9:00 AM – 8:00 PM" },
    ],
    featured: false,
  },

  {
    id: "madurai-beauty-parlour-manasa-ladies-beauty-parlour",
    name: "Manasa Ladies Beauty Parlour",
    slug: "manasa-ladies-beauty-parlour",
    city: "Madurai",
    citySlug: "madurai",
    category: "Beauty Parlour",
    categorySlug: "beauty-parlour",
    description:
      "Manasa Ladies Beauty Parlour (Maanasa Hair & Beauty Salon) offers haircuts, hair colour and styling in Madurai using L'Oréal Professionnel products.",
    services: ["Hair Care", "Skin & Beauty Treatments"],
    address: "73, Chandragandhi Nagar, 2nd Floor, Chella Kamatchi, Madurai – 625016",
    phone: null,
    email: null,
    website: null,
    image: "/assets/localfind/beauty-parlour.svg",
    openingHours: null,
    featured: false,
  },

  {
    id: "madurai-beauty-parlour-lovely-ladies-beauty-parlour",
    name: "Lovely Ladies Beauty Parlour",
    slug: "lovely-ladies-beauty-parlour",
    city: "Madurai",
    citySlug: "madurai",
    category: "Beauty Parlour",
    categorySlug: "beauty-parlour",
    description:
      "Lovely Ladies Beauty Parlour in Anna Nagar, Madurai offers bridal makeup, hair styling, mehendi art and skin treatments.",
    services: ["Bridal Makeup", "Hair Care", "Mehendi", "Skin & Beauty Treatments"],
    address: "No. 4/941A, near Ambiga Cinema, Vandiyur Main Road, Anna Nagar, Madurai – 625020",
    phone: null,
    email: null,
    website: null,
    image: "/assets/localfind/beauty-parlour.svg",
    openingHours: null,
    featured: false,
  },
];
