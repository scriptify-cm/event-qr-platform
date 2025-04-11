"use client";

import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { LanguageContext } from "@/components/layout/providers";

export function LanguageToggle() {
  const { language, toggleLanguage } = useContext(LanguageContext);

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="rounded-full font-semibold"
    >
      {language === "en" ? "FR" : "EN"}
    </Button>
  );
}
