import Link from "next/link";

export default function AdminNotFound() {
  return (
    <main className="grid min-h-screen flex-1 place-items-center bg-[#f5f9ff] px-5 text-center">
      <div className="max-w-[460px]">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-ocean)]">
          404
        </p>
        <h1 className="mt-3 text-3xl font-bold text-[var(--color-deep-ocean)] sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-4 text-base leading-[1.7] text-[var(--color-muted)]">
          The admin page you requested is not available.
        </p>
        <Link
          className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-[var(--color-ocean)] px-5 text-sm font-bold text-white transition hover:bg-[var(--color-deep-ocean)]"
          href="/"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
