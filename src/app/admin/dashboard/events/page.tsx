"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, Calendar, Clock } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { useEvents } from "@/hooks/useEvents";
import { formatDateShort, formatTime } from "@/lib/utils";
import type { RestaurantEvent, EventType } from "@/types/event";

const EVENT_TYPES: EventType[] = ["flamenco","wine-tasting","special-menu","live-music","holiday","private","other"];

function EventForm({
  event,
  onSave,
  onClose,
}: {
  event?: RestaurantEvent;
  onSave: (data: Omit<RestaurantEvent,"id"|"createdAt">) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    title: event?.title ?? "",
    description: event?.description ?? "",
    date: event?.date ?? "",
    time: event?.time ?? "19:00",
    endTime: event?.endTime ?? "",
    type: event?.type ?? "other" as EventType,
    image: event?.image ?? "",
    price: event?.price ?? 0,
    isRecurring: event?.isRecurring ?? false,
    recurringNote: event?.recurringNote ?? "",
    isActive: event?.isActive ?? true,
  });

  const handleSave = () => {
    if (!form.title) return;
    onSave({
      ...form,
      capacity: undefined,
      longDescription: undefined,
      ticketUrl: undefined,
    });
    onClose();
  };

  return (
    <div className="p-5 flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
      <div className="flex flex-col gap-1.5">
        <label className="font-sans text-[10px] tracking-widest uppercase text-stone">Title *</label>
        <input className="input-admin" value={form.title} onChange={(e) => setForm({...form,title:e.target.value})} placeholder="Event title" />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="font-sans text-[10px] tracking-widest uppercase text-stone">Description</label>
        <textarea className="input-admin resize-none" rows={3} value={form.description} onChange={(e) => setForm({...form,description:e.target.value})} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="font-sans text-[10px] tracking-widest uppercase text-stone">Date</label>
          <input className="input-admin" type="date" value={form.date} onChange={(e) => setForm({...form,date:e.target.value})} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="font-sans text-[10px] tracking-widest uppercase text-stone">Type</label>
          <select className="input-admin" value={form.type} onChange={(e) => setForm({...form,type:e.target.value as EventType})}>
            {EVENT_TYPES.map((t) => <option key={t} value={t}>{t.replace("-"," ")}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="font-sans text-[10px] tracking-widest uppercase text-stone">Start Time</label>
          <input className="input-admin" type="time" value={form.time} onChange={(e) => setForm({...form,time:e.target.value})} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="font-sans text-[10px] tracking-widest uppercase text-stone">End Time</label>
          <input className="input-admin" type="time" value={form.endTime} onChange={(e) => setForm({...form,endTime:e.target.value})} />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="font-sans text-[10px] tracking-widest uppercase text-stone">Image URL</label>
        <input className="input-admin" value={form.image} onChange={(e) => setForm({...form,image:e.target.value})} placeholder="https://..." />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="font-sans text-[10px] tracking-widest uppercase text-stone">Price ($, 0 = Free)</label>
          <input className="input-admin" type="number" min="0" value={form.price} onChange={(e) => setForm({...form,price:parseFloat(e.target.value)||0})} />
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        {(["isActive","isRecurring"] as const).map((key) => (
          <label key={key} className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form[key]} onChange={(e) => setForm({...form,[key]:e.target.checked})} className="accent-gold" />
            <span className="font-sans text-xs text-mist">{key === "isActive" ? "Active" : "Recurring"}</span>
          </label>
        ))}
      </div>
      {form.isRecurring && (
        <div className="flex flex-col gap-1.5">
          <label className="font-sans text-[10px] tracking-widest uppercase text-stone">Recurring Note</label>
          <input className="input-admin" value={form.recurringNote} onChange={(e) => setForm({...form,recurringNote:e.target.value})} placeholder="e.g. Every Friday & Saturday" />
        </div>
      )}
      <div className="flex gap-3 pt-2 border-t border-ash">
        <Button variant="ghost" size="sm" fullWidth onClick={onClose}>Cancel</Button>
        <Button variant="primary" size="sm" fullWidth onClick={handleSave}>{event ? "Save Changes" : "Create Event"}</Button>
      </div>
    </div>
  );
}

export default function AdminEventsPage() {
  const { events, addEvent, updateEvent, deleteEvent, toggleActive } = useEvents();
  const [editingEvent, setEditingEvent] = useState<RestaurantEvent | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  return (
    <div className="flex flex-col min-h-full">
      <AdminHeader title="Events" subtitle={`${events.length} events`} />

      <div className="p-6 flex flex-col gap-5">
        <div className="flex justify-end">
          <Button variant="primary" size="sm" onClick={() => setShowAddModal(true)}>
            <Plus size={14} /> Create Event
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.length === 0 ? (
            <div className="col-span-2 text-center py-16">
              <p className="font-sans text-sm text-stone">No events yet. Create your first event.</p>
            </div>
          ) : events.map((ev) => (
            <div
              key={ev.id}
              className="rounded-lg border overflow-hidden flex flex-col"
              style={{ background: "var(--admin-card)", borderColor: "var(--admin-border)" }}
            >
              {ev.image && (
                <div className="h-36 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={ev.image} alt={ev.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
              )}
              <div className="p-4 flex flex-col gap-2 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-sans text-sm text-cream font-light">{ev.title}</h3>
                  <Badge variant={ev.isActive ? "emerald" : "gray"}>{ev.isActive ? "Active" : "Inactive"}</Badge>
                </div>
                <div className="flex items-center gap-3 text-xs text-stone font-sans">
                  <span className="flex items-center gap-1"><Calendar size={11} /> {ev.isRecurring ? ev.recurringNote : formatDateShort(ev.date)}</span>
                  <span className="flex items-center gap-1"><Clock size={11} /> {formatTime(ev.time)}</span>
                </div>
                <p className="font-sans text-xs text-mist line-clamp-2 font-light">{ev.description}</p>
                <div className="flex items-center gap-2 mt-auto pt-2 border-t border-ash">
                  <button onClick={() => toggleActive(ev.id)} className="text-stone hover:text-cream transition-colors">
                    {ev.isActive ? <ToggleRight size={18} className="text-emerald-400" /> : <ToggleLeft size={18} />}
                  </button>
                  <button onClick={() => setEditingEvent(ev)} className="p-1.5 rounded hover:bg-white/5 text-mist hover:text-cream transition-colors"><Pencil size={13} /></button>
                  <button onClick={() => setConfirmDelete(ev.id)} className="p-1.5 rounded hover:bg-red-900/20 text-stone hover:text-red-400 transition-colors"><Trash2 size={13} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Create Event" size="md">
        <EventForm onSave={addEvent} onClose={() => setShowAddModal(false)} />
      </Modal>
      <Modal isOpen={!!editingEvent} onClose={() => setEditingEvent(null)} title="Edit Event" size="md">
        {editingEvent && (
          <EventForm event={editingEvent} onSave={(data) => updateEvent(editingEvent.id, data)} onClose={() => setEditingEvent(null)} />
        )}
      </Modal>
      <Modal isOpen={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Delete Event?" size="sm">
        <div className="p-5 flex flex-col gap-4">
          <p className="font-sans text-sm text-mist">Delete this event permanently?</p>
          <div className="flex gap-3">
            <Button variant="ghost" size="sm" fullWidth onClick={() => setConfirmDelete(null)}>Cancel</Button>
            <Button variant="danger" size="sm" fullWidth onClick={() => { if (confirmDelete) { deleteEvent(confirmDelete); setConfirmDelete(null); } }}>Delete</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
