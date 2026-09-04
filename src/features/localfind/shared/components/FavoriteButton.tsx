import { Heart } from "lucide-react";
import { useFavorites } from "../hooks/useFavorites";

interface FavoriteButtonProps {
  businessId: string;
  businessName: string;
  size?: number;
  showLabel?: boolean;
  onToast?: (text: string) => void;
}

export default function FavoriteButton({
  businessId,
  businessName,
  size = 20,
  showLabel = false,
  onToast,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(businessId);

  const handleClick = () => {
    const nowFavorited = toggleFavorite(businessId);
    onToast?.(nowFavorited ? "Added to favorites" : "Removed from favorites");
  };

  return (
    <button
      onClick={handleClick}
      aria-pressed={favorited}
      aria-label={favorited ? `Remove ${businessName} from favorites` : `Save ${businessName} to favorites`}
      className={`flex items-center gap-1.5 text-lf-ink-soft hover:text-lf-brand transition-colors ${
        showLabel ? "border border-black/10 rounded-xl px-3.5 h-10 hover:border-lf-brand/40" : ""
      }`}
    >
      <Heart size={size} className={favorited ? "fill-lf-brand text-lf-brand" : ""} />
      {showLabel && <span className="text-sm font-semibold text-lf-ink">Save</span>}
    </button>
  );
}
