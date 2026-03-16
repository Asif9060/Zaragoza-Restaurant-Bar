import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Explore the elegance of Zaragoza Restaurant & Bar through our gallery — beautifully crafted Spanish dishes, intimate ambiance, and vibrant events in Cleveland, Ohio.",
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
