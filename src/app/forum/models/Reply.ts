import User from "src/app/users/models/User"
import Content from "./Content"

export default class Reply {
  id: string
  user: User
  title: string
  content: Content
  reply: Reply
  post_date: string
  edit_date: string
  votes: number
}
