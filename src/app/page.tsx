import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  PlusCircle,
  RefreshCw,
  XCircle,
  Shield,
  Zap,
  Clock,
  CheckCircle2,
  BarChart3,
  Lock,
} from 'lucide-react'

export default function Home() {
  const features = [
    {
      icon: Shield,
      title: 'Secure & Compliant',
      description: 'Bank-grade security with full RTO compliance and data encryption',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Process hypothecation records in seconds with our optimized system',
    },
    {
      icon: Clock,
      title: 'Real-time Updates',
      description: 'Instant synchronization with RTO databases for up-to-date records',
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Comprehensive reporting and insights for better decision making',
    },
    {
      icon: Lock,
      title: 'Data Protection',
      description: 'Industry-standard encryption and secure data handling protocols',
    },
    {
      icon: CheckCircle2,
      title: 'Automated Validation',
      description: 'Smart validation to prevent errors and ensure data accuracy',
    },
  ]

  const workflows = [
    {
      icon: PlusCircle,
      title: 'Addition',
      description: 'Create new hypothecation agreements',
      href: '/addition',
      color: 'from-green-500 to-emerald-600',
    },
    {
      icon: RefreshCw,
      title: 'Continuation',
      description: 'Extend existing hypothecation periods',
      href: '/continuation',
      color: 'from-blue-500 to-cyan-600',
    },
    {
      icon: XCircle,
      title: 'Termination',
      description: 'Close completed hypothecation agreements',
      href: '/termination',
      color: 'from-red-500 to-pink-600',
    },
  ]

  const stats = [
    { label: 'Uptime', value: '99.9%' },
    { label: 'Processing Time', value: '<3s' },
    { label: 'Data Accuracy', value: '100%' },
    { label: 'Compliance', value: 'RTO Certified' },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 -z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] -z-10 opacity-30"></div>

        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-block">
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                Next Generation Hypothecation Management
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Streamline Your
              <span className="block mt-2 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Vehicle Hypothecation
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              The most powerful and intuitive platform for financial institutions to manage
              vehicle hypothecation lifecycle - from addition to termination.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link href="/addition">
                <Button size="lg" className="w-full sm:w-auto text-base px-8 py-6">
                  Get Started
                  <PlusCircle className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8 py-6">
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{stat.value}</div>
                  <div className="text-sm text-slate-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Workflows Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Complete Workflow Management
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Handle every stage of vehicle hypothecation with our comprehensive toolkit
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {workflows.map((workflow, index) => {
              const Icon = workflow.icon
              return (
                <Link key={index} href={workflow.href}>
                  <Card className="h-full card-hover cursor-pointer border-2 hover:border-blue-200">
                    <CardHeader>
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${workflow.color} flex items-center justify-center mb-4 shadow-lg`}>
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <CardTitle className="text-2xl">{workflow.title}</CardTitle>
                      <CardDescription className="text-base">
                        {workflow.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-blue-600 font-medium flex items-center gap-2">
                        Start Now
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Built for Financial Institutions
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Enterprise-grade features designed for reliability, security, and compliance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="border-2 hover:border-blue-100 transition-all">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center text-white space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to Transform Your Operations?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join leading financial institutions using MS EXIMP for efficient hypothecation management
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link href="/addition">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-base px-8 py-6 bg-white text-blue-600 hover:bg-slate-50"
                >
                  Start Free Trial
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-base px-8 py-6 border-white text-white hover:bg-white/10"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
