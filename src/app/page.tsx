import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PlusCircle, RefreshCw, XCircle, Shield, Lock, CheckCircle2, FileText } from 'lucide-react'

export default function Home() {
  const workflows = [
    {
      icon: PlusCircle,
      title: 'Addition',
      description: 'Register new hypothecation agreements with comprehensive vehicle documentation',
      href: '/addition',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-700',
    },
    {
      icon: RefreshCw,
      title: 'Continuation',
      description: 'Extend existing hypothecation agreements with updated terms and documentation',
      href: '/continuation',
      iconBg: 'bg-bank-blue-100',
      iconColor: 'text-bank-blue-700',
    },
    {
      icon: XCircle,
      title: 'Termination',
      description: 'Close completed hypothecation agreements and release vehicle ownership',
      href: '/termination',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-700',
    },
    {
      icon: FileText,
      title: 'Reports',
      description: 'Generate and download comprehensive reports for compliance and analysis',
      href: '/reports',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-700',
    },
  ]

  const features = [
    {
      icon: Shield,
      title: 'RTO Compliant',
      description: 'Fully compliant with RTO regulations and data standards',
    },
    {
      icon: Lock,
      title: 'Bank-Grade Security',
      description: 'Enterprise-level encryption and secure data handling',
    },
    {
      icon: CheckCircle2,
      title: 'Real-time Processing',
      description: 'Instant validation and immediate transaction processing',
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-bank-navy-50 text-bank-navy-800 rounded-full text-sm font-semibold mb-4">
              <Shield className="h-4 w-4" />
              <span>Secure Vehicle Hypothecation Management</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-bank-navy-900 leading-tight">
              Professional Hypothecation
              <span className="block text-bank-navy-700">Management System</span>
            </h1>

            <p className="text-lg md:text-xl text-bank-slate-600 max-w-2xl mx-auto leading-relaxed">
              Streamline vehicle hypothecation operations with our secure, compliant platform designed for financial institutions
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link href="/addition">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                </Button>
              </Link>
              <Link href="/reports">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  View Reports
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="py-8 bg-bank-slate-100 border-y border-bank-slate-200">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-md bg-bank-navy-800 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-bank-navy-900 mb-1">{feature.title}</h3>
                    <p className="text-sm text-bank-slate-600">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Workflows Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-bank-navy-900 mb-3">
              Complete Workflow Management
            </h2>
            <p className="text-lg text-bank-slate-600 max-w-2xl mx-auto">
              Manage the entire lifecycle of vehicle hypothecation agreements
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {workflows.map((workflow, index) => {
              const Icon = workflow.icon
              return (
                <Link key={index} href={workflow.href}>
                  <Card className="h-full cursor-pointer hover:shadow-bank-lg transition-all duration-200">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-md ${workflow.iconBg} flex items-center justify-center mb-3`}>
                        <Icon className={`h-6 w-6 ${workflow.iconColor}`} />
                      </div>
                      <CardTitle className="text-lg">{workflow.title}</CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
                        {workflow.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-16 bg-bank-navy-900 text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Shield className="h-16 w-16 mx-auto text-bank-navy-300" />
            <h2 className="text-3xl md:text-4xl font-bold">
              Built for Financial Institutions
            </h2>
            <p className="text-lg text-bank-navy-200 max-w-2xl mx-auto">
              Our platform meets the highest standards of security, compliance, and reliability required by financial institutions and regulatory bodies
            </p>
            <div className="grid md:grid-cols-2 gap-6 pt-8 max-w-3xl mx-auto text-left">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-1">Secure by Design</h3>
                  <p className="text-sm text-bank-navy-300">End-to-end encryption and secure data handling protocols</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-1">RTO Certified</h3>
                  <p className="text-sm text-bank-navy-300">Fully compliant with all RTO regulations and standards</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-1">Audit Trail</h3>
                  <p className="text-sm text-bank-navy-300">Complete transaction history and comprehensive reporting</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-1">99.9% Uptime</h3>
                  <p className="text-sm text-bank-navy-300">Reliable service with enterprise-grade infrastructure</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
