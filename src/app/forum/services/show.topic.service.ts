import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, getDocs, limit, query, where } from '@angular/fire/firestore';
import Topic from '../models/Topic';

@Injectable({
  providedIn: 'root'
})
export class ShowTopicService {
  firestore: Firestore = inject(Firestore)

  constructor() {}

  execute() {
    return collectionData(collection(this.firestore, 'topics'));
  }

  async getTopicByName(name: string | undefined): Promise<Topic | null> {
    const q = query(collection(this.firestore, 'topics'), where('name', '==', name), limit(1));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userSnapshot = querySnapshot.docs[0];
      return userSnapshot.data() as Topic;
    } else {
      return null; // Nenhum usuário encontrado com o username fornecido
    }
  }
}
