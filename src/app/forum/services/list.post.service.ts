import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, getDocs, query, where } from '@angular/fire/firestore';
import Post from '../models/Post';

@Injectable({
  providedIn: 'root'
})
export class ListPostService {
  firestore: Firestore = inject(Firestore)

  constructor() {}

  execute() {
    return collectionData(collection(this.firestore, 'posts'));
  }

  async getPostsByTopic(topic: string): Promise<Post[] | null> {
    const q = query(collection(this.firestore, 'posts'), where('topic', '==', topic));

    const querySnapshot = await getDocs(q);
    let posts: Post[] = []

    if (!querySnapshot.empty) {
      const userSnapshot = querySnapshot.docs;
      userSnapshot.forEach((post) => {
        posts.push(post.data() as Post)
      })

      console.log(posts)

      return posts
    } else {
      return null; // Nenhum usuário encontrado com o username fornecido
    }
  }

  async getPostsByUser(user: string): Promise<Post[] | null> {
    const q = query(collection(this.firestore, 'posts'), where('user', '==', user));

    const querySnapshot = await getDocs(q);
    let posts: Post[] = []

    if (!querySnapshot.empty) {
      const userSnapshot = querySnapshot.docs;
      userSnapshot.forEach((post) => {
        posts.push(post.data() as Post)
      })

      console.log(posts)

      return posts
    } else {
      return null; // Nenhum usuário encontrado com o username fornecido
    }
  }
}
