export interface NavItem {
  label: string;
  labelKey: string;
  href: string;
  hasMenu?: boolean;
  menuType?: "destinations";
}

export const navItems: readonly NavItem[] = [
  { label: "Home", labelKey: "home", href: "/" },
  { label: "Tours", labelKey: "trips", href: "/trips" },
  {
    label: "Destinations",
    labelKey: "destinations",
    href: "/destinations",
    hasMenu: true,
    menuType: "destinations",
  },
  { label: "Gallery", labelKey: "gallery", href: "/gallery" },
  { label: "Blog", labelKey: "blogs", href: "/blogs" },
  { label: "FAQs", labelKey: "faq", href: "/faq" },
  { label: "Contact", labelKey: "contact", href: "/contact-us" },
] as const;
