"use client";

import { useState } from "react";
import { Plus, Trash2, ToggleLeft, ToggleRight, ChevronUp, ChevronDown } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { useGallery } from "@/hooks/useGallery";
import type { GalleryCategory } from "@/types/gallery";
import { cn } from "@/lib/utils";

const GALLERY_CATEGORIES: GalleryCategory[] = ["food","ambiance","events","team","bar"];

export default function AdminGalleryPage() {
  const { images, addImage, deleteImage, toggleActive, reorder } = useGallery();
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | "all">("all");
  const [newImg, setNewImg] = useState({ src: "", alt: "", caption: "", category: "food" as GalleryCategory });
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const displayed = activeCategory === "all" ? images : images.filter((i) => i.category === activeCategory);

  return (
    <div className="flex flex-col min-h-full">
      <AdminHeader title="Gallery" subtitle={`${images.length} images`} />

      <div className="p-6 flex flex-col gap-5">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex gap-1 flex-wrap">
            {(["all", ...GALLERY_CATEGORIES] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "font-sans text-[10px] tracking-widest uppercase px-3 py-1.5 rounded border transition-all",
                  activeCategory === cat ? "border-gold bg-gold/10 text-gold" : "border-slate text-mist hover:border-gold/40"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
          <Button variant="primary" size="sm" onClick={() => setShowAddModal(true)}>
            <Plus size={14} /> Add Image
          </Button>
        </div>

        {/* Image grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
          {displayed.length === 0 ? (
            <div className="col-span-5 text-center py-12">
              <p className="font-sans text-sm text-stone">No images found.</p>
            </div>
          ) : displayed.map((img) => (
            <div key={img.id} className="group relative rounded-lg overflow-hidden border" style={{ borderColor: "var(--admin-border)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt={img.alt} className="w-full aspect-square object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-obsidian/0 group-hover:bg-obsidian/60 transition-all flex flex-col items-end justify-start p-2 gap-1">
                <div className="opacity-0 group-hover:opacity-100 flex flex-col gap-1">
                  <button onClick={() => toggleActive(img.id)} className="p-1 rounded bg-charcoal/80 text-xs">
                    {img.isActive ? <ToggleRight size={14} className="text-emerald-400" /> : <ToggleLeft size={14} className="text-stone" />}
                  </button>
                  <button onClick={() => reorder(img.id,"up")} className="p-1 rounded bg-charcoal/80 text-mist hover:text-cream">
                    <ChevronUp size={14} />
                  </button>
                  <button onClick={() => reorder(img.id,"down")} className="p-1 rounded bg-charcoal/80 text-mist hover:text-cream">
                    <ChevronDown size={14} />
                  </button>
                  <button onClick={() => setConfirmDelete(img.id)} className="p-1 rounded bg-charcoal/80 text-stone hover:text-red-400">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="p-2 border-t" style={{ background: "var(--admin-card)", borderColor: "var(--admin-border)" }}>
                <p className="font-sans text-[10px] text-mist truncate">{img.caption || img.alt}</p>
                <div className="flex items-center justify-between mt-1">
                  <Badge variant="gray" className="text-[9px]">{img.category}</Badge>
                  {!img.isActive && <Badge variant="red" className="text-[9px]">Hidden</Badge>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add image modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add Gallery Image" size="sm">
        <div className="p-5 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-sans text-[10px] tracking-widest uppercase text-stone">Image URL *</label>
            <input className="input-admin" value={newImg.src} onChange={(e) => setNewImg({...newImg,src:e.target.value})} placeholder="https://..." />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-sans text-[10px] tracking-widest uppercase text-stone">Alt Text *</label>
            <input className="input-admin" value={newImg.alt} onChange={(e) => setNewImg({...newImg,alt:e.target.value})} placeholder="Describe the image" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-sans text-[10px] tracking-widest uppercase text-stone">Caption</label>
            <input className="input-admin" value={newImg.caption} onChange={(e) => setNewImg({...newImg,caption:e.target.value})} placeholder="Optional caption" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-sans text-[10px] tracking-widest uppercase text-stone">Category</label>
            <select className="input-admin" value={newImg.category} onChange={(e) => setNewImg({...newImg,category:e.target.value as GalleryCategory})}>
              {GALLERY_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          {newImg.src && (
            <div className="rounded overflow-hidden h-32">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={newImg.src} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="flex gap-3 pt-2 border-t border-ash">
            <Button variant="ghost" size="sm" fullWidth onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button variant="primary" size="sm" fullWidth onClick={() => {
              if (!newImg.src || !newImg.alt) return;
              addImage({ src: newImg.src, alt: newImg.alt, caption: newImg.caption, category: newImg.category, isActive: true });
              setNewImg({ src: "", alt: "", caption: "", category: "food" });
              setShowAddModal(false);
            }}>Add Image</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Delete Image?" size="sm">
        <div className="p-5 flex flex-col gap-4">
          <p className="font-sans text-sm text-mist">Remove this image from the gallery?</p>
          <div className="flex gap-3">
            <Button variant="ghost" size="sm" fullWidth onClick={() => setConfirmDelete(null)}>Cancel</Button>
            <Button variant="danger" size="sm" fullWidth onClick={() => { if (confirmDelete) { deleteImage(confirmDelete); setConfirmDelete(null); } }}>Delete</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
