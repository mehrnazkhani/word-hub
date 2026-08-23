import { DiscordIcon } from "@/components/icons/discord-icon";
import { GithubIcon } from "@/components/icons/github-icon";
import { GmailIcon } from "@/components/icons/gmail-icon";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { XIcon } from "@/components/icons/x-icon";
import { TelegramIcon } from "@/components/icons/telegram-icon";
import { RedditIcon } from "@/components/icons/reddit-icon";

const socialMediaIcons = [
  { Icon: DiscordIcon, alt: "Discord", href: "https://discord.com" },
  { Icon: GithubIcon, alt: "Github", href: "https://github.com" },
  { Icon: GmailIcon, alt: "Gmail", href: "mailto:hello@wordhub.com" },
  { Icon: InstagramIcon, alt: "Instagram", href: "https://instagram.com" },
  { Icon: XIcon, alt: "X", href: "https://x.com" },
  { Icon: TelegramIcon, alt: "Telegram", href: "https://telegram.org" },
  { Icon: RedditIcon, alt: "Reddit", href: "https://reddit.com" },
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
          {socialMediaIcons.map(({ Icon, alt, href }) => (
            <li key={alt}>
              <a
                href={href}
                aria-label={alt}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon
                  className="size-5 transition-opacity hover:opacity-70"
                  style={{ fill: "var(--foreground)" }}
                />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
};
