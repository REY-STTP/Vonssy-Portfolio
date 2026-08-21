import type { SVGProps } from "react";

interface BrandLogoProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  variant?: "mark" | "full";
  accentColor?: string;
}

/**
 * VONSSY Brand Identity Logo
 * Concept: Convergence Vertex / Execution Vector
 * Monogram 'V' engineered with precision 45-degree angle vectors
 * and a central execution node representing automation & Web3 pipelines.
 */
export function BrandLogo({
  size = 28,
  variant = "mark",
  accentColor = "currentColor",
  className = "",
  ...props
}: BrandLogoProps) {
  if (variant === "full") {
    return (
      <svg
        width={typeof size === "number" ? size * 3.6 : size}
        height={size}
        viewBox="0 0 144 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block select-none ${className}`}
        aria-label="VONSSY Logo"
        {...props}
      >
        {/* Geometric 'V' Monogram Mark */}
        <g transform="translate(4, 4)">
          {/* Left descent rail */}
          <path
            d="M2 3L16 27H21L7 3H2Z"
            fill="var(--text, #e8ebe3)"
          />
          {/* Right ascent rail with accent highlight */}
          <path
            d="M30 3L16 27H21L35 3H30Z"
            fill={accentColor === "currentColor" ? "var(--accent, #a7c59a)" : accentColor}
          />
          {/* Convergence Node / Vertex Dot */}
          <rect
            x="16.5"
            y="27"
            width="4.5"
            height="4.5"
            rx="1"
            fill="var(--warm, #cfaa75)"
          />
        </g>

        {/* Wordmark Typography */}
        <text
          x="46"
          y="25"
          fontFamily="var(--font-jetbrains), monospace"
          fontSize="17"
          fontWeight="800"
          letterSpacing="0.08em"
          fill="var(--text, #e8ebe3)"
        >
          VONSSY
        </text>
        <circle cx="132" cy="23" r="2.5" fill="var(--accent, #a7c59a)" />
      </svg>
    );
  }

  // Standalone Icon / Mark
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none ${className}`}
      aria-label="VONSSY Logo Mark"
      {...props}
    >
      {/* Vector rails */}
      {/* Left arm */}
      <path
        d="M3 4L13.5 24.5H18.5L8 4H3Z"
        fill="var(--text, #e8ebe3)"
      />
      {/* Right arm (Accent) */}
      <path
        d="M29 4L18.5 24.5H13.5L24 4H29Z"
        fill={accentColor === "currentColor" ? "var(--accent, #a7c59a)" : accentColor}
      />
      {/* Convergence vertex anchor */}
      <rect
        x="13.5"
        y="24.5"
        width="5"
        height="5"
        rx="1"
        fill="var(--warm, #cfaa75)"
      />
    </svg>
  );
}
