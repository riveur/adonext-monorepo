"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export const ToggleThemeButton = React.forwardRef<
  React.ElementRef<typeof Button>,
  Omit<React.ComponentPropsWithoutRef<typeof Button>, 'onClick'>
>((props, ref) => {
  const { setTheme, theme, systemTheme } = useTheme();

  const realTheme = theme === "system" ? systemTheme : theme;

  return (
    <Button
      ref={ref}
      variant="outline"
      size="icon"
      {...props}
      onClick={() => setTheme(realTheme === 'dark' ? 'light' : 'dark')}
    >
      <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
});

ToggleThemeButton.displayName = "ToggleThemeButton";
