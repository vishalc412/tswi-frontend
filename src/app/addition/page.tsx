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
import { PlusCircle, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

// Validation schema matching backend API
const additionSchema = z.object({
  chasiNo: z.string().min(1, 'Chassis number is required').min(5, 'Must be at least 5 characters'),
  eng_no: z.string().min(1, 'Engine number is required').min(5, 'Must be at least 5 characters'),
  hpa_from: z.string().min(1, 'Start date is required').refine((val) => validator.isDate(val), {
    message: 'Invalid date format (YYYY-MM-DD)',
  }),
  hpa_upto: z.string().min(1, 'End date is required').refine((val) => validator.isDate(val), {
    message: 'Invalid date format (YYYY-MM-DD)',
  }),
  docurl: z.string().min(1, 'Document URL is required').url('Must be a valid URL'),
  regnNo: z.string().min(1, 'Registration number is required'),
})

type AdditionFormData = z.infer<typeof additionSchema>

export default function AdditionPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<AdditionFormData>({
    resolver: zodResolver(additionSchema),
  })

  const onSubmit = async (data: AdditionFormData) => {
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await apiService.addition(data)

      if (response.status === 'ok') {
        setSubmitStatus({
          type: 'success',
          message: response.statusText || 'Hypothecation added successfully',
        })
        reset()
      } else {
        setSubmitStatus({
          type: 'error',
          message: response.statusText || 'Failed to add hypothecation',
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Error processing request. Please check your input and try again.',
      })
      console.error('Addition error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 rounded-lg mb-4">
            <PlusCircle className="h-7 w-7 text-green-700" />
          </div>
          <h1 className="text-3xl font-bold text-bank-navy-900 mb-2">Hypothecation Addition</h1>
          <p className="text-bank-slate-600">
            Create a new hypothecation agreement
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>New Hypothecation Record</CardTitle>
            <CardDescription>
              Enter vehicle and agreement details. All fields are required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Chassis Number */}
              <div className="space-y-2">
                <Label htmlFor="chasiNo">Chassis Number <span className="text-red-600">*</span></Label>
                <Input
                  id="chasiNo"
                  placeholder="e.g., MB1234567890ABCDE"
                  {...register('chasiNo')}
                  disabled={isSubmitting}
                />
                {errors.chasiNo && <p className="text-sm text-red-600">{errors.chasiNo.message}</p>}
              </div>

              {/* Engine Number */}
              <div className="space-y-2">
                <Label htmlFor="eng_no">Engine Number <span className="text-red-600">*</span></Label>
                <Input
                  id="eng_no"
                  placeholder="e.g., ENG123456"
                  {...register('eng_no')}
                  disabled={isSubmitting}
                />
                {errors.eng_no && <p className="text-sm text-red-600">{errors.eng_no.message}</p>}
              </div>

              {/* Date Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="hpa_from">HPA From Date <span className="text-red-600">*</span></Label>
                  <Input
                    id="hpa_from"
                    type="date"
                    {...register('hpa_from')}
                    disabled={isSubmitting}
                  />
                  {errors.hpa_from && <p className="text-sm text-red-600">{errors.hpa_from.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hpa_upto">HPA Upto Date <span className="text-red-600">*</span></Label>
                  <Input
                    id="hpa_upto"
                    type="date"
                    {...register('hpa_upto')}
                    disabled={isSubmitting}
                  />
                  {errors.hpa_upto && <p className="text-sm text-red-600">{errors.hpa_upto.message}</p>}
                </div>
              </div>

              {/* Document URL */}
              <div className="space-y-2">
                <Label htmlFor="docurl">Document URL <span className="text-red-600">*</span></Label>
                <Input
                  id="docurl"
                  type="url"
                  placeholder="https://example.com/document.pdf"
                  {...register('docurl')}
                  disabled={isSubmitting}
                />
                {errors.docurl && <p className="text-sm text-red-600">{errors.docurl.message}</p>}
              </div>

              {/* Registration Number */}
              <div className="space-y-2">
                <Label htmlFor="regnNo">Registration Number <span className="text-red-600">*</span></Label>
                <Input
                  id="regnNo"
                  placeholder="e.g., MH12AB1234"
                  {...register('regnNo')}
                  disabled={isSubmitting}
                />
                {errors.regnNo && <p className="text-sm text-red-600">{errors.regnNo.message}</p>}
              </div>

              {/* Status Messages */}
              {submitStatus && (
                <Alert variant={submitStatus.type === 'success' ? 'success' : 'destructive'}>
                  {submitStatus.type === 'success' ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <AlertTitle>{submitStatus.type === 'success' ? 'Success' : 'Error'}</AlertTitle>
                  <AlertDescription>{submitStatus.message}</AlertDescription>
                </Alert>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <PlusCircle className="mr-2 h-5 w-5" />
                      Submit Addition
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
