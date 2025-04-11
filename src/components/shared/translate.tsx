"use client";

import { useContext } from "react";
import { LanguageContext } from "@/components/layout/providers";
import { getTranslation } from "@/lib/translations";

interface TranslateProps {
  text: string;
  className?: string;
}

export function Translate({ text, className }: TranslateProps) {
  const { language } = useContext(LanguageContext);
  return <span className={className}>{getTranslation(text, language)}</span>;
}
