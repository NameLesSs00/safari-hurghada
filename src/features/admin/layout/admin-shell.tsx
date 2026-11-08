"use client";

import {
  CalendarCheck,
  LayoutDashboard,
  Loader2,
  LogOut,
  MapPinned,
  CircleHelp,
  Images,
  Menu,
  Newspaper,
  MessageSquareText,
  Tags,
  Route,
  Ticket,
  X,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound, usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { ensureAdminSession } from "@/src/features/admin/auth/api";
import { getUserFromSession } from "@/src/features/admin/auth/storage";
import { useLogoutMutation } from "@/src/features/admin/auth/hooks";
import type { AuthSession } from "@/src/features/admin/auth/types";

const authRoutes = new Set([
  "/admin/login",
  "/admin/forgot-password",
  "/admin/reset-password",
]);

const navItems = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/destinations",
    label: "Destinations",
    icon: MapPinned,
  },
  {
    href: "/admin/faq",
    label: "FAQ",
    icon: CircleHelp,
  },
  {
    href: "/admin/trip-types",
    label: "Trip Types",
    icon: Tags,
  },
  {
    href: "/admin/trips",
    label: "Trips",
    icon: Route,
  },
  {
    href: "/admin/promo-codes",
    label: "Promo Codes",
    icon: Ticket,
  },
  {
    href: "/admin/bookings",
    label: "Bookings",
    icon: CalendarCheck,
  },
  {
    href: "/admin/reviews",
    label: "Reviews",
    icon: MessageSquareText,
  },
  {
    href: "/admin/blogs",
    label: "Blogs",
    icon: Newspaper,
  },
  {
    href: "/admin/gallery",
    label: "Gallery",
    icon: Images,
  },
  {
    href: "/admin/users",
    label: "Admin / Users",
    icon: Users,
  },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const logoutMutation = useLogoutMutation();
  const [sessionState, setSessionState] = useState<{
    pathname: string;
    session: AuthSession | null;
  } | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isAuthRoute = useMemo(() => authRoutes.has(pathname), [pathname]);
  const isCheckingCurrentRoute = sessionState?.pathname !== pathname;
  const session = isCheckingCurrentRoute
    ? undefined
    : sessionState?.session;

  useEffect(() => {
    let isMounted = true;

    if (isAuthRoute) {
      ensureAdminSession().then((activeSession) => {
        if (!isMounted) {
          return;
        }

        if (activeSession) {
          setSessionState({ pathname, session: activeSession });
          router.replace("/admin/dashboard");
        } else {
          setSessionState({ pathname, session: null });
        }
      });

      return;
    }

    ensureAdminSession().then((activeSession) => {
      if (!isMounted) {
        return;
      }

      if (!activeSession) {
        setSessionState({ pathname, session: null });
        return;
      }

      setSessionState({ pathname, session: activeSession });
    });

    return () => {
      isMounted = false;
    };
  }, [isAuthRoute, pathname, router]);

  function handleLogout() {
    logoutMutation.mutate(undefined, {
      onSettled: () => {
        router.replace("/admin/login");
      },
    });
  }

  if (isAuthRoute) {
    if (session === null) {
      return <main className="min-h-screen flex-1">{children}</main>;
    }

    return <AdminSessionLoader />;
  }

  if (session === undefined) {
    return <AdminSessionLoader />;
  }

  if (session === null) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-1 bg-[#f5f9ff]">
      <aside className="hidden w-[280px] shrink-0 border-r border-black/5 bg-white px-5 py-6 lg:flex lg:flex-col">
        <AdminSidebar
          isLoggingOut={logoutMutation.isPending}
          onNavigate={() => setIsMobileOpen(false)}
          onLogout={handleLogout}
          pathname={pathname}
          role={session?.role}
          userName={getUserFromSession(session).name}
          userEmail={getUserFromSession(session).email}
        />
      </aside>

      {isMobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close admin menu"
            className="absolute inset-0 bg-black/35"
            onClick={() => setIsMobileOpen(false)}
            type="button"
          />
          <aside className="relative flex h-full w-[280px] flex-col bg-white px-5 py-6 shadow-2xl">
            <AdminSidebar
              isLoggingOut={logoutMutation.isPending}
              onNavigate={() => setIsMobileOpen(false)}
              onLogout={handleLogout}
              pathname={pathname}
              role={session?.role}
              userName={getUserFromSession(session).name}
              userEmail={getUserFromSession(session).email}
            />
          </aside>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-black/5 bg-white px-4 sm:px-6 lg:hidden">
          <Link href="/admin/dashboard" aria-label="Admin dashboard">
            <Image
              src="/Logo.png"
              alt="Hurghada Tourism"
              width={130}
              height={29}
              unoptimized
              className="h-auto w-[130px]"
            />
          </Link>
          <button
            aria-label={isMobileOpen ? "Close admin menu" : "Open admin menu"}
            className="grid size-10 place-items-center rounded-lg border border-black/10 text-[var(--color-deep-ocean)]"
            onClick={() => setIsMobileOpen((current) => !current)}
            type="button"
          >
            {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}

function AdminSessionLoader() {
  return (
    <main className="grid min-h-screen flex-1 place-items-center bg-[#f5f9ff] text-[var(--color-deep-ocean)]">
      <div className="flex items-center gap-3 text-base font-semibold">
        <Loader2 className="animate-spin" size={22} />
        <span>Checking session</span>
      </div>
    </main>
  );
}

function AdminSidebar({
  isLoggingOut,
  onNavigate,
  onLogout,
  pathname,
  role,
  userName,
  userEmail,
}: {
  isLoggingOut: boolean;
  onNavigate: () => void;
  onLogout: () => void;
  pathname: string;
  role?: string;
  userName?: string | undefined;
  userEmail?: string | undefined;
}) {
  return (
    <>
      <div>
        <Link href="/admin/dashboard" aria-label="Admin dashboard">
          <Image
            src="/Logo.png"
            alt="Hurghada Tourism"
            width={154}
            height={34}
            unoptimized
            className="h-auto w-[154px]"
          />
        </Link>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-ocean)]">Admin panel</p>
        <p className="mt-2 text-sm text-[var(--color-deep-ocean)]">
          {userName ?? userEmail ?? role ?? "Admin"}
        </p>
      </div>

      <nav className="mt-8 flex flex-1 flex-col gap-2" aria-label="Admin">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              className={`flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-semibold transition ${
                isActive
                  ? "bg-[var(--color-ocean)] text-white"
                  : "text-[var(--color-muted)] hover:bg-[#f5f9ff] hover:text-[var(--color-deep-ocean)]"
              }`}
              href={item.href}
              key={item.href}
              onClick={onNavigate}
            >
              <Icon size={19} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <button
        className="mt-6 flex h-11 items-center justify-center gap-2 rounded-lg border border-black/10 px-3 text-sm font-bold text-[var(--color-deep-ocean)] transition hover:border-[var(--color-ocean)] hover:text-[var(--color-ocean)] disabled:cursor-not-allowed disabled:opacity-70"
        disabled={isLoggingOut}
        onClick={onLogout}
        type="button"
      >
        {isLoggingOut ? (
          <Loader2 className="animate-spin" size={18} />
        ) : (
          <LogOut size={18} />
        )}
        <span>Logout</span>
      </button>
    </>
  );
}
