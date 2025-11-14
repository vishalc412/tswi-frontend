import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import { Shield } from 'lucide-react'

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
        <footer className="border-t border-bank-slate-200 bg-white">
          <div className="container-custom py-8">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-bank-navy-900 mb-3">MS EXIMP</h3>
                <p className="text-sm text-bank-slate-600 leading-relaxed">
                  Professional hypothecation management system designed for financial institutions
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-bank-navy-900 mb-3">Quick Links</h3>
                <ul className="space-y-2 text-sm text-bank-slate-600">
                  <li><a href="/addition" className="hover:text-bank-navy-800 transition-colors">Addition</a></li>
                  <li><a href="/continuation" className="hover:text-bank-navy-800 transition-colors">Continuation</a></li>
                  <li><a href="/termination" className="hover:text-bank-navy-800 transition-colors">Termination</a></li>
                  <li><a href="/reports" className="hover:text-bank-navy-800 transition-colors">Reports</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-bank-navy-900 mb-3">Security & Compliance</h3>
                <div className="flex items-start gap-2 text-sm text-bank-slate-600">
                  <Shield className="h-4 w-4 text-bank-navy-600 mt-0.5 flex-shrink-0" />
                  <span>RTO Certified & Bank-Grade Security</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-bank-slate-200">
              <div className="text-sm text-bank-slate-600">
                © {new Date().getFullYear()} MS EXIMP. All rights reserved.
              </div>
              <div className="flex items-center gap-3 text-xs text-bank-slate-500">
                <span className="px-2 py-1 bg-bank-slate-100 text-bank-navy-700 rounded font-semibold">
                  v2.0.0
                </span>
                {process.env.NEXT_PUBLIC_API_MODE === 'dummy' && (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded font-semibold">
                    Demo Mode
                  </span>
                )}
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
