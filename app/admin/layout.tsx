import { AdminShell } from "@/src/features/admin/layout/admin-shell";

export const metadata = {
  title: "Admin | Hurghada Tourism",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AdminShell>{children}</AdminShell>;
}
