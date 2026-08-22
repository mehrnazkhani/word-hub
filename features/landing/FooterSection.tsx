import Image from "next/image";

const socialMediaIcons = [
  { src: "/discord.svg", alt: "Discord", href: "https://discord.com" },
  { src: "/github.svg", alt: "Github", href: "https://github.com" },
  { src: "/gmail.svg", alt: "Gmail", href: "mailto:hello@wordhub.com" },
  { src: "/instagram.svg", alt: "Instagram", href: "https://instagram.com" },
  { src: "/x.svg", alt: "X", href: "https://x.com" },
  { src: "/telegram.svg", alt: "Telegram", href: "https://telegram.org" },
  { src: "/reddit.svg", alt: "Reddit", href: "https://reddit.com" },
];

export const FooterSection = () => {
  return (
    <footer className="mx-auto flex max-w-5xl items-center justify-between pb-20">
      <div className="space-y-10">
        <div className="space-y-2">
          <p className="text-xl font-bold">WORD HUB</p>
          <p className="text-lg font-semibold">
            Build your vocabulary. Remember every word.
          </p>
        </div>

        <p className="w-xl text-accent-foreground/60">
          Word Hub helps you organize words, create personal collections, and
          practice smarter with interactive learning modes.
        </p>

        <p className="text-xs text-accent-foreground/40">
          © 2026 Word Hub. All rights reserved.
        </p>
      </div>

      <nav aria-label="Social media links">
        <ul className="flex list-none items-center gap-5">
          {socialMediaIcons.map((icon) => (
            <li key={icon.src}>
              <a
                href={icon.href}
                aria-label={icon.alt}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={icon.src}
                  alt=""
                  width={20}
                  height={20}
                  className="cursor-pointer text-accent-foreground/70 invert"
                />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
};
