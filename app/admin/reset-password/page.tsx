import { ResetPasswordPage } from "@/src/features/admin/auth/components/reset-password-page";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ token?: string | string[] }>;
}) {
  const params = await searchParams;
  const token = Array.isArray(params.token) ? params.token[0] : params.token;

  return <ResetPasswordPage initialToken={token ?? ""} />;
}
