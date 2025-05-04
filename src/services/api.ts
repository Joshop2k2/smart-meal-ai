import axios from 'axios'
import { Menu } from '@/types/menuMeal'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL

const postData = async (endpoint: string, data: unknown) => {
  try {
    const response = await axios.post(`${baseURL}${endpoint}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return response.data
  } catch (error) {
    console.error('Error posting data:', error)
    throw error
  }
}

export interface MealRequest {
  startDate: Date
  endDate: Date
  target: 'giam-mo' | 'tang-can' | 'duy-tri'
  age: number
  gender: 'men' | 'women'
  height: number
  weight: number
  active: 1 | 2 | 3 | 4 | 5
  meal: number
  addInfo?: string
}

export const suggestMeal = async (
  data: MealRequest,
): Promise<{ message: string; suggest: Menu[] }> => {
  try {
    const response = await postData('/meals/suggest', data)
    return response
  } catch (error) {
    throw error
  }
}
