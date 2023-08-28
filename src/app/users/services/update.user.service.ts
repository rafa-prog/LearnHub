import { Injectable, inject } from '@angular/core';
import { DocumentReference, Firestore, doc, updateDoc } from '@angular/fire/firestore';

import User from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UpdateUserService {
  private firestore: Firestore = inject(Firestore);

  constructor() {}

  async execute(userID: string, user: User) {
    return updateDoc(doc(this.firestore, 'users', userID), {
      username: user.username,
      private: user.private,
      follow: user.follow,
      followed: user.followed,
      email: user.email,
      company: user.company,
      phone: user.phone,
      about: user.about,
      photo: user.photo,
      country: user.country
    })
    .then(() => {
      alert('Dados da conta atualizado com sucesso!')
    })
  }
}
