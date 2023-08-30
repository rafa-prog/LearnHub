import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import Post from '../models/Post';

@Injectable({
  providedIn: 'root'
})
export class CreatePostService {
  firestore: Firestore = inject(Firestore)

  constructor() {}

  async execute(post: Post) {
    return addDoc(collection(this.firestore, 'posts'),
    { topic: post.topic,
      user: post.username,
      title: post.title,
      content: post.content,
      reply: post.reply,
      post_date: post.post_date,
      edit_date: post.edit_date,
      votes: post.votes,
    })
  }
}
