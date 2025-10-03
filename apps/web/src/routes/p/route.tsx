import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/p")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mx-auto max-w-5xl p-8 font-merriweather prose-sm">
      <Outlet />
    </div>
  );
}
