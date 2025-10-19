import { RouterProvider, createRouter } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import { routeTree } from "@/routeTree.gen";

import Loader from "@/components/main/loader";
import { NotFound } from "@/components/main/not-found";

import "@/lib/i18n/i18n.ts";
import "@/index.css"

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  context: {
    language: "en",
  },
  defaultPendingComponent: () => <Loader />,
  defaultNotFoundComponent: () => <NotFound />,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("app");

if (!rootElement) {
  throw new Error("Root element not found");
}

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<RouterProvider router={router} />);
}
