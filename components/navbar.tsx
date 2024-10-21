"use client";
import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import { Button } from "./ui/button";
import { Moon } from "lucide-react";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { setTheme, theme } = useTheme();
  return (
    <header className="flex w-full items-center p-2 sticky top-0 bg-background/75 backdrop-blur-sm">
      <SidebarTrigger />
      <Button
        size="icon"
        variant="ghost"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="ml-auto"
      >
        <Moon />
      </Button>
    </header>
  );
};

export default Navbar;
