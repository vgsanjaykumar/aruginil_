import type { Business, Category } from "../../types";
import BusinessCard from "./BusinessCard";

interface BusinessGridProps {
  businesses: Business[];
  category: Category;
  onToast: (text: string) => void;
}

export default function BusinessGrid({ businesses, category, onToast }: BusinessGridProps) {
  return (
    <div className="flex flex-col gap-4">
      {businesses.map((business, index) => (
        <BusinessCard key={business.id} business={business} category={category} onToast={onToast} rank={index + 1} />
      ))}
    </div>
  );
}
