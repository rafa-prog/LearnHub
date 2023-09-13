import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, getDocs, query, where } from '@angular/fire/firestore';
import Reply from '../models/Reply';

@Injectable({
  providedIn: 'root'
})
export class ListReplyService {
  firestore: Firestore = inject(Firestore)

  constructor() {}

  execute() {
    return collectionData(collection(this.firestore, 'replies'));
  }

  async getRepliesByPosts(postId: string): Promise<Reply[] | null> {
    const q = query(collection(this.firestore, 'replies'), where('post', '==', postId));

    const querySnapshot = await getDocs(q);
    let posts: Reply[] = []

    if (!querySnapshot.empty) {
      const userSnapshot = querySnapshot.docs;
      userSnapshot.forEach((post) => {
        posts.push(post.data() as Reply)
      })

      return posts
    } else {
      return null; // Nenhum usuário encontrado com o username fornecido
    }
  }
}
