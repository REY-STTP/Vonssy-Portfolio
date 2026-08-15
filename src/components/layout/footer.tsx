import { siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="site-footer shell border-t border-line-soft py-7 text-xs text-quiet">
      <span className="footer-credit">Built by Vonssy.</span>
      <div className="footer-meta">
        <div className="footer-links">
          <a
            href={siteConfig.socialLinks.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-ink"
          >
            GitHub
          </a>
          <a
            href={siteConfig.socialLinks.telegram}
            target="_blank"
            rel="noreferrer"
            className="hover:text-ink"
          >
            Telegram
          </a>
        </div>
        <span className="footer-year mono">2026 / systems in motion</span>
      </div>
    </footer>
  );
}
