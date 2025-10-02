import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/__posts")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="container mx-auto max-w-5xl px-8 py-6 font-merriweather">
      <Outlet />
    </div>
  );
}
