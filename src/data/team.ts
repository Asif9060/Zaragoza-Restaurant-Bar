export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  featured?: boolean;
}

export const team: TeamMember[] = [
  {
    id: "tm-001",
    name: "Chef Alejandro Vargas",
    role: "Executive Chef & Co-Founder",
    bio: "Born in Valencia and trained under two Michelin-starred chefs in Madrid and Barcelona, Chef Alejandro brings over twenty years of culinary passion to every dish at Zaragoza. His philosophy is simple: honor the ingredient, respect the tradition, and pour your soul into the pan. After touring Spain's finest restaurant kitchens, he chose Cleveland as the canvas for his life's work.",
    image:
      "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "tm-002",
    name: "Isabella Torres",
    role: "Pastry Chef",
    bio: "Isabella studied pastry arts at the prestigious Escuela de Hostelería in Seville before honing her craft in San Sebastián. Her desserts at Zaragoza blend classic Spanish tradition with contemporary finesse — from the tableside Crema Catalana to her legendary Churros con Chocolate.",
    image:
      "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=600&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "tm-003",
    name: "Marco Delgado",
    role: "Head Sommelier",
    bio: "A certified Sommelier with a decade of experience curating Spanish wine programs, Marco personally selects every bottle on our list. His guided wine tastings and pairing recommendations transform every meal into a journey through Spain's great wine regions.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "tm-004",
    name: "Carlos Méndez",
    role: "Sous Chef",
    bio: "Carlos oversees the daily operation of Zaragoza's kitchen with precision and warmth. Trained in Madrid's restaurant scene, he ensures that every paella, every tapa, every plate leaving the kitchen upholds the standards Chef Alejandro has set.",
    image:
      "https://images.unsplash.com/photo-1583394293214-0b7b1cfe5d33?w=600&auto=format&fit=crop",
  },
];

export const privateSpaces = [
  {
    id: "ps-001",
    name: "The Bodega Room",
    description:
      "Our most intimate private space, styled after a traditional Spanish wine cellar. Stone walls, vaulted ceiling, and a curated wine display create an atmosphere of exclusive privacy. Perfect for romantic dinners and small gatherings.",
    capacity: "Up to 12 guests",
    features: [
      "Private entrance",
      "Dedicated sommelier",
      "Custom menu available",
      "AV system",
    ],
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop",
  },
  {
    id: "ps-002",
    name: "The Andalucía Hall",
    description:
      "An expansive private dining hall with hand-painted Azulejo tilework, a carved wooden ceiling, and a dedicated bar. Ideal for corporate dinners, milestone celebrations, and large family gatherings.",
    capacity: "20–60 guests",
    features: [
      "Private bar",
      "Full AV and projection",
      "Custom menu and décor",
      "Dedicated event staff",
      "Standing reception option",
    ],
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&auto=format&fit=crop",
  },
];
