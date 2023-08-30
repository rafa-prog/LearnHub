import Content from "./Content"
import Reply from "./Reply"

export default class Post {
  topic: string
  username: string
  title: string
  content: any
  tags: string[]
  reply: string[]
  post_date: Date
  edit_date: Date
  votes: number
}
