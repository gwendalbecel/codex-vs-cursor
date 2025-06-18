import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GeoProspect',
  description: 'Prospection géolocalisée',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="dark">
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {children}
      </body>
    </html>
  )
}
