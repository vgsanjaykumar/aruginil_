import type { Category } from "../../types/business";
/**
 * Categories in the "photography-media" group.
 *
 * Only the categories Aruginil currently has real business data
 * for carry hand-written descriptions, service lists, choosing tips
 * and FAQs. The rest are registered here (so every valid category
 * from the master taxonomy resolves correctly and can be searched/
 * linked to) with an honest, generic description and empty
 * services/tips/FAQs — nothing invented — ready to be filled in
 * once real local businesses and real service details are verified
 * for that category.
 */
export const photography_mediaCategories: Category[] = [
  {
    id: "photo-studio",
    name: "Photo Studio",
    pluralName: "Photo Studios",
    slug: "photo-studio",
    group: "photography-media",
    description:
      "Photo studios and photographers cover weddings, portraits, baby and maternity shoots, events and passport photography.",
    icon: "Camera",
    primaryColor: "#7C3AED",
    lightColor: "#EDE9FE",
    darkColor: "#5B21B6",
    services: ["Wedding Photography", "Candid Photography", "Portrait Photography", "Baby Shoot", "Videography", "Passport Photos"],
    choosingTips: [
      "Ask to see full, unedited sample albums from a recent event, not just highlight reels.",
      "Confirm whether both photography and videography are handled by the same team or outsourced.",
      "Check delivery timelines for edited photos and albums before booking.",
    ],
    faqs: [
      {
        question: "Do photo studios also offer videography?",
        answer:
          "Many local photo studios offer both photography and videography as a combined package, especially for weddings — confirm what's included directly with the studio.",
      },
      {
        question: "How far in advance should I book for a wedding?",
        answer:
          "Wedding dates in peak season can book up months in advance, so it's generally a good idea to confirm your date and package early.",
      },
    ],
  },
];
