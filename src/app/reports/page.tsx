'use client'

import React, { useState } from 'react'
import { Calendar } from 'primereact/calendar'
import { Button as PrimeButton } from 'primereact/button'
import { Card as PrimeCard } from 'primereact/card'
import { Message } from 'primereact/message'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { apiService } from '@/lib/api'
import { FileText, Download, Calendar as CalendarIcon } from 'lucide-react'
import 'primereact/resources/themes/lara-light-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

export default function ReportsPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [reportStatus, setReportStatus] = useState<{
    type: 'success' | 'error' | 'info' | null
    message: string
    details?: any
  }>({ type: null, message: '' })

  const formatDate = (date: Date): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const handleGenerateReport = async () => {
    if (!selectedDate) {
      setReportStatus({
        type: 'error',
        message: 'Please select a date first',
      })
      return
    }

    setIsGenerating(true)
    setReportStatus({ type: null, message: '' })

    try {
      const reportDate = formatDate(selectedDate)
      const result = await apiService.generateReport(reportDate)

      setReportStatus({
        type: 'success',
        message: `Report generated successfully for ${reportDate}`,
        details: result,
      })
    } catch (error: any) {
      setReportStatus({
        type: 'error',
        message: error.message || 'Failed to generate report',
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownloadReport = async () => {
    if (!selectedDate) {
      setReportStatus({
        type: 'error',
        message: 'Please select a date first',
      })
      return
    }

    setIsDownloading(true)
    setReportStatus({ type: null, message: '' })

    try {
      const reportDate = formatDate(selectedDate)
      const blob = await apiService.downloadReport(reportDate)

      // Create download link
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `hypothecation_report_${reportDate}.xlsx`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

      setReportStatus({
        type: 'success',
        message: `Report downloaded successfully for ${reportDate}`,
      })
    } catch (error: any) {
      setReportStatus({
        type: 'error',
        message: error.message || 'Failed to download report',
      })
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-3">Reports</h1>
          <p className="text-lg text-slate-600">
            Generate and download hypothecation reports for specific dates
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Report Generation Card */}
          <Card className="border-2 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <CalendarIcon className="h-6 w-6 text-blue-600" />
                Select Report Date
              </CardTitle>
              <CardDescription className="text-base">
                Choose a date to generate or download the daily report
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* PrimeReact Calendar */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Report Date <span className="text-red-500">*</span>
                </label>
                <Calendar
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.value as Date)}
                  dateFormat="yy-mm-dd"
                  placeholder="Select a date"
                  showIcon
                  maxDate={new Date()}
                  className="w-full"
                  inputClassName="w-full"
                  readOnlyInput
                />
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <PrimeButton
                  label="Generate Report"
                  icon={isGenerating ? 'pi pi-spin pi-spinner' : 'pi pi-file'}
                  onClick={handleGenerateReport}
                  disabled={!selectedDate || isGenerating || isDownloading}
                  className="w-full"
                  loading={isGenerating}
                />

                <PrimeButton
                  label="Download Report"
                  icon={isDownloading ? 'pi pi-spin pi-spinner' : 'pi pi-download'}
                  onClick={handleDownloadReport}
                  disabled={!selectedDate || isGenerating || isDownloading}
                  className="w-full"
                  severity="success"
                  loading={isDownloading}
                />
              </div>

              {/* Status Messages */}
              {reportStatus.type && (
                <div className="mt-4">
                  <Message
                    severity={reportStatus.type as any}
                    text={reportStatus.message}
                    className="w-full"
                  />
                  {reportStatus.details && reportStatus.type === 'success' && (
                    <div className="mt-2 p-3 bg-blue-50 rounded-lg text-sm text-blue-900">
                      {reportStatus.details.recordCount && (
                        <p>Records: {reportStatus.details.recordCount}</p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Information Card */}
          <Card className="border-2 shadow-xl bg-gradient-to-br from-blue-50 to-purple-50">
            <CardHeader>
              <CardTitle className="text-2xl">Report Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Report Contents</h3>
                    <p className="text-sm text-slate-600">
                      Daily hypothecation records including additions, continuations, and terminations
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Download className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Download Format</h3>
                    <p className="text-sm text-slate-600">
                      Reports are generated in Excel (.xlsx) format for easy analysis
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CalendarIcon className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Date Range</h3>
                    <p className="text-sm text-slate-600">
                      Historical reports available up to current date
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-blue-200">
                <h3 className="font-semibold text-slate-900 mb-2">Instructions</h3>
                <ol className="text-sm text-slate-600 space-y-1 list-decimal list-inside">
                  <li>Select a date using the calendar picker</li>
                  <li>Click "Generate Report" to create the report</li>
                  <li>Click "Download Report" to download the Excel file</li>
                  <li>Open the file in Excel or Google Sheets</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info Card */}
        <Card className="mt-6 bg-yellow-50 border-yellow-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <i className="pi pi-info-circle text-yellow-700 text-xl"></i>
              <div>
                <h3 className="font-semibold text-yellow-900 mb-1">Note</h3>
                <p className="text-sm text-yellow-800">
                  {process.env.NEXT_PUBLIC_API_MODE === 'dummy'
                    ? 'Currently running in dummy mode. Reports will contain sample data. Switch to production mode in .env.local to access actual data.'
                    : 'Reports contain actual data from the backend system. Ensure you have proper authorization to download sensitive information.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
