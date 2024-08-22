"use client";
import { Button } from "@/components/ui/button";
import { Bell, BrickWall, Gauge, HeartOff, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

const Sidebar = () => {
  const pathname = usePathname();
  const navigations: { label: string; path: string; icon: ReactNode }[] = [
    { label: "Dashboard", path: "/", icon: <Gauge className="h-4 w-4" /> },
    { label: "Users", path: "/users", icon: <Users className="h-4 w-4" /> },
    {
      label: "Mga patay",
      path: "/deaths",
      icon: <HeartOff className="h-4 w-4" />,
    },
    {
      label: "Facilities???",
      path: "/facilities",
      icon: <HeartOff className="h-4 w-4" />,
    },
  ];

  return (
    <div className="h-screen lg:w-[280px] border-r bg-muted/40 fixed">
      <header className="flex items-center justify-between h-[60px] w-full border-b lg:px-6">
        <Link href="/" className="flex gap-3 transition-all font-semibold">
          <BrickWall />
          MMS
        </Link>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <Bell className="h-4 w-4" />
        </Button>
      </header>
      <div className="flex-1">
        <nav className="h-full w-full text-sm font-medium lg:px-4 py-3">
          {navigations.map((navigation, index) => (
            <Link
              key={index}
              href={navigation.path}
              className={
                "flex items-center gap-3 py-2 px-3 rounded-lg hover:text-primary transition-all " +
                (navigation.path === pathname
                  ? "text-primary bg-muted"
                  : "text-muted-foreground")
              }
            >
              {navigation.icon}
              {navigation.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
