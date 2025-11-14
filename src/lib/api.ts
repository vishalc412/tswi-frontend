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

// API Response type
export interface ApiResponse {
  status: 'ok' | 'error'
  statusText: string
  data?: any
}

// Dummy mode - simulates backend responses
const simulateResponse = (success: boolean = true): ApiResponse => {
  return {
    status: success ? 'ok' : 'error',
    statusText: success
      ? 'Operation completed successfully'
      : 'Operation failed. Please try again.',
  }
}

// API Service Methods
export const apiService = {
  // Addition - Create new hypothecation
  async addition(data: {
    chasino: string
    eng_no: string
    hpa_from: string
    hpa_upto: string
    docurl: string
    regnno: string
  }): Promise<ApiResponse> {
    if (API_MODE === 'dummy') {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return simulateResponse(true)
    }

    try {
      const response = await api.post('/warryworks/addition', data)
      return response.data
    } catch (error: any) {
      return {
        status: 'error',
        statusText: error.response?.data?.statusText || 'Failed to create hypothecation',
      }
    }
  },

  // Continuation - Extend existing hypothecation
  async continuation(data: {
    transactionId: string
    chasino: string
    fncrCode: string
    hpa_from: string
    hpa_upto: string
    docurl: string
    regnno: string
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
        statusText: error.response?.data?.statusText || 'Failed to continue hypothecation',
      }
    }
  },

  // Termination - Close hypothecation
  async termination(data: {
    chassisNo: string
    terminationDt: string
    docUrl: string
    regnNo: string
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
        statusText: error.response?.data?.statusText || 'Failed to terminate hypothecation',
      }
    }
  },
}
