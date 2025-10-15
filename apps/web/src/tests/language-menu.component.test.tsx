import { expect, test, describe, vi } from "vitest";
import { screen, render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { LanguageMenu } from "@/components/main/navbar/language-menu";

vi.mock("@tanstack/react-router", () => ({
  useRouter: () => ({
    invalidate: vi.fn().mockResolvedValue(undefined),
  }),
}));

const startLanguageMenu = () => {
  const renderResult = render(<LanguageMenu />);
  const user = userEvent.setup();
  return {
    renderResult,
    user,
  };
};

describe("LanguageMenu Component", () => {
  test("Renders LanguageMenu and toggles menu", async () => {
    const { user } = startLanguageMenu();
    const menuBtn = screen.getByRole("button");

    await user.click(menuBtn);
    expect(screen.getByRole("list")).toBeInTheDocument();

    await user.click(menuBtn);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  test("Selects a language and updates localStorage", async () => {
    const { user } = startLanguageMenu();
    localStorage.setItem("preferred-language", "en");

    const menuBtn = screen.getByRole("button");
    await user.click(menuBtn);

    const portugueseItem = screen.getByRole("button", { name: /português/i });
    await user.click(portugueseItem);
    expect(localStorage.getItem("preferred-language")).toBe("pt");

    await user.click(menuBtn);
    const updatedPortugueseItem = screen.getByRole("button", {
      name: /português/i,
    });
    expect(updatedPortugueseItem).toBeDisabled();
  });

  test("Changes from portuguese to english", async () => {
    const { user } = startLanguageMenu();

    expect(localStorage.getItem("preferred-language")).toBe("pt");

    const menuBtn = screen.getByRole("button");
    await user.click(menuBtn);

    const englishItem = screen.getByRole("button", { name: /english/i });
    await user.click(englishItem);
    expect(localStorage.getItem("preferred-language")).toBe("en");

    await user.click(menuBtn);
    const updatedEnglishItem = screen.getByRole("button", {
      name: /english/i,
    });
    expect(updatedEnglishItem).toBeDisabled();
  });
});
