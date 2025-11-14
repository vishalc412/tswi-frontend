import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'

export const metadata: Metadata = {
  title: 'MS EXIMP Hypothecation Management',
  description: 'Professional vehicle hypothecation management system for financial institutions',
  keywords: ['hypothecation', 'vehicle', 'finance', 'management', 'RTO'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Navigation />
        <main className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>
        <footer className="border-t border-slate-200 bg-white">
          <div className="container-custom py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-slate-600">
                © {new Date().getFullYear()} MS EXIMP. All rights reserved.
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md font-medium">
                  v2.0.0
                </span>
                <span>
                  {process.env.NEXT_PUBLIC_API_MODE === 'dummy' && '• Running in Demo Mode'}
                </span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
