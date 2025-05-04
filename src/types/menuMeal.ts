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
