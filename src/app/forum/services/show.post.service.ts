import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, getDocs, query, where } from '@angular/fire/firestore';
import Post from '../models/Post';

@Injectable({
  providedIn: 'root'
})
export class ShowPostService {
  firestore: Firestore = inject(Firestore)

  constructor() {}

  execute() {
    return collectionData(collection(this.firestore, 'posts'));
  }

  async getPostById(id: string): Promise<Post | null> {
    const q = query(collection(this.firestore, 'posts'), where('id', '==', id));

    const querySnapshot = await getDocs(q);
    let post: Post

    if (!querySnapshot.empty) {
      const userSnapshot = querySnapshot.docs[0]
      post = userSnapshot.data() as Post

      console.log(post)

      return post
    } else {
      return null; // Nenhum usuário encontrado com o username fornecido
    }
  }
}
