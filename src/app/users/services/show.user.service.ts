import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, getDoc, getDocs, limit, query, where } from '@angular/fire/firestore';
import User from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class ShowUserService {
  private firestore: Firestore = inject(Firestore);

  constructor() { }

  async execute(id: string): Promise<User | null> {
    const userDocRef = doc(this.firestore, 'users', id);

    try {
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data(); // Sem necessidade de fazer cast
        return userData as User; // Realize o cast para o tipo User
      } else {
        return null;
      }
    } catch (error) {
      console.error('Erro ao obter o documento do usuário:', error);
      throw error;
    }
  }

  async getUserByUsername(username: string): Promise<User | null> {
    const q = query(collection(this.firestore, 'users'), where('username', '==', username), limit(1));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userSnapshot = querySnapshot.docs[0];
      return userSnapshot.data() as User;
    } else {
      return null; // Nenhum usuário encontrado com o username fornecido
    }
  }
}
