import Link from "next/link";
import { StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionHeading from "@/components/ui/SectionHeading";
import GoldDivider from "@/components/ui/GoldDivider";
import Button from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";

const featuredDishes = [
  {
    id: 1,
    name: "Paella Valenciana",
    desc: "Wood-fired, saffron-scented, and served straight from the pan — our signature dish is a journey to Valencia.",
    price: 38,
    image:
      "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=800&auto=format&fit=crop&q=80",
    tag: "Signature",
  },
  {
    id: 2,
    name: "Gambas al Ajillo",
    desc: "Sizzling wild-caught prawns in garlic-infused olive oil with guindilla chili and dry fino sherry.",
    price: 22,
    image:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop&q=80",
    tag: "Gluten-Free",
  },
  {
    id: 3,
    name: "Pulpo a la Gallega",
    desc: "Galician-style octopus on smoky paprika-dusted potato purée, drizzled with fruity extra-virgin olive oil.",
    price: 26,
    image:
      "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=800&auto=format&fit=crop&q=80",
    tag: "Chef's Choice",
  },
];

export default function FeaturedDishes() {
  return (
    <section className="section-padding bg-charcoal/40" aria-label="Featured Dishes">
      <div className="container-site">
        <div className="text-center mb-16">
          <SectionLabel>From Our Kitchen</SectionLabel>
          <SectionHeading className="mt-3 mb-2">Signature Dishes</SectionHeading>
          <GoldDivider className="max-w-xs mx-auto" />
          <p className="font-sans text-sm font-light text-mist mt-4 max-w-lg mx-auto">
            A selection of dishes that define who we are — crafted from authentic Spanish recipes
            and the finest seasonal ingredients.
          </p>
        </div>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          staggerDelay={0.12}
        >
          {featuredDishes.map((dish) => (
            <StaggerItem key={dish.id}>
              <div className="group relative overflow-hidden rounded-lg bg-charcoal border border-ash hover:border-gold/30 transition-all duration-500 flex flex-col h-full">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />

                  {/* Tag badge */}
                  <span className="absolute top-3 left-3 font-sans text-[10px] tracking-widest uppercase bg-gold text-obsidian px-2.5 py-1 rounded-sm">
                    {dish.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="font-serif text-xl font-light text-cream group-hover:text-gold transition-colors duration-300">
                      {dish.name}
                    </h3>
                    <span className="font-sans text-gold font-normal text-sm flex-shrink-0">
                      {formatPrice(dish.price)}
                    </span>
                  </div>
                  <p className="font-sans text-sm text-mist leading-relaxed font-light flex-1">
                    {dish.desc}
                  </p>
                </div>

                {/* Gold bottom accent on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="text-center mt-12">
          <Link href="/menu">
            <Button variant="outline" size="md">
              View Full Menu
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
