"use client";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

const ThemeToggler = () => {
  const { setTheme, theme } = useTheme();
  const [myTheme, setMyTheme] = useState<string>();
  useEffect(() => {
    setMyTheme(theme);
  }, [theme]);

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
    >
      {myTheme === "light" ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </Button>
  );
};

export default ThemeToggler;
