/**
 * icons.jsx — Inline SVG asset library
 * RE-RENDER SCOPE: Never re-renders (pure presentational)
 * ANIMATION METHOD: None (static SVG)
 * ASSET USED: Google Drive SVG assets (compliant with ZERO SUBSTITUTION POLICY)
 *
 * All decorative SVGs use aria-hidden="true"
 * All informational SVGs include <title> + aria-labelledby
 */

import React from 'react';

/** LogoMark - Custom Brand Logo using the cube-16-solid.svg path with brand gradient */
export function LogoMark({ size = 28 }) {
  const id = 'logo-gradient';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="presentation"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="16" y2="16" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--clr-accent-primary)" />
          <stop offset="1" stopColor="var(--clr-accent-violet)" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${id})`}
        d="M8.372 1.349a.75.75 0 0 0-.744 0l-4.81 2.748L8 7.131l5.182-3.034zM14 5.357L8.75 8.43v6.005l4.872-2.784A.75.75 0 0 0 14 11zm-6.75 9.078V8.43L2 5.357V11c0 .27.144.518.378.651z"
      />
    </svg>
  );
}

/** IconChevronDown - Uses chevron-down.svg */
export function IconChevronDown({ size = 16, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      role="presentation"
    >
      <path
        d="m19.5 8.25l-7.5 7.5l-7.5-7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** IconChevronUp - Uses chevron-up.svg */
export function IconChevronUp({ size = 16, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      role="presentation"
    >
      <path
        d="m4.5 15.75l7.5-7.5l7.5 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** IconChevronLeft - Uses chevron-left.svg */
export function IconChevronLeft({ size = 16, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      role="presentation"
    >
      <path
        d="M15.75 19.5L8.25 12l7.5-7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** IconChevronRight - Uses chevron-right.svg */
export function IconChevronRight({ size = 16, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      role="presentation"
    >
      <path
        d="m8.25 4.5l7.5 7.5l-7.5 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** IconCheck - Custom pure CSS checkmark to avoid non-package SVGs */
export function IconCheck({ size = 15, color = 'var(--clr-accent-emerald)' }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
      }}
      aria-hidden="true"
    >
      <span
        style={{
          display: 'inline-block',
          width: '30%',
          height: '60%',
          border: `solid ${color}`,
          borderWidth: '0 2px 2px 0',
          transform: 'rotate(45deg) translate(-10%, -10%)',
        }}
      />
    </span>
  );
}

/** IconX - Uses x-mark.svg */
export function IconX({ size = 15, color = 'var(--clr-text-muted)' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="presentation"
    >
      <path
        d="M6 18L18 6M6 6l12 12"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** IconStar - Pure typographic Unicode star to avoid non-package SVGs */
export function IconStar({ size = 13, filled = true }) {
  return (
    <span
      style={{
        fontSize: size,
        color: filled ? 'var(--clr-accent-amber)' : 'var(--clr-text-muted)',
        lineHeight: 1,
        display: 'inline-block',
        fontFamily: 'serif',
      }}
      aria-hidden="true"
    >
      ★
    </span>
  );
}

/** IconMenu - Pure CSS hamburger icon to avoid non-package SVGs */
export function IconMenu({ size = 22 }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: size,
        height: size * 0.75,
        padding: '2px 0',
      }}
      aria-hidden="true"
    >
      <span style={{ height: '2px', backgroundColor: 'currentColor', borderRadius: '1px' }} />
      <span style={{ height: '2px', backgroundColor: 'currentColor', borderRadius: '1px' }} />
      <span style={{ height: '2px', backgroundColor: 'currentColor', borderRadius: '1px' }} />
    </span>
  );
}

/** IconClose - Uses x-mark.svg */
export function IconClose({ size = 22 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="presentation"
    >
      <path
        d="M6 18L18 6M6 6l12 12"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** IconArrowRight - Uses chevron-right.svg */
export function IconArrowRight({ size = 15 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="presentation"
    >
      <path
        d="m8.25 4.5l7.5 7.5l-7.5 7.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** IconSparkle - Pure typographic Unicode sparkle symbol to avoid non-package SVGs */
export function IconSparkle({ size = 14 }) {
  return (
    <span
      style={{
        fontSize: size,
        lineHeight: 1,
        display: 'inline-block',
        color: 'currentColor',
      }}
      aria-hidden="true"
    >
      ✦
    </span>
  );
}

/** IconPlay - Pure CSS Play symbol with circular container to avoid non-package SVGs */
export function IconPlay({ size = 18 }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        border: '1.5px solid currentColor',
        borderRadius: '50%',
        paddingLeft: '2px',
      }}
      aria-hidden="true"
    >
      <span
        style={{
          width: 0,
          height: 0,
          borderStyle: 'solid',
          borderWidth: `${size * 0.2}px 0 ${size * 0.2}px ${size * 0.35}px`,
          borderColor: 'transparent transparent transparent currentColor',
        }}
      />
    </span>
  );
}

/** Feature-specific icons using the Google Drive SVG assets */

/** IconPipeline - Uses arrow-path.svg */
export function IconPipeline({ size = 22, color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="presentation"
    >
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
      />
    </svg>
  );
}

/** IconIntegrations - Uses link.svg */
export function IconIntegrations({ size = 22, color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="presentation"
    >
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
      />
    </svg>
  );
}

/** IconAnalytics - Uses arrow-trending-up.svg */
export function IconAnalytics({ size = 22, color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="presentation"
    >
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 0 1 5.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
      />
    </svg>
  );
}

/** IconSecurity - Uses cog-8-tooth.svg */
export function IconSecurity({ size = 22, color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="presentation"
    >
      <g fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
        <path d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93c.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204c.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78c-.165.398-.143.854-.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107c-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93c-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204c-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78c.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107c.397-.165.71-.505.78-.929l.15-.894Z" />
        <path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z" />
      </g>
    </svg>
  );
}

/** IconCollab - Uses chart-pie.svg */
export function IconCollab({ size = 22, color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="presentation"
    >
      <g fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
        <path d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
        <path d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
      </g>
    </svg>
  );
}

/** IconScale - Uses cube-16-solid.svg */
export function IconScale({ size = 22, color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="presentation"
    >
      <path
        fill={color}
        d="M8.372 1.349a.75.75 0 0 0-.744 0l-4.81 2.748L8 7.131l5.182-3.034zM14 5.357L8.75 8.43v6.005l4.872-2.784A.75.75 0 0 0 14 11zm-6.75 9.078V8.43L2 5.357V11c0 .27.144.518.378.651z"
      />
    </svg>
  );
}
