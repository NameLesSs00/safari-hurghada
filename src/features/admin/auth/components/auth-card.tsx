import Image from "next/image";

export function AuthCard({
  children,
  eyebrow,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <section className="grid min-h-full bg-[#f5f9ff] px-5 py-8 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-0 lg:py-0">
      <div className="relative hidden overflow-hidden bg-[var(--color-deep-ocean)] lg:block">
        <Image
          src="/Hero/boat.webp"
          alt="Luxury yacht experience"
          fill
          priority
          sizes="50vw"
          className="object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,69,96,0.88),rgba(0,105,147,0.48))]" />
        <div className="relative z-10 flex h-full flex-col justify-between p-12 text-white">
          <div className="flex items-center justify-center">
            <div className="flex h-40 w-40 items-center justify-center rounded-full bg-white p-4 shadow-xl">
              <Image
                src="/Logo.png"
                alt="SunnySide Tours Admin"
                width={120}
                height={26}
                unoptimized
                className="h-auto w-[120px]"
              />
            </div>
          </div>
          <div className="max-w-[520px]">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-white/72">
              Admin workspace
            </p>
            <h1 className="text-5xl font-bold leading-[1.05]">
              Manage travel experiences with clarity.
            </h1>
            <p className="mt-5 text-lg leading-[1.7] text-white/78">
              Secure access for keeping tours, content, and daily operations in
              one calm dashboard.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center lg:min-h-screen">
        <div className="w-full max-w-[440px] rounded-lg border border-black/5 bg-white p-6 shadow-[0_20px_60px_rgba(0,69,96,0.12)] sm:p-8">
          <div className="mb-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-ocean)]">
              {eyebrow}
            </p>
            <h2 className="text-3xl font-bold leading-tight text-[var(--color-deep-ocean)]">
              {title}
            </h2>
            <p className="mt-3 text-base leading-[1.7] text-[var(--color-muted)]">
              {subtitle}
            </p>
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}
