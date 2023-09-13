import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';

import Post from '../models/Post';

@Injectable({
  providedIn: 'root'
})
export class UpdatePostService {
  private firestore: Firestore = inject(Firestore);

  constructor() {}

  async execute(postId: string, post: Post) {
    return updateDoc(doc(this.firestore, 'users', postId), {
      title: post.title,
      content: post.content,
      tags: post.tags,
      replies: post.replies,
      edit_date: post.edit_date,
      votes: post.votes
    })
    .then(() => {
      alert('Dados da conta atualizado com sucesso!')
    })
  }

  async findAndUpdateDocument(idValue: string, post: Post) {
    try {
      const q = query(collection(this.firestore, 'posts'), where('id', '==', idValue));
      
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        // A consulta retornou pelo menos um documento com o valor de campo correspondente.
        querySnapshot.forEach((documentReference) => {
          const docId = documentReference.id;
  
          // Agora você pode atualizar os dados do documento encontrado.
          updateDoc(doc(this.firestore, 'posts', docId), {
            replies: post.replies
          })
          .then(() => {
          })
          .catch((error) => {
            console.error('Erro ao atualizar os dados da conta:', error);
            // Trate o erro de acordo com sua necessidade.
          });
        });
      } else {
        console.log("Nenhum documento encontrado com o campo 'id' correspondente.");
      }
    } catch (error) {
      console.error("Erro ao realizar a consulta:", error);
      // Trate o erro de acordo com sua necessidade.
    }
  }
}
