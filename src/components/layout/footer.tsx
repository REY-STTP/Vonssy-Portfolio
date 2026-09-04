import { siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="site-footer shell border-t border-line-soft py-7 text-xs text-quiet">
      <span className="footer-credit">© 2026 Vonssy Portfolio — Systems in motion.</span>
      <div className="footer-meta">
        <div className="footer-links flex flex-wrap gap-x-5 gap-y-2">
          <a
            href={siteConfig.socialLinks.github}
            target="_blank"
            rel="me noopener noreferrer"
            className="hover:text-ink"
          >
            GitHub
          </a>
          <a
            href={siteConfig.socialLinks.telegram}
            target="_blank"
            rel="me noopener noreferrer"
            className="hover:text-ink"
          >
            Telegram
          </a>
          <a
            href={siteConfig.socialLinks.x}
            target="_blank"
            rel="me noopener noreferrer"
            className="hover:text-ink"
          >
            X
          </a>
          <a href="/privacy" className="hover:text-ink">
            Privacy
          </a>
          <a href="/terms" className="hover:text-ink">
            Terms
          </a>
        </div>
        <span className="footer-year mono">2026 / systems in motion</span>
      </div>
    </footer>
  );
}
