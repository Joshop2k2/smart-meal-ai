export interface UserType {
  _id: string
  firstName: string
  lastName: string
  email: string
  birthDate: string
  phone: string
  gender?: 'men' | 'women'
  createdAt: string
  updatedAt: string
}
