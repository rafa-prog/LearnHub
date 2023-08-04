import User from "src/app/users/models/User"
import Content from "./Content"
import Reply from "./Reply"

export default class Post {
  id: string
  topic: string
  user: User
  title: string
  content: Content
  reply: Reply
  post_date: string
  edit_date: string
  votes: number
}
