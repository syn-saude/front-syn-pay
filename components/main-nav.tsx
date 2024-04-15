import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import logo2 from "@/public/img/logo-2.png"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link
        href="/"
        className="flex items-center space-x-2 "
        style={{ width: "90px" }}
      >
        {/* <Icons.logo className="h-6 w-6" /> */}
        <Image src={logo2} alt="SynSaude" width={90} />
        {/* <span className="inline-block font-bold">{siteConfig.name}</span> */}
      </Link>

      {items?.length ? (
        <nav className="flex gap-6">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  )
}
