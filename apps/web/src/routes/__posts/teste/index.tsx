import { createFileRoute } from "@tanstack/react-router";
import Content from "./content.mdx";

export const Route = createFileRoute("/__posts/teste/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Content />;
}
