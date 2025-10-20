import {
  HeadContent,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { ThemeProvider } from "@/lib/providers/theme-provider";
import { getUserLanguage } from "@/lib/utils";

import { Navbar } from "@/components/main/navbar/navbar";
import { Footer } from "@/components/main/footer";
import { Toaster } from "@/components/ui/sonner";

export interface RouterAppContext {
  language: string;
}

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
