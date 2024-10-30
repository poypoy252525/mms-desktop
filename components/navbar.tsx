"use client";
import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import { Button } from "./ui/button";
import { LogOut, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { signOut } from "next-auth/react";

const Navbar = () => {
  const { setTheme, theme } = useTheme();
  return (
    <header className="flex w-full items-center p-2 sticky top-0 bg-background/75 backdrop-blur-sm justify-between z-50">
      <SidebarTrigger />
      <div className="flex items-center space-x-2">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          <Moon />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          <LogOut />
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
