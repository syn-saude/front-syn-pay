import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import logo2 from "@/public/img/logo-2.png"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

import { Badge } from "./ui/badge"

const { version } = require("../package.json")

interface MainNavProps {
  items?: NavItem[]
  vertical?: boolean
}

export function MainNav({ items, vertical = false }: MainNavProps) {
  return (
    <div className={`flex gap-6 ${vertical && "flex-col"} md:gap-10`}>
      <Link
        href="/financiamentos"
        className="flex items-center space-x-2 mr-2"
        style={{ width: "130px" }}
      >
        {/* <Icons.logo className="h-6 w-6" /> */}
        <Image src={logo2} alt="SynSaude" width={90} />
        {/* <div className=" flex items-center justify-center text-primary  top-5 left-20 rounded-md px-1 bg-primary h-4">
          <span style={{ fontSize: 10 }}>v{version}</span>
        </div> */}
        <Badge variant="outline">v{version}</Badge>
        <div className="text-muted mr-2 text-lg opacity-50">/</div>
        {/* <span className="inline-block font-bold">{siteConfig.name}</span> */}
      </Link>

      {items?.length ? (
        <nav className={`flex  ${vertical && "flex-col"} gap-6 w-max`}>
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
