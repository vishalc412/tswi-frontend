import axios from 'axios'

const API_MODE = process.env.NEXT_PUBLIC_API_MODE || 'dummy'
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

// Create axios instance
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// API Response type matching backend specification
export interface ApiResponse {
  responseCode?: string
  refrenceNumber?: string  // Note: Backend has typo "refrenceNumber"
  responseMessage?: string
  dataReferenceId?: string
  status: 'ok' | 'error'
  statusText: string
  data?: any
}

// Dummy mode - simulates backend responses
const simulateResponse = (success: boolean = true): ApiResponse => {
  return {
    responseCode: success ? '1' : '0',
    refrenceNumber: success ? `REF${Date.now()}` : undefined,
    responseMessage: success ? 'Operation completed successfully' : 'Operation failed',
    dataReferenceId: success ? `DATA${Date.now()}` : undefined,
    status: success ? 'ok' : 'error',
    statusText: success
      ? 'Operation completed successfully'
      : 'Operation failed. Please try again.',
  }
}

// API Service Methods
export const apiService = {
  // Health Check
  async healthCheck(): Promise<{ status: string; message?: string }> {
    if (API_MODE === 'dummy') {
      return { status: 'ok', message: 'Service is healthy (dummy mode)' }
    }

    try {
      const response = await api.get('/warryworks/health')
      return response.data
    } catch (error: any) {
      return {
        status: 'error',
        message: error.response?.data?.message || 'Health check failed',
      }
    }
  },

  // Addition - Create new hypothecation
  // Fixed field names to match backend: chasiNo (not chasino), regnNo (not regnno)
  async addition(data: {
    chasiNo: string  // Fixed: was chasino
    eng_no: string
    hpa_from: string
    hpa_upto: string
    docurl: string
    regnNo: string   // Fixed: was regnno
  }): Promise<ApiResponse> {
    if (API_MODE === 'dummy') {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return simulateResponse(true)
    }

    try {
      const response = await api.post('/warryworks/addition', data)
      return response.data
    } catch (error: any) {
      return {
        status: 'error',
        statusText: error.response?.data?.statusText || error.response?.data?.responseMessage || 'Failed to create hypothecation',
        responseMessage: error.response?.data?.responseMessage,
      }
    }
  },

  // Continuation - Extend existing hypothecation
  // Fixed field names: hpc_from/hpc_upto (not hpa_from/hpa_upto), chasiNo, regnNo
  async continuation(data: {
    transactionId: string
    fncrCode: number      // Backend expects number
    chasiNo: string       // Fixed: was chasino
    regnNo: string        // Fixed: was regnno
    hpc_from: string      // Fixed: was hpa_from
    hpc_upto: string      // Fixed: was hpa_upto
    docurl: string
  }): Promise<ApiResponse> {
    if (API_MODE === 'dummy') {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return simulateResponse(true)
    }

    try {
      const response = await api.post('/warryworks/continuation', data)
      return response.data
    } catch (error: any) {
      return {
        status: 'error',
        statusText: error.response?.data?.statusText || error.response?.data?.responseMessage || 'Failed to continue hypothecation',
        responseMessage: error.response?.data?.responseMessage,
      }
    }
  },

  // Termination - Close hypothecation
  async termination(data: {
    regnNo: string
    chassisNo: string
    terminationDt: string
    docUrl: string
  }): Promise<ApiResponse> {
    if (API_MODE === 'dummy') {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return simulateResponse(true)
    }

    try {
      const response = await api.post('/warryworks/termination', data)
      return response.data
    } catch (error: any) {
      return {
        status: 'error',
        statusText: error.response?.data?.statusText || error.response?.data?.responseMessage || 'Failed to terminate hypothecation',
        responseMessage: error.response?.data?.responseMessage,
      }
    }
  },

  // Generate Report
  async generateReport(reportDate: string): Promise<any> {
    if (API_MODE === 'dummy') {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      return {
        status: 'ok',
        message: 'Report generated successfully',
        reportDate,
        recordCount: Math.floor(Math.random() * 100) + 1,
      }
    }

    try {
      const response = await api.get('/warryworks/report/generate', {
        params: { report_date: reportDate },
      })
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to generate report')
    }
  },

  // Download Report
  async downloadReport(reportDate: string): Promise<Blob> {
    if (API_MODE === 'dummy') {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // Create a dummy Excel file (simple CSV)
      const csvContent = `Date,Chassis No,Registration No,Status\n${reportDate},DUMMY123,DL01AB1234,Active`
      return new Blob([csvContent], { type: 'text/csv' })
    }

    try {
      const response = await api.get('/warryworks/report/download', {
        params: { report_date: reportDate },
        responseType: 'blob',
      })
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to download report')
    }
  },
}
