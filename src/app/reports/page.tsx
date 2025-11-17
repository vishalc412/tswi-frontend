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
          <div className="inline-flex items-center justify-center w-14 h-14 bg-purple-100 rounded-lg mb-4">
            <FileText className="h-7 w-7 text-purple-700" />
          </div>
          <h1 className="text-3xl font-bold text-bank-navy-900 mb-2">Reports</h1>
          <p className="text-bank-slate-600">
            Generate and download hypothecation reports
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Report Generation Card */}
          <Card>
            <CardHeader>
              <CardTitle>Select Report Date</CardTitle>
              <CardDescription>
                Choose a date to generate or download the daily report
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* PrimeReact Calendar */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-bank-navy-800">
                  Report Date <span className="text-red-600">*</span>
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
          <Card className="bg-bank-slate-50">
            <CardHeader>
              <CardTitle>Report Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4 text-sm text-bank-slate-600">
                <p>
                  <strong className="text-bank-navy-800">Report Contents:</strong> Daily hypothecation records including additions, continuations, and terminations
                </p>
                <p>
                  <strong className="text-bank-navy-800">Download Format:</strong> Excel (.xlsx) format for easy analysis
                </p>
                <p>
                  <strong className="text-bank-navy-800">Date Range:</strong> Historical reports available up to current date
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}
