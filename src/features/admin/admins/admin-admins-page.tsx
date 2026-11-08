"use client";

import { ChevronLeft, ChevronRight, CircleHelp, Loader2, Pencil, Plus, Trash2, X, Check } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { useAdminsQuery, useCreateAdminMutation, useDeleteAdminMutation, useUpdateAdminMutation } from "./hooks";
import type { Admin } from "./types";
import { getStoredAuthSession, getUserFromSession } from "@/src/features/admin/auth/storage";

const pageSizes = [10, 20, 50];

function getErrorText(err: unknown, fallback: string) {
  return err instanceof Error ? err.message : fallback;
}

export function AdminAdminsPage() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [search, setSearch] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [editing, setEditing] = useState<Admin | null>(null);
  const [toDelete, setToDelete] = useState<Admin | null>(null);

  const adminsQuery = useAdminsQuery({ pageNumber, pageSize, search });
  const createMutation = useCreateAdminMutation();
  const updateMutation = useUpdateAdminMutation();
  const deleteMutation = useDeleteAdminMutation();

  const [currentUserEmail, setCurrentUserEmail] = useState<string | undefined>();
  useEffect(() => {
    const session = getStoredAuthSession();
    setCurrentUserEmail(getUserFromSession(session).email);
  }, []);

  const admins = adminsQuery.data?.data ?? [];
  const hasNextPage = (admins?.length ?? 0) >= pageSize;

  const queryError = useMemo(() => (adminsQuery.error ? getErrorText(adminsQuery.error, "Unable to load admins.") : ""), [adminsQuery.error]);

  function handleDeleteConfirm() {
    if (!toDelete) return;
    deleteMutation.mutate(toDelete.id, { onSuccess: () => setToDelete(null) });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-ocean)]">Content manager</p>
          <h1 className="mt-2 text-3xl font-bold text-[var(--color-deep-ocean)] sm:text-4xl">Admins</h1>
          <p className="mt-3 max-w-[680px] text-base leading-[1.7] text-[var(--color-muted)]">Manage administrative users, roles, and contact information used to access the admin dashboard.</p>
        </div>

        <button className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[var(--color-ocean)] px-4 text-sm font-bold text-white transition hover:bg-[var(--color-deep-ocean)] sm:w-fit" onClick={() => setIsCreating(true)} type="button">
          <Plus size={18} />
          <span>Add admin</span>
        </button>
      </div>

      <section className="rounded-lg border border-black/5 bg-white p-4 shadow-[0_12px_30px_rgba(0,69,96,0.08)]">
        <div className="grid gap-3 sm:grid-cols-[1fr_150px] lg:w-[480px]">
          <input
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => { setPageNumber(1); setSearch(e.target.value); }}
            className="h-11 rounded-lg border border-black/10 bg-white px-3 text-sm font-semibold text-[var(--color-deep-ocean)] outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-[rgba(0,105,147,0.12)]"
          />

          <select
            className="h-11 rounded-lg border border-black/10 bg-white px-3 text-sm font-semibold text-[var(--color-deep-ocean)] outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-[rgba(0,105,147,0.12)]"
            onChange={(event) => {
              setPageNumber(1);
              setPageSize(Number(event.target.value));
            }}
            value={pageSize}
          >
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size} per page
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="overflow-hidden rounded-lg border border-black/5 bg-white shadow-[0_12px_30px_rgba(0,69,96,0.08)]">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <p className="text-sm font-bold text-[var(--color-deep-ocean)]">Admin list</p>
          {adminsQuery.isFetching ? (<span className="text-xs"><Loader2 className="animate-spin inline" size={14} /> Updating</span>) : null}
        </div>

        {queryError ? (<div className="p-4"><div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{queryError}</div></div>) : null}

        {!queryError && adminsQuery.isLoading ? (
          <div className="grid min-h-[200px] place-items-center text-[var(--color-deep-ocean)]">
            <div className="flex items-center gap-3 text-sm font-semibold"><Loader2 className="animate-spin" size={20} /> <span>Loading admins</span></div>
          </div>
        ) : null}

        {!queryError && !adminsQuery.isLoading && admins.length === 0 ? (
          <div className="grid min-h-[320px] place-items-center px-4 py-12 text-center">
            <div>
              <CircleHelp className="mx-auto text-[var(--color-ocean)]" size={34} />
              <h2 className="mt-4 text-xl font-bold text-[var(--color-deep-ocean)]">No admins found</h2>
              <p className="mt-2 text-sm text-[var(--color-muted)]">Create the first admin to get started.</p>
            </div>
          </div>
        ) : null}

        {!queryError && admins.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[780px] border-collapse text-left">
              <thead className="bg-[#f5f9ff] text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {admins.map((a) => (
                  <tr key={a.id}>
                    <td className="max-w-[320px] px-4 py-4">
                      <p className="line-clamp-2 text-sm font-bold leading-[1.6] text-[var(--color-deep-ocean)]">{a.firstName} {a.lastName}</p>
                    </td>
                    <td className="max-w-[420px] px-4 py-4">
                      <p className="line-clamp-2 text-sm leading-[1.6] text-[var(--color-muted)]">{a.email}</p>
                    </td>
                    <td className="px-4 py-4 text-sm font-semibold text-[var(--foreground)]">{a.role ?? "Admin"}</td>
                    <td className="px-4 py-4 text-sm font-semibold text-[var(--foreground)]">{a.phone ?? "-"}</td>
                    <td className="px-4 py-4 text-sm font-semibold text-[var(--foreground)]">{a.id}</td>
                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-2">
                        <button aria-label={`Edit ${a.id}`} className="grid size-9 place-items-center rounded-lg border border-black/10 text-[var(--color-deep-ocean)] transition hover:border-[var(--color-ocean)] hover:text-[var(--color-ocean)]" onClick={() => setEditing(a)} type="button"><Pencil size={17} /></button>
                        {a.email !== currentUserEmail ? (
                          <button aria-label={`Delete ${a.id}`} className="grid size-9 place-items-center rounded-lg border border-red-200 text-red-600 transition hover:bg-red-50" onClick={() => setToDelete(a)} type="button"><Trash2 size={17} /></button>
                        ) : (
                          <div className="grid size-9 place-items-center rounded-lg border border-black/5 text-black/20" title="You cannot delete yourself" aria-hidden="true"><Trash2 size={17} /></div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        <div className="flex flex-col gap-3 border-t border-black/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[var(--color-muted)]">Page {pageNumber}</p>
          <div className="flex gap-2">
            <button
              className="flex h-10 items-center gap-2 rounded-lg border border-black/10 px-3 text-sm font-bold text-[var(--color-deep-ocean)] transition hover:border-[var(--color-ocean)] disabled:cursor-not-allowed disabled:opacity-50"
              disabled={pageNumber === 1 || adminsQuery.isFetching}
              onClick={() => setPageNumber((current) => Math.max(1, current - 1))}
              type="button"
            >
              <ChevronLeft size={17} />
              <span>Previous</span>
            </button>
            <button
              className="flex h-10 items-center gap-2 rounded-lg border border-black/10 px-3 text-sm font-bold text-[var(--color-deep-ocean)] transition hover:border-[var(--color-ocean)] disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!hasNextPage || adminsQuery.isFetching}
              onClick={() => setPageNumber((current) => current + 1)}
              type="button"
            >
              <span>Next</span>
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </section>

      {isCreating ? (
        <AdminFormModal key="create" mode="create" onClose={() => setIsCreating(false)} onCreate={(values) => createMutation.mutate(values, { onSuccess: () => setIsCreating(false) })} isPending={createMutation.isPending} error={getErrorText(createMutation.error, "")} />
      ) : null}

      {editing ? (
        <AdminFormModal key={editing.id} admin={editing} mode="edit" onClose={() => setEditing(null)} onUpdate={(values) => updateMutation.mutate(values, { onSuccess: () => setEditing(null) })} isPending={updateMutation.isPending} error={getErrorText(updateMutation.error, "")} />
      ) : null}

      {toDelete ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 px-4 py-6">
          <section className="w-full max-w-[460px] rounded-lg bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-ocean)]">Content manager</p>
                <h3 className="mt-1 text-xl font-bold text-[var(--color-deep-ocean)]">Delete admin</h3>
              </div>
              <button aria-label="Close" className="grid size-9 place-items-center rounded-lg border border-black/10 text-[var(--color-deep-ocean)] transition hover:bg-black/5" onClick={() => setToDelete(null)} type="button">
                <X size={18} />
              </button>
            </div>
            
            <div className="p-5">
              <p className="text-sm text-[var(--color-muted)]">Are you sure you want to delete <span className="font-semibold text-[var(--color-deep-ocean)]">{toDelete.firstName} {toDelete.lastName}</span>?</p>
              
              <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <button className="h-11 rounded-lg border border-black/10 px-4 text-sm font-bold text-[var(--color-deep-ocean)] transition hover:border-[var(--color-ocean)]" onClick={() => setToDelete(null)} type="button">Cancel</button>
                <button className="flex h-11 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70" onClick={handleDeleteConfirm} disabled={deleteMutation.isPending} type="button">
                  {deleteMutation.isPending ? <Loader2 className="animate-spin" size={18} /> : <Trash2 size={18} />}
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}

function AdminFormModal({ admin, mode, onClose, onCreate, onUpdate, isPending, error }: {
  admin?: Admin;
  mode: "create" | "edit";
  onClose: () => void;
  onCreate?: (v: any) => void;
  onUpdate?: (v: any) => void;
  isPending?: boolean;
  error?: string;
}) {
  const isEdit = mode === "edit";
  const [firstName, setFirstName] = useState(admin?.firstName ?? "");
  const [lastName, setLastName] = useState(admin?.lastName ?? "");
  const [email, setEmail] = useState(admin?.email ?? "");
  const [phone, setPhone] = useState(admin?.phone ?? "");
  const [role, setRole] = useState(admin?.role ?? "Admin");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (isEdit) {
      onUpdate?.({ id: admin!.id, firstName, lastName, phone, role });
    } else {
      onCreate?.({ firstName, lastName, email, phone, role, password });
    }
  }

  return (
    <AdminModalFrame eyebrow="Content manager" title={isEdit ? 'Edit admin' : 'Create admin'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-5 p-5">
        {error ? <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[var(--color-deep-ocean)]">First name <span className="text-red-600">*</span></span>
            <input required value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="e.g. John" className="h-11 w-full rounded-lg border border-black/10 px-3 text-sm outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-[rgba(0,105,147,0.12)]" />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[var(--color-deep-ocean)]">Last name <span className="text-red-600">*</span></span>
            <input required value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="e.g. Doe" className="h-11 w-full rounded-lg border border-black/10 px-3 text-sm outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-[rgba(0,105,147,0.12)]" />
          </label>
        </div>

        {!isEdit ? (
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[var(--color-deep-ocean)]">Email address <span className="text-red-600">*</span></span>
            <input required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" type="email" className="h-11 w-full rounded-lg border border-black/10 px-3 text-sm outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-[rgba(0,105,147,0.12)]" />
          </label>
        ) : null}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[var(--color-deep-ocean)]">Phone number</span>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 234 567 890" className="h-11 w-full rounded-lg border border-black/10 px-3 text-sm outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-[rgba(0,105,147,0.12)]" />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[var(--color-deep-ocean)]">Role</span>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="h-11 w-full rounded-lg border border-black/10 px-3 text-sm outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-[rgba(0,105,147,0.12)]">
              <option value="Admin">Admin</option>
              <option value="AdminManager">Admin Manager</option>
              <option value="SuperAdmin">Super Admin</option>
            </select>
          </label>
        </div>

        {!isEdit ? (
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[var(--color-deep-ocean)]">Password <span className="text-red-600">*</span></span>
            <input required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" type="password" className="h-11 w-full rounded-lg border border-black/10 px-3 text-sm outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-[rgba(0,105,147,0.12)]" />
          </label>
        ) : null}

        <div className="flex flex-col-reverse gap-2 border-t border-black/5 pt-5 sm:flex-row sm:justify-end">
          <button type="button" className="h-11 rounded-lg border border-black/10 px-4 text-sm font-bold text-[var(--color-deep-ocean)] transition hover:border-[var(--color-ocean)]" onClick={onClose}>Cancel</button>
          <button type="submit" className="flex h-11 items-center justify-center gap-2 rounded-lg bg-[var(--color-ocean)] px-4 text-sm font-bold text-white transition hover:bg-[var(--color-deep-ocean)] disabled:cursor-not-allowed disabled:opacity-70" disabled={isPending}>
            {isPending ? <Loader2 className="animate-spin" size={18} /> : <Check size={18} />}
            <span>{isEdit ? 'Save changes' : 'Create admin'}</span>
          </button>
        </div>
      </form>
    </AdminModalFrame>
  );
}

function AdminModalFrame({ children, eyebrow, onClose, title }: { children: React.ReactNode; eyebrow: string; onClose: () => void; title: string; }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/35 px-4 py-6">
      <section className="max-h-full w-full max-w-[620px] overflow-y-auto rounded-lg bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-ocean)]">{eyebrow}</p>
            <h2 className="mt-1 text-xl font-bold text-[var(--color-deep-ocean)]">{title}</h2>
          </div>
          <button aria-label="Close modal" className="grid size-9 place-items-center rounded-lg border border-black/10 text-[var(--color-deep-ocean)] transition hover:bg-black/5" onClick={onClose} type="button">
            <X size={18} />
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}
