import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, getDocs, limit, query, where } from '@angular/fire/firestore';
import User from '../models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowUserService {
  private firestore: Firestore = inject(Firestore);

  constructor() { }

  async execute(id: string) {
    collectionData(collection(this.firestore, 'users', id));
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
