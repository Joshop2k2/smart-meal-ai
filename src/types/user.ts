export interface UserType {
  id: string
  firstName: string
  lastName: string
  email: string
  birthDate: string // ISO string format
  phone: string
  gender?: 'men' | 'women'
  createdAt: string // ISO string format
  updatedAt: string // ISO string format
}
