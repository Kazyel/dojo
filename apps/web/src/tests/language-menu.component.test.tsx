import { expect, test, describe, vi } from "vitest";

import { screen, render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { LanguageMenu } from "@/components/main/navbar/language-menu";

const startLanguageMenu = () => {
  const rendered = render(<LanguageMenu />);
  const user = userEvent.setup();
  return {
    rendered,
    user,
  };
};

describe("LanguageMenu Component", () => {
  test("Renders LanguageMenu and toggles menu", async () => {
    const { user } = startLanguageMenu();
    const langBtn = screen.getByRole("button");

    await user.click(langBtn);
    expect(screen.getByRole("list")).toBeInTheDocument();

    await user.click(langBtn);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  test("Selects a language and reloads the page", async () => {
    const { user } = startLanguageMenu();
    const langBtn = screen.getByRole("button");

    const reloadMock = vi.fn();
    delete (window as any).location;
    (window as any).location = { reload: reloadMock };

    await user.click(langBtn);
    const englishItem = screen.getByText("English");
    await user.click(englishItem);

    expect(localStorage.getItem("preferred-language")).toBe("en");
    expect(reloadMock).toHaveBeenCalled();

    await user.click(langBtn);
    const portugueseItem = screen.getByText("Português");
    await user.click(portugueseItem);

    expect(localStorage.getItem("preferred-language")).toBe("pt");
    expect(reloadMock).toHaveBeenCalled();
  });
});
