import User from "src/app/users/models/User"

export default class Post {
  id: string
  user: User
  content: string
  reply: Post
  date: string
  edited: boolean
  edit_date: string
  votes: number
}
