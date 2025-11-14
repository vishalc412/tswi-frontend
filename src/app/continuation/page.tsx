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
import { RefreshCw, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

// Form validation schema - Field names match backend API specification
const continuationSchema = z.object({
  transactionId: z.string().min(1, 'Transaction ID is required'),
  chasiNo: z.string().min(1, 'Chassis number is required').min(5, 'Chassis number must be at least 5 characters'),
  fncrCode: z.coerce.number({ required_error: 'FNCR code is required' }).positive('FNCR code must be a positive number'),
  hpc_from: z.string().min(1, 'HPC From date is required').refine((val) => validator.isDate(val), {
    message: 'Please enter a valid date in YYYY-MM-DD format',
  }),
  hpc_upto: z.string().min(1, 'HPC Upto date is required').refine((val) => validator.isDate(val), {
    message: 'Please enter a valid date in YYYY-MM-DD format',
  }),
  docurl: z.string().min(1, 'Document URL is required').url('Please enter a valid URL'),
  regnNo: z.string().min(1, 'Registration number is required'),
})

type ContinuationFormData = z.infer<typeof continuationSchema>

export default function ContinuationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContinuationFormData>({
    resolver: zodResolver(continuationSchema),
  })

  const onSubmit = async (data: ContinuationFormData) => {
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await apiService.continuation(data)

      if (response.status === 'ok') {
        setSubmitStatus({
          type: 'success',
          message: response.statusText || 'Hypothecation continued successfully',
        })
        reset()
      } else {
        setSubmitStatus({
          type: 'error',
          message: response.statusText || 'Failed to continue hypothecation',
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Error: Check input parameters or network connection',
      })
      console.error('Continuation error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl mb-4 shadow-lg">
            <RefreshCw className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-3">Hypothecation Continuation</h1>
          <p className="text-lg text-slate-600">
            Extend an existing hypothecation agreement period
          </p>
        </div>

        <Card className="border-2 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Continue Hypothecation</CardTitle>
            <CardDescription className="text-base">
              Enter the transaction details and new period for the continuation. All fields are required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Transaction ID */}
              <div className="space-y-2">
                <Label htmlFor="transactionId">
                  Transaction ID <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="transactionId"
                  placeholder="Enter transaction ID from previous agreement"
                  {...register('transactionId')}
                  disabled={isSubmitting}
                />
                {errors.transactionId && (
                  <p className="text-sm text-red-600">{errors.transactionId.message}</p>
                )}
              </div>

              {/* Chassis Number */}
              <div className="space-y-2">
                <Label htmlFor="chasiNo">
                  Chassis Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="chasiNo"
                  placeholder="Enter chassis number"
                  {...register('chasiNo')}
                  disabled={isSubmitting}
                />
                {errors.chasiNo && (
                  <p className="text-sm text-red-600">{errors.chasiNo.message}</p>
                )}
              </div>

              {/* FNCR Code */}
              <div className="space-y-2">
                <Label htmlFor="fncrCode">
                  FNCR Code <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fncrCode"
                  type="number"
                  placeholder="Enter FNCR code (e.g., 12345)"
                  {...register('fncrCode')}
                  disabled={isSubmitting}
                />
                {errors.fncrCode && (
                  <p className="text-sm text-red-600">{errors.fncrCode.message}</p>
                )}
              </div>

              {/* Date Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="hpc_from">
                    HPA From Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="hpc_from"
                    type="date"
                    placeholder="YYYY-MM-DD"
                    {...register('hpc_from')}
                    disabled={isSubmitting}
                  />
                  {errors.hpc_from && (
                    <p className="text-sm text-red-600">{errors.hpc_from.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hpc_upto">
                    HPA Upto Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="hpc_upto"
                    type="date"
                    placeholder="YYYY-MM-DD"
                    {...register('hpc_upto')}
                    disabled={isSubmitting}
                  />
                  {errors.hpc_upto && (
                    <p className="text-sm text-red-600">{errors.hpc_upto.message}</p>
                  )}
                </div>
              </div>

              {/* Document URL */}
              <div className="space-y-2">
                <Label htmlFor="docurl">
                  Document URL <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="docurl"
                  type="url"
                  placeholder="https://example.com/document.pdf"
                  {...register('docurl')}
                  disabled={isSubmitting}
                />
                {errors.docurl && (
                  <p className="text-sm text-red-600">{errors.docurl.message}</p>
                )}
              </div>

              {/* Registration Number */}
              <div className="space-y-2">
                <Label htmlFor="regnNo">
                  Registration Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="regnNo"
                  placeholder="Enter registration number (e.g., MH12AB1234)"
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
                      <RefreshCw className="mr-2 h-5 w-5" />
                      Submit Continuation
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-blue-900 mb-2">Important Information</h3>
            <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
              <li>Transaction ID must match an existing hypothecation record</li>
              <li>The new period should extend beyond the current agreement</li>
              <li>All vehicle details must match the original agreement</li>
              <li>Updated continuation document should be provided</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
