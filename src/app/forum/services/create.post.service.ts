import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc } from '@angular/fire/firestore';
import Post from '../models/Post';

@Injectable({
  providedIn: 'root'
})
export class CreatePostService {
  firestore: Firestore = inject(Firestore)

  constructor() {}

  async execute(post: Post) {
    post.id = doc(collection(this.firestore, 'posts')).id
    return addDoc(collection(this.firestore, 'posts'),
    {
      id: post.id,
      topic: post.topic,
      user: post.user,
      title: post.title,
      content: post.content,
      tags: post.tags,
      replies: post.replies,
      post_date: post.post_date,
      edit_date: post.edit_date,
      votes: post.votes,
    })
  }
}
