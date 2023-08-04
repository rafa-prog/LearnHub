import User from "src/app/users/models/User"
import Post from "./Post"

export default class Topic {
  name: string
  posts: Post[]
  subscribed: User[]
}
