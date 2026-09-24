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
    <footer className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10 border-t px-6 py-16 text-center sm:items-start sm:px-8 sm:pb-20 sm:text-left lg:flex-row lg:items-center lg:justify-between lg:gap-16">
      {/* Content */}
      <div className="flex flex-1 flex-col items-center gap-8 sm:items-start sm:gap-10">
        <div className="space-y-2">
          <p className="text-lg font-bold sm:text-xl">WORD HUB</p>

          <p className="text-base font-semibold sm:text-lg">
            Build your vocabulary.
            <br className="sm:hidden" />
            Remember every word.
          </p>
        </div>

        <p className="max-w-lg text-sm leading-7 text-accent-foreground/60 sm:text-base sm:leading-8">
          Word Hub helps you organize words, create personal collections, and
          practice smarter with interactive learning modes.
        </p>

        {/* Copyright - desktop */}
        <p className="hidden text-xs text-accent-foreground/40 lg:block">
          © 2026 Word Hub. All rights reserved.
        </p>
      </div>

      {/* Social + mobile copyright */}
      <div className="flex w-full flex-col items-center gap-8 sm:items-start lg:w-auto lg:items-end lg:border-0 lg:pt-0">
        <nav aria-label="Social media links">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-5 sm:justify-start sm:gap-x-8 lg:justify-end">
            {socialMediaIcons.map(({ Icon, alt, href }) => (
              <li key={alt}>
                <a
                  href={href}
                  aria-label={alt}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Icon className="size-5 transition-opacity hover:opacity-70 sm:size-5" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Copyright - tablet/mobile */}
        <p className="text-xs text-accent-foreground/40 lg:hidden">
          © 2025 Word Hub. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
