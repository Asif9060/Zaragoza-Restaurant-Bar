export interface Testimonial {
  id: string;
  name: string;
  location?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  date: string;
  source?: "google" | "yelp" | "opentable" | "direct";
  isActive: boolean;
}
