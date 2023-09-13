export default class User {
  id: string
  username: string
  private: boolean
  follow: User[]
  followed: User[]
  posts: string[]
  email: string
  company: string
  phone: string
  about: string
  photo: string
  //cover_photo: string
  country: string
  admin: boolean
  darkMode: boolean
}
