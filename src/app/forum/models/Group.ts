import User from "src/app/users/models/User"

export default class Group {
  id: string
  name: string
  description: string
  photo: string
  cover_photo: string
  participants: User[]
}
