import type { ReactNode } from 'react'

/**
 * Line icons, drawn on a 24px grid with a 1.75 stroke (Lucide-style).
 *
 * Every icon is decorative — it always sits beside a visible label — so each
 * one is hidden from assistive technology.
 */
function Icon({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  )
}

export type IconName =
  | 'chain'
  | 'globe'
  | 'warehouse'
  | 'ship'
  | 'plane'
  | 'boxes'
  | 'route'
  | 'check'
  | 'radar'
  | 'handshake'
  | 'pin'

const PATHS: Record<IconName, ReactNode> = {
  chain: (
    <>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18" />
    </>
  ),
  warehouse: (
    <>
      <path d="M3 21V9l9-5 9 5v12" />
      <path d="M7 21v-8h10v8" />
      <path d="M7 17h10" />
    </>
  ),
  ship: (
    <>
      <path d="M3 17l1.6 3.2a1.5 1.5 0 0 0 1.34.8h12.12a1.5 1.5 0 0 0 1.34-.8L21 17" />
      <path d="M4 17l8-3 8 3" />
      <path d="M12 14V4" />
      <path d="M7 15.5V9h10v6.5" />
      <path d="M9 4h6" />
    </>
  ),
  plane: (
    <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
  ),
  boxes: (
    <>
      <path d="M3 12h8v8H3z" />
      <path d="M13 12h8v8h-8z" />
      <path d="M8 4h8v8H8z" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="19" r="2.5" />
      <circle cx="18" cy="5" r="2.5" />
      <path d="M8.5 19H17a3.5 3.5 0 0 0 0-7H7a3.5 3.5 0 0 1 0-7h8.5" />
    </>
  ),
  check: <path d="M20 6L9 17l-5-5" />,
  radar: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <path d="M12 12l6-6" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  handshake: (
    <>
      <path d="M11 17l2 2a1.4 1.4 0 0 0 2-2" />
      <path d="M14 14l2.5 2.5a1.4 1.4 0 0 0 2-2l-3.9-3.9a3 3 0 0 0-4.2 0l-.9.9a1.4 1.4 0 0 1-2-2l2.8-2.8a5.8 5.8 0 0 1 7.1-.9l.5.3a3 3 0 0 0 2.1.4L21 6" />
      <path d="M21 3l1 11h-2" />
      <path d="M3 3L2 14l6.5 6.5a1.4 1.4 0 0 0 2-2" />
      <path d="M3 4h8" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 5-8 12-8 12s-8-7-8-12a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
}

export function Glyph({ name, className }: { name: IconName; className?: string }) {
  return <Icon className={className}>{PATHS[name]}</Icon>
}

/** The icon each route in the site is illustrated with. */
export const ROUTE_ICON: Record<string, IconName> = {
  '/scm': 'chain',
  '/global-trade': 'globe',
  '/logistics': 'warehouse',
  '/global-trade/ocean': 'ship',
  '/global-trade/air': 'plane',
  '/global-trade/drop-shipments': 'boxes',
  '/global-trade/charter': 'route',
  '/industries': 'boxes',
  '/tracking': 'radar',
  '/nippon': 'handshake',
  '/contact': 'pin',
}
