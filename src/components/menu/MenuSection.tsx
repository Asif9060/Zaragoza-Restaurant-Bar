import { StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import MenuItemCard from "./MenuItemCard";
import type { MenuItem, MenuCategory } from "@/types/menu";
import { MENU_CATEGORY_LABELS } from "@/types/menu";

interface MenuSectionProps {
  category: MenuCategory;
  items: MenuItem[];
}

export default function MenuSection({ category, items }: MenuSectionProps) {
  if (items.length === 0) return null;

  return (
    <section id={`menu-${category}`} className="scroll-mt-36">
      <div className="flex items-center gap-6 mb-8">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl font-light italic text-cream">
            {MENU_CATEGORY_LABELS[category]}
          </h2>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-gold/30 to-transparent" />
      </div>

      <StaggerContainer
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
        staggerDelay={0.06}
        threshold={0.02}
      >
        {items.map((item) => (
          <StaggerItem key={item.id}>
            <MenuItemCard item={item} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
