'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import validator from 'validator'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { apiService } from '@/lib/api'
import { XCircle, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

// Form validation schema
const terminationSchema = z.object({
  chassisNo: z.string().min(1, 'Chassis number is required').min(5, 'Chassis number must be at least 5 characters'),
  terminationDt: z.string().min(1, 'Termination date is required').refine((val) => validator.isDate(val), {
    message: 'Please enter a valid date in YYYY-MM-DD format',
  }),
  docUrl: z.string().min(1, 'Document URL is required').url('Please enter a valid URL'),
  regnNo: z.string().min(1, 'Registration number is required'),
})

type TerminationFormData = z.infer<typeof terminationSchema>

export default function TerminationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TerminationFormData>({
    resolver: zodResolver(terminationSchema),
  })

  const onSubmit = async (data: TerminationFormData) => {
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await apiService.termination(data)

      if (response.status === 'ok') {
        setSubmitStatus({
          type: 'success',
          message: response.statusText || 'Hypothecation terminated successfully',
        })
        reset()
      } else {
        setSubmitStatus({
          type: 'error',
          message: response.statusText || 'Failed to terminate hypothecation',
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Error: Check input parameters or network connection',
      })
      console.error('Termination error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-red-100 rounded-lg mb-4">
            <XCircle className="h-7 w-7 text-red-700" />
          </div>
          <h1 className="text-3xl font-bold text-bank-navy-900 mb-2">Hypothecation Termination</h1>
          <p className="text-bank-slate-600">
            Close a completed hypothecation agreement
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Terminate Hypothecation</CardTitle>
            <CardDescription>
              Enter vehicle details and termination date. All fields are required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Chassis Number */}
              <div className="space-y-2">
                <Label htmlFor="chassisNo">
                  Chassis Number <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="chassisNo"
                  placeholder="e.g., MB1234567890ABCDE"
                  {...register('chassisNo')}
                  disabled={isSubmitting}
                />
                {errors.chassisNo && (
                  <p className="text-sm text-red-600">{errors.chassisNo.message}</p>
                )}
              </div>

              {/* Termination Date */}
              <div className="space-y-2">
                <Label htmlFor="terminationDt">
                  Termination Date <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="terminationDt"
                  type="date"
                  {...register('terminationDt')}
                  disabled={isSubmitting}
                />
                {errors.terminationDt && (
                  <p className="text-sm text-red-600">{errors.terminationDt.message}</p>
                )}
              </div>

              {/* Document URL */}
              <div className="space-y-2">
                <Label htmlFor="docUrl">
                  Document URL <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="docUrl"
                  type="url"
                  placeholder="https://example.com/termination-document.pdf"
                  {...register('docUrl')}
                  disabled={isSubmitting}
                />
                {errors.docUrl && (
                  <p className="text-sm text-red-600">{errors.docUrl.message}</p>
                )}
              </div>

              {/* Registration Number */}
              <div className="space-y-2">
                <Label htmlFor="regnNo">
                  Registration Number <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="regnNo"
                  placeholder="e.g., MH12AB1234"
                  {...register('regnNo')}
                  disabled={isSubmitting}
                />
                {errors.regnNo && (
                  <p className="text-sm text-red-600">{errors.regnNo.message}</p>
                )}
              </div>

              {/* Status Messages */}
              {submitStatus && (
                <Alert variant={submitStatus.type === 'success' ? 'success' : 'destructive'}>
                  {submitStatus.type === 'success' ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <AlertTitle>
                    {submitStatus.type === 'success' ? 'Success' : 'Error'}
                  </AlertTitle>
                  <AlertDescription>{submitStatus.message}</AlertDescription>
                </Alert>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <XCircle className="mr-2 h-5 w-5" />
                      Submit Termination
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
