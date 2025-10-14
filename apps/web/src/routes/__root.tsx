import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import {
  HeadContent,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";

import { Navbar } from "@/components/main/navbar";
import { Footer } from "@/components/main/footer";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

import "@/index.css";

export interface RouterAppContext {
  language: string;
}

export const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English" },
  { code: "pt", name: "Português" },
] as const;

const getUserLanguage = (): string => {
  if (localStorage.getItem("preferred-language")) {
    return localStorage.getItem("preferred-language")!;
  }

  const detected = navigator.language.split("-")[0];

  if (SUPPORTED_LANGUAGES.map((lang) => lang.code).includes(detected as any)) {
    return detected;
  }
  return "en";
};

export const Route = createRootRouteWithContext<RouterAppContext>()({
  beforeLoad: () => {
    const language = getUserLanguage();
    return { language };
  },
  component: RootComponent,
  head: () => ({
    meta: [
      {
        title: "Dojo",
      },
      {
        name: "description",
        content: "blog is a web application",
      },
    ],
    links: [
      {
        rel: "icon",
        href: "/favicon.ico",
      },
    ],
  }),
});

function RootComponent() {
  return (
    <>
      <HeadContent />

      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        disableTransitionOnChange
        storageKey="vite-ui-theme"
      >
        <Navbar />
        <Outlet />
        <Footer />

        <Toaster richColors />
      </ThemeProvider>

      <TanStackRouterDevtools position="bottom-left" />
    </>
  );
}
