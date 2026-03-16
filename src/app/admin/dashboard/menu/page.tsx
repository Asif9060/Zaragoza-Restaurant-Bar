"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, Star } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { useMenuItems } from "@/hooks/useMenuItems";
import { formatPrice } from "@/lib/utils";
import { MENU_CATEGORY_LABELS } from "@/types/menu";
import type { MenuCategory, MenuItem } from "@/types/menu";

const CATEGORIES: MenuCategory[] = [
  "tapas-frias","tapas-calientes","paellas","carnes",
  "mariscos","postres","cocktails","vinos","cervezas",
];

function MenuItemModalForm({
  item,
  onSave,
  onClose,
}: {
  item?: MenuItem;
  onSave: (data: Omit<MenuItem, "id" | "displayOrder">) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    name: item?.name ?? "",
    description: item?.description ?? "",
    price: item?.price ?? 0,
    category: item?.category ?? "tapas-frias" as MenuCategory,
    isAvailable: item?.isAvailable ?? true,
    isSignature: item?.isSignature ?? false,
    isVegetarian: item?.isVegetarian ?? false,
    isVegan: item?.isVegan ?? false,
    isGlutenFree: item?.isGlutenFree ?? false,
  });

  const handleSave = () => {
    if (!form.name || !form.description) return;
    onSave(form);
    onClose();
  };

  return (
    <div className="p-5 flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="font-sans text-[10px] tracking-widest uppercase text-stone">Name *</label>
        <input className="input-admin" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Item name" />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="font-sans text-[10px] tracking-widest uppercase text-stone">Description *</label>
        <textarea className="input-admin resize-none" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Item description" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="font-sans text-[10px] tracking-widest uppercase text-stone">Price ($)</label>
          <input className="input-admin" type="number" min="0" step="0.5" value={form.price} onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="font-sans text-[10px] tracking-widest uppercase text-stone">Category</label>
          <select className="input-admin" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as MenuCategory })}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{MENU_CATEGORY_LABELS[c]}</option>)}
          </select>
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        {(["isAvailable","isSignature","isVegetarian","isVegan","isGlutenFree"] as const).map((key) => (
          <label key={key} className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.checked })} className="accent-gold" />
            <span className="font-sans text-xs text-mist">{key.replace("is","")}</span>
          </label>
        ))}
      </div>
      <div className="flex gap-3 pt-2 border-t border-ash">
        <Button variant="ghost" size="sm" fullWidth onClick={onClose}>Cancel</Button>
        <Button variant="primary" size="sm" fullWidth onClick={handleSave}>
          {item ? "Save Changes" : "Add Item"}
        </Button>
      </div>
    </div>
  );
}

export default function AdminMenuPage() {
  const { menuItems, addItem, updateItem, deleteItem, toggleAvailable, toggleSignature, getByCategory } = useMenuItems();
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("tapas-frias");
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const items = getByCategory(activeCategory);

  return (
    <div className="flex flex-col min-h-full">
      <AdminHeader title="Menu Management" subtitle={`${menuItems.length} total items`} />

      <div className="p-6 flex flex-col gap-5">
        {/* Category tabs */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="overflow-x-auto flex gap-1" style={{ scrollbarWidth: "none" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-sans text-[10px] tracking-widest uppercase px-3 py-2 rounded border whitespace-nowrap transition-all ${
                  activeCategory === cat ? "border-gold bg-gold/10 text-gold" : "border-slate text-mist hover:border-gold/40"
                }`}
              >
                {MENU_CATEGORY_LABELS[cat]} ({getByCategory(cat).length})
              </button>
            ))}
          </div>
          <Button variant="primary" size="sm" onClick={() => setShowAddModal(true)}>
            <Plus size={14} /> Add Item
          </Button>
        </div>

        {/* Items table */}
        <div className="rounded-lg border overflow-hidden" style={{ borderColor: "var(--admin-border)" }}>
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b" style={{ background: "var(--admin-card)", borderColor: "var(--admin-border)" }}>
                {["Name","Price","Badges","Available","Signature","Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-sans text-[10px] tracking-widest uppercase text-stone">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "var(--admin-border)" }}>
              {items.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-10 font-sans text-sm text-stone">No items in this category.</td></tr>
              ) : items.map((item) => (
                <tr key={item.id} style={{ background: "var(--admin-bg)" }}>
                  <td className="px-4 py-3">
                    <p className="font-sans text-sm text-cream">{item.name}</p>
                    <p className="font-sans text-xs text-stone line-clamp-1 max-w-48">{item.description}</p>
                  </td>
                  <td className="px-4 py-3 font-sans text-sm text-gold">{formatPrice(item.price)}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {item.isVegan && <Badge variant="green" className="text-[9px]">Vegan</Badge>}
                      {!item.isVegan && item.isVegetarian && <Badge variant="green" className="text-[9px]">Veg</Badge>}
                      {item.isGlutenFree && <Badge variant="amber" className="text-[9px]">GF</Badge>}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleAvailable(item.id)} className="text-stone hover:text-cream transition-colors">
                      {item.isAvailable ? <ToggleRight size={20} className="text-emerald-400" /> : <ToggleLeft size={20} />}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleSignature(item.id)} className="transition-colors">
                      <Star size={15} className={item.isSignature ? "text-gold fill-gold" : "text-stone"} />
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => setEditingItem(item)} className="p-1.5 rounded hover:bg-white/5 text-mist hover:text-cream transition-colors">
                        <Pencil size={13} />
                      </button>
                      <button onClick={() => setConfirmDelete(item.id)} className="p-1.5 rounded hover:bg-red-900/20 text-stone hover:text-red-400 transition-colors">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add Menu Item">
        <MenuItemModalForm
          onSave={(data) => addItem({ ...data, category: data.category ?? activeCategory })}
          onClose={() => setShowAddModal(false)}
        />
      </Modal>

      {/* Edit modal */}
      <Modal isOpen={!!editingItem} onClose={() => setEditingItem(null)} title="Edit Menu Item">
        {editingItem && (
          <MenuItemModalForm
            item={editingItem}
            onSave={(data) => updateItem(editingItem.id, data)}
            onClose={() => setEditingItem(null)}
          />
        )}
      </Modal>

      {/* Delete confirm */}
      <Modal isOpen={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Delete Item?" size="sm">
        <div className="p-5 flex flex-col gap-4">
          <p className="font-sans text-sm text-mist">Remove this menu item permanently?</p>
          <div className="flex gap-3">
            <Button variant="ghost" size="sm" fullWidth onClick={() => setConfirmDelete(null)}>Cancel</Button>
            <Button variant="danger" size="sm" fullWidth onClick={() => { if (confirmDelete) { deleteItem(confirmDelete); setConfirmDelete(null); } }}>Delete</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
