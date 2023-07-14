export default class User {
  id: string
  username: string
  firstname: string
  lastname: string
  private: boolean
  follow: User[]
  followed: User[]
  email: string
  phone: number
  about: string
  photo: string
  cover_photo: string
  country: string
}
