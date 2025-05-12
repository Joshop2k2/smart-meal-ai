import axios from 'axios'
import { Menu } from '@/types/menuMeal'
import { AxiosResponse } from 'axios'
import { UserType } from '@/types/user'
import { MealRequest } from '@/types/menuMeal'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL

export const postData = async (
  endpoint: string,
  data: unknown,
  headers?: Record<string, string>,
) => {
  try {
    const response = await axios.post(`${baseURL}${endpoint}`, data, {
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      withCredentials: true,
    })
    return response
  } catch (error) {
    console.error('Error posting data:', error)
    throw error
  }
}

export const getData = async (
  endpoint: string,
  headers?: Record<string, string>,
  params?: Record<string, unknown>,
) => {
  try {
    const response = await axios.get(`${baseURL}${endpoint}`, {
      params,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      withCredentials: true,
    })
    return response
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export const suggestMeal = async (
  data: MealRequest,
): Promise<AxiosResponse<{ message: string; suggest: Menu[] }>> => {
  try {
    const response = await postData('/meals/suggest', data)
    return response
  } catch (error) {
    throw error
  }
}

export const login = async ({
  email,
  password,
}: {
  email: string
  password: string
}): Promise<AxiosResponse<{ token: string; user: UserType }>> => {
  try {
    const response = await postData('/users/login', { email, password })
    return response
  } catch (error) {
    throw error
  }
}

export const loginAdmin = async ({
  email,
  password,
}: {
  email: string
  password: string
}): Promise<AxiosResponse<{ token: string; user: UserType }>> => {
  try {
    const response = await postData('/users/admin/login', { email, password })
    return response
  } catch (error) {
    throw error
  }
}

export const register = async ({
  email,
  password,
  firstName,
  phone,
  lastName,
  birthDate,
  gender,
}: {
  email: string
  password: string
  firstName: string
  phone: string
  lastName: string
  birthDate: string
  gender: 'men' | 'women'
}) => {
  try {
    const response = await postData('/users/register', {
      email,
      password,
      firstName,
      phone,
      lastName,
      birthDate,
      gender,
    })
    return response
  } catch (error) {
    throw error
  }
}

export const getMeals = async (): Promise<
  AxiosResponse<{
    meals: (MealRequest & { suggest: Menu[]; _id: string })[]
  }>
> => {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('No token found in localStorage')
    }

    const userId = JSON.parse(atob(token.split('.')[1])).id
    const response = await getData(`/meals/${userId}`, {
      authorization: `Bearer ${token}`,
    })

    return response
  } catch (error) {
    console.error('Error fetching meals:', error)
    throw error
  }
}
export const saveMeal = async (
  meal: MealRequest & { suggest: Menu[] },
): Promise<AxiosResponse<{ message: string }>> => {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('No token found in localStorage')
    }
    const userId = JSON.parse(atob(token.split('.')[1])).id

    const response = await postData(
      `/meals/${userId}`,
      {
        ...meal,
      },
      {
        authorization: `Bearer ${token}`,
      },
    )
    return response
  } catch (error) {
    console.error('Error saving meal:', error)
    throw error
  }
}

export const updateUser = async (data: {
  firstName?: string
  lastName?: string
  birthDate?: string
  phone?: string
}): Promise<AxiosResponse<{ message: string; user: UserType }>> => {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('No token found in localStorage')
    }
    const userId = JSON.parse(atob(token.split('.')[1])).id

    const response = await postData(`/users/${userId}`, data, {
      authorization: `Bearer ${token}`,
    })
    return response
  } catch (error) {
    console.error('Error saving meal:', error)
    throw error
  }
}

export const getAllUser = async (): Promise<
  AxiosResponse<{
    users: UserType[]
  }>
> => {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('No token found in localStorage')
    }

    const response = await getData(`/users/admin/users`, {
      authorization: `Bearer ${token}`,
    })

    console.log('response: ', response)

    return response
  } catch (error) {
    console.error('Error fetching meals:', error)
    throw error
  }
}
