"use client";

import { useState } from "react";
import { Search, ChevronDown, ChevronUp, X, Check, UserX, Trash2 } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { useReservations } from "@/hooks/useReservations";
import { formatDate, formatTime, formatRelativeDate } from "@/lib/utils";
import type { Reservation, ReservationStatus } from "@/types/reservation";
import { cn } from "@/lib/utils";

const STATUS_VARIANT: Record<ReservationStatus, "amber" | "emerald" | "red" | "gray" | "gold"> = {
  pending:   "amber",
  confirmed: "emerald",
  cancelled: "red",
  completed: "gold",
  "no-show": "gray",
};

const STATUS_OPTIONS: ReservationStatus[] = ["pending", "confirmed", "cancelled", "completed", "no-show"];

function exportCSV(reservations: Reservation[]) {
  const headers = ["ID","First Name","Last Name","Email","Phone","Date","Time","Party","Occasion","Seating","Status","Created"];
  const rows = reservations.map((r) =>
    [r.id, r.firstName, r.lastName, r.email, r.phone, r.date, r.time, r.partySize, r.occasion ?? "", r.seatingPreference ?? "", r.status, r.createdAt]
      .map(String).map((v) => `"${v.replace(/"/g, '""')}"`).join(",")
  );
  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `reservations-${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminReservationsPage() {
  const { reservations, updateStatus, updateAdminNotes, deleteReservation } = useReservations();
  const [filterStatus, setFilterStatus] = useState<ReservationStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [adminNotesText, setAdminNotesText] = useState("");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const filtered = reservations
    .filter((r) => filterStatus === "all" || r.status === filterStatus)
    .filter((r) => {
      const q = search.toLowerCase();
      return (
        !q ||
        r.firstName.toLowerCase().includes(q) ||
        r.lastName.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      const cmp = a.date.localeCompare(b.date) || a.time.localeCompare(b.time);
      return sortDir === "asc" ? cmp : -cmp;
    });

  const openDetail = (r: Reservation) => {
    setSelectedReservation(r);
    setAdminNotesText(r.adminNotes ?? "");
  };

  const saveNotes = () => {
    if (!selectedReservation) return;
    updateAdminNotes(selectedReservation.id, adminNotesText);
    setSelectedReservation({ ...selectedReservation, adminNotes: adminNotesText });
  };

  return (
    <div className="flex flex-col min-h-full">
      <AdminHeader title="Reservations" subtitle={`${reservations.length} total reservations`} />

      <div className="p-6 flex flex-col gap-5">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          {/* Search */}
          <div className="relative w-full sm:max-w-64">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone" />
            <input
              type="search"
              placeholder="Search by name, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-admin pl-8 text-xs"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Status filter chips */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {(["all", ...STATUS_OPTIONS] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  className={cn(
                    "font-sans text-[10px] tracking-widest uppercase px-2.5 py-1 rounded border transition-all",
                    filterStatus === s
                      ? "border-gold bg-gold/15 text-gold"
                      : "border-slate text-mist hover:border-gold/40"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => exportCSV(filtered)}
            >
              Export CSV
            </Button>
          </div>
        </div>

        {/* Table */}
        <div
          className="rounded-lg border overflow-hidden"
          style={{ borderColor: "var(--admin-border)" }}
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b" style={{ background: "var(--admin-card)", borderColor: "var(--admin-border)" }}>
                  {[
                    { label: "Guest" },
                    { label: "Date / Time", sortable: true },
                    { label: "Party" },
                    { label: "Occasion" },
                    { label: "Status" },
                    { label: "Created" },
                    { label: "" },
                  ].map((col) => (
                    <th
                      key={col.label}
                      className="text-left px-4 py-3 font-sans text-[10px] tracking-widest uppercase text-stone cursor-default"
                    >
                      {col.sortable ? (
                        <button
                          className="flex items-center gap-1 hover:text-cream transition-colors"
                          onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
                        >
                          {col.label}
                          {sortDir === "asc" ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
                        </button>
                      ) : col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: "var(--admin-border)" }}>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 font-sans text-sm text-stone">
                      No reservations found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((r) => (
                    <tr
                      key={r.id}
                      className="transition-colors hover:bg-white/3 cursor-pointer"
                      onClick={() => openDetail(r)}
                      style={{ background: "var(--admin-bg)" }}
                    >
                      <td className="px-4 py-3">
                        <p className="font-sans text-sm text-cream">{r.firstName} {r.lastName}</p>
                        <p className="font-sans text-xs text-stone">{r.email}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-sans text-xs text-cream">{formatDate(r.date)}</p>
                        <p className="font-sans text-xs text-stone">{formatTime(r.time)}</p>
                      </td>
                      <td className="px-4 py-3 font-sans text-sm text-cream">{r.partySize}</td>
                      <td className="px-4 py-3 font-sans text-xs text-mist">{r.occasion ?? "—"}</td>
                      <td className="px-4 py-3">
                        <Badge variant={STATUS_VARIANT[r.status]}>{r.status}</Badge>
                      </td>
                      <td className="px-4 py-3 font-sans text-xs text-stone">{formatRelativeDate(r.createdAt)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                          {r.status === "pending" && (
                            <button
                              title="Confirm"
                              onClick={() => updateStatus(r.id, "confirmed")}
                              className="p-1.5 rounded hover:bg-emerald-900/30 text-emerald-500 transition-colors"
                            >
                              <Check size={13} />
                            </button>
                          )}
                          {r.status !== "cancelled" && r.status !== "completed" && (
                            <button
                              title="Cancel"
                              onClick={() => updateStatus(r.id, "cancelled")}
                              className="p-1.5 rounded hover:bg-red-900/30 text-red-500 transition-colors"
                            >
                              <X size={13} />
                            </button>
                          )}
                          {r.status !== "no-show" && (
                            <button
                              title="No-Show"
                              onClick={() => updateStatus(r.id, "no-show")}
                              className="p-1.5 rounded hover:bg-ash text-stone hover:text-mist transition-colors"
                            >
                              <UserX size={13} />
                            </button>
                          )}
                          <button
                            title="Delete"
                            onClick={() => setConfirmDelete(r.id)}
                            className="p-1.5 rounded hover:bg-red-900/20 text-stone hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Reservation detail panel */}
      {selectedReservation && (
        <Modal
          isOpen={!!selectedReservation}
          onClose={() => setSelectedReservation(null)}
          title={`${selectedReservation.firstName} ${selectedReservation.lastName}`}
          size="md"
        >
          <div className="p-5 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3 text-xs font-sans">
              {[
                ["Confirmation ID", selectedReservation.id],
                ["Status", selectedReservation.status],
                ["Date", formatDate(selectedReservation.date)],
                ["Time", formatTime(selectedReservation.time)],
                ["Party Size", String(selectedReservation.partySize)],
                ["Email", selectedReservation.email],
                ["Phone", selectedReservation.phone],
                ["Occasion", selectedReservation.occasion ?? "None"],
                ["Seating", selectedReservation.seatingPreference ?? "No preference"],
              ].map(([l, v]) => (
                <div key={l}>
                  <p className="text-stone uppercase tracking-wider text-[10px]">{l}</p>
                  <p className="text-cream mt-0.5">{v}</p>
                </div>
              ))}
              {selectedReservation.dietaryRestrictions && (
                <div className="col-span-2">
                  <p className="text-stone uppercase tracking-wider text-[10px]">Dietary</p>
                  <p className="text-cream mt-0.5">{selectedReservation.dietaryRestrictions}</p>
                </div>
              )}
              {selectedReservation.specialRequests && (
                <div className="col-span-2">
                  <p className="text-stone uppercase tracking-wider text-[10px]">Special Requests</p>
                  <p className="text-cream mt-0.5">{selectedReservation.specialRequests}</p>
                </div>
              )}
            </div>

            {/* Status actions */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-ash">
              {STATUS_OPTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    updateStatus(selectedReservation.id, s);
                    setSelectedReservation({ ...selectedReservation, status: s });
                  }}
                  className={cn(
                    "font-sans text-[10px] tracking-widest uppercase px-2.5 py-1.5 rounded border transition-all",
                    selectedReservation.status === s
                      ? "border-gold bg-gold/15 text-gold"
                      : "border-slate text-mist hover:border-gold/40"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Admin notes */}
            <div className="flex flex-col gap-2">
              <label className="font-sans text-[10px] tracking-widest uppercase text-stone">Admin Notes</label>
              <textarea
                value={adminNotesText}
                onChange={(e) => setAdminNotesText(e.target.value)}
                rows={3}
                className="input-admin resize-none text-xs"
                placeholder="Internal notes about this reservation..."
              />
              <Button variant="outline" size="sm" onClick={saveNotes}>Save Notes</Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete confirmation */}
      <Modal isOpen={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Delete Reservation?" size="sm">
        <div className="p-5 flex flex-col gap-4">
          <p className="font-sans text-sm text-mist">This action cannot be undone. The reservation will be permanently deleted.</p>
          <div className="flex gap-3">
            <Button variant="ghost" size="md" fullWidth onClick={() => setConfirmDelete(null)}>Cancel</Button>
            <Button
              variant="danger"
              size="md"
              fullWidth
              onClick={() => {
                if (confirmDelete) deleteReservation(confirmDelete);
                setConfirmDelete(null);
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
