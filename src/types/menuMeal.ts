interface Ingredient {
  name: string
  amount: string
}

interface Meal {
  name: string
  dish: string
  ingredients: Ingredient[]
  calories: number
}

export interface Menu {
  date: string
  meals: Meal[]
}

export interface MealRequest {
  startDate: string
  endDate: string
  target: 'giam-mo' | 'tang-can' | 'duy-tri'
  age: number
  gender: 'men' | 'women'
  height: number
  weight: number
  active: 1 | 2 | 3 | 4 | 5
  meal: number
  addInfo?: string
}
