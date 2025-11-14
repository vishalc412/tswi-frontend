'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from './Logo'
import { Menu, X, Home, PlusCircle, RefreshCw, XCircle, FileText, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Addition', href: '/addition', icon: PlusCircle },
    { name: 'Continuation', href: '/continuation', icon: RefreshCw },
    { name: 'Termination', href: '/termination', icon: XCircle },
    { name: 'Reports', href: '/reports', icon: FileText },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-bank-slate-200 shadow-bank">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <Logo size="md" showText={true} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-bank-navy-800 text-white'
                      : 'text-bank-navy-700 hover:bg-bank-slate-100 hover:text-bank-navy-900'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </div>

          {/* Security Badge */}
          <div className="hidden md:flex items-center gap-2 text-xs text-bank-slate-600">
            <Shield className="h-4 w-4 text-bank-navy-600" />
            <span className="font-medium">Secure</span>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md hover:bg-bank-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-bank-navy-700" />
            ) : (
              <Menu className="h-6 w-6 text-bank-navy-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-1 border-t border-bank-slate-200">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-bank-navy-800 text-white'
                      : 'text-bank-navy-700 hover:bg-bank-slate-100'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
