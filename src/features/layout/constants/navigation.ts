export interface NavItem {
  label: string;
  labelKey: string;
  href: string;
  hasMenu?: boolean;
  menuType?: "categories" | "destinations";
}

export const navItems: readonly NavItem[] = [
  { label: "Home", labelKey: "home", href: "/" },
  { label: "Tours", labelKey: "trips", href: "/trips" },
  {
    label: "Categories",
    labelKey: "categories",
    href: "/trips",
    hasMenu: true,
    menuType: "categories",
  },
  {
    label: "Destinations",
    labelKey: "destinations",
    href: "/Destinations",
    hasMenu: true,
    menuType: "destinations",
  },
  { label: "Blog", labelKey: "blogs", href: "/blogs" },
  { label: "FAQs", labelKey: "faq", href: "/faq" },
  { label: "Contact", labelKey: "contact", href: "/contact-us" },
] as const;
