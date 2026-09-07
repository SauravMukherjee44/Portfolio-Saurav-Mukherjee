import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Saurav Mukherjee — AI Engineer & Builder',
  description: 'Production AI systems, agentic workflows, and developer communities—built with evidence, safety, and operational clarity.',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}
