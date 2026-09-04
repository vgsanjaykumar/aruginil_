import type { Category } from "../../types/business";
/**
 * Categories in the "retail-food" group.
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
export const retail_foodCategories: Category[] = [
  {
    id: "grocery-stores",
    name: "Grocery Stores",
    pluralName: "Grocery Stores",
    slug: "grocery-stores",
    group: "retail-food",
    description: "Find local grocery stores providers near you.",
    icon: "ShoppingBasket",
    primaryColor: "#EA580C",
    lightColor: "#FFEDD5",
    darkColor: "#9A3412",
    services: [],
    choosingTips: [],
    faqs: [],
  },
  {
    id: "supermarkets",
    name: "Supermarkets",
    pluralName: "Supermarkets",
    slug: "supermarkets",
    group: "retail-food",
    description: "Find local supermarkets providers near you.",
    icon: "ShoppingBasket",
    primaryColor: "#EA580C",
    lightColor: "#FFEDD5",
    darkColor: "#9A3412",
    services: [],
    choosingTips: [],
    faqs: [],
  },
  {
    id: "bakeries",
    name: "Bakeries",
    pluralName: "Bakeries",
    slug: "bakeries",
    group: "retail-food",
    description: "Find local bakeries providers near you.",
    icon: "ShoppingBasket",
    primaryColor: "#EA580C",
    lightColor: "#FFEDD5",
    darkColor: "#9A3412",
    services: [],
    choosingTips: [],
    faqs: [],
  },
  {
    id: "vegetable-shops",
    name: "Vegetable Shops",
    pluralName: "Vegetable Shops",
    slug: "vegetable-shops",
    group: "retail-food",
    description: "Find local vegetable shops providers near you.",
    icon: "ShoppingBasket",
    primaryColor: "#EA580C",
    lightColor: "#FFEDD5",
    darkColor: "#9A3412",
    services: [],
    choosingTips: [],
    faqs: [],
  },
  {
    id: "fruit-shops",
    name: "Fruit Shops",
    pluralName: "Fruit Shops",
    slug: "fruit-shops",
    group: "retail-food",
    description: "Find local fruit shops providers near you.",
    icon: "ShoppingBasket",
    primaryColor: "#EA580C",
    lightColor: "#FFEDD5",
    darkColor: "#9A3412",
    services: [],
    choosingTips: [],
    faqs: [],
  },
  {
    id: "tea-shops",
    name: "Tea Shops",
    pluralName: "Tea Shops",
    slug: "tea-shops",
    group: "retail-food",
    description: "Find local tea shops providers near you.",
    icon: "ShoppingBasket",
    primaryColor: "#EA580C",
    lightColor: "#FFEDD5",
    darkColor: "#9A3412",
    services: [],
    choosingTips: [],
    faqs: [],
  },
];
