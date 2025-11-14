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

// Form validation schema - Field names match backend API specification
const additionSchema = z.object({
  chasiNo: z.string().min(1, 'Chassis number is required').min(5, 'Chassis number must be at least 5 characters'),
  eng_no: z.string().min(1, 'Engine number is required').min(5, 'Engine number must be at least 5 characters'),
  hpa_from: z.string().min(1, 'HPA From date is required').refine((val) => validator.isDate(val), {
    message: 'Please enter a valid date in YYYY-MM-DD format',
  }),
  hpa_upto: z.string().min(1, 'HPA Upto date is required').refine((val) => validator.isDate(val), {
    message: 'Please enter a valid date in YYYY-MM-DD format',
  }),
  docurl: z.string().min(1, 'Document URL is required').url('Please enter a valid URL'),
  regnNo: z.string().min(1, 'Registration number is required'),
})

type AdditionFormData = z.infer<typeof additionSchema>

export default function AdditionPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AdditionFormData>({
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
        message: 'Error: Check input parameters or network connection',
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-4 shadow-lg">
            <PlusCircle className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-3">Hypothecation Addition</h1>
          <p className="text-lg text-slate-600">
            Create a new hypothecation agreement for a vehicle
          </p>
        </div>

        <Card className="border-2 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">New Hypothecation Record</CardTitle>
            <CardDescription className="text-base">
              Enter the vehicle and agreement details below. All fields are required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

              {/* Engine Number */}
              <div className="space-y-2">
                <Label htmlFor="eng_no">
                  Engine Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="eng_no"
                  placeholder="Enter engine number"
                  {...register('eng_no')}
                  disabled={isSubmitting}
                />
                {errors.eng_no && (
                  <p className="text-sm text-red-600">{errors.eng_no.message}</p>
                )}
              </div>

              {/* Date Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="hpa_from">
                    HPA From Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="hpa_from"
                    type="date"
                    placeholder="YYYY-MM-DD"
                    {...register('hpa_from')}
                    disabled={isSubmitting}
                  />
                  {errors.hpa_from && (
                    <p className="text-sm text-red-600">{errors.hpa_from.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hpa_upto">
                    HPA Upto Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="hpa_upto"
                    type="date"
                    placeholder="YYYY-MM-DD"
                    {...register('hpa_upto')}
                    disabled={isSubmitting}
                  />
                  {errors.hpa_upto && (
                    <p className="text-sm text-red-600">{errors.hpa_upto.message}</p>
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
                      <PlusCircle className="mr-2 h-5 w-5" />
                      Submit Addition
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
              <li>Ensure all vehicle details are accurate before submission</li>
              <li>Dates must be in YYYY-MM-DD format</li>
              <li>Document URL should be accessible and valid</li>
              <li>Registration number should match official RTO records</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
