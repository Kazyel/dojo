import { Github } from "@/components/svg/github";
import { LinkedIn } from "@/components/svg/linkedin";
import { Portfolio } from "@/components/svg/terminal";

export function Footer() {
  return (
    <footer className="w-full border-t border-foreground/15 mt-16 mb-6">
      <div className="mx-auto flex flex-col gap-y-5 items-center justify-center max-w-5xl px-6 py-10 md:px-8 text-center">
        <p className="text-sm text-foreground/80 font-merriweather">
          &copy; {new Date().getFullYear()} Kazyel. All rights reserved.
        </p>

        <div className="flex justify-center items-center gap-x-7">
          <a href="https://github.com/Kazyel" target="_blank" rel="noreferrer">
            <Github className="size-6 shrink-0 cursor-pointer text-foreground/75 hover:text-foreground transition-all duration-150" />
          </a>

          <a
            href="https://www.linkedin.com/in/mateusmascarelo"
            target="_blank"
            rel="noreferrer"
          >
            <LinkedIn className="size-6 shrink-0 cursor-pointer text-foreground/75 hover:text-foreground transition-all duration-150" />
          </a>

          <a href="https://kazyel.dev/" target="_blank" rel="noreferrer">
            <Portfolio className="size-7 shrink-0 cursor-pointer text-foreground/75 hover:text-foreground transition-all duration-150" />
          </a>
        </div>
      </div>
    </footer>
  );
}
