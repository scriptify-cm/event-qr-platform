"use client";

import { ThemeProvider } from "next-themes";
import { useLanguage } from "@/lib/hooks/use-language";
import { useState, useEffect, createContext, type ReactNode } from "react";
import { Toaster } from "sonner";

type LanguageContextType = {
  language: string;
  setLanguage: (lang: 'en' | 'fr') => void;
  toggleLanguage: () => void;
};

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  toggleLanguage: () => {},
});

export function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const languageHook = useLanguage();

  // Hydration fix
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <LanguageContext.Provider value={languageHook}>
        <Toaster position="top-center" richColors closeButton />
        {children}
      </LanguageContext.Provider>
    </ThemeProvider>
  );
}
