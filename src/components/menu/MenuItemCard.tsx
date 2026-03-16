import { formatPrice } from "@/lib/utils";
import { DietaryBadge } from "@/components/ui/Badge";
import type { MenuItem } from "@/types/menu";

interface MenuItemCardProps {
  item: MenuItem;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  return (
    <article className="group flex gap-4 p-5 rounded-lg bg-charcoal/50 border border-ash/60 hover:border-gold/20 hover:bg-charcoal transition-all duration-300">
      {/* Image */}
      {item.image && (
        <div className="flex-shrink-0 w-20 h-20 rounded overflow-hidden hidden sm:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 gap-1.5 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-0.5 min-w-0">
            <h3 className="font-serif text-lg font-light text-cream group-hover:text-gold transition-colors duration-300 leading-snug">
              {item.name}
            </h3>
            {item.spanishName && (
              <span className="font-sans text-xs text-mist/60 italic font-light">
                {item.spanishName}
              </span>
            )}
          </div>
          <span className="font-sans text-gold font-normal text-base flex-shrink-0">
            {formatPrice(item.price)}
          </span>
        </div>

        <p className="font-sans text-sm text-mist leading-relaxed font-light">
          {item.description}
        </p>

        {(item.isVegetarian || item.isVegan || item.isGlutenFree || item.isSignature || item.containsNuts) && (
          <div className="mt-1">
            <DietaryBadge
              isVegetarian={item.isVegetarian}
              isVegan={item.isVegan}
              isGlutenFree={item.isGlutenFree}
              containsNuts={item.containsNuts}
              isSignature={item.isSignature}
            />
          </div>
        )}
      </div>
    </article>
  );
}
