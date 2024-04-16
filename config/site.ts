export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Syn Pay",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    // {
    //   title: "Home",
    //   href: "/",
    // },
    {
      title: "Financiamentos",
      href: "/signup",
    },
    {
      title: "Recebedores",
      href: "/signup",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}
