import { Injectable, inject } from '@angular/core';
import { DocumentReference, Firestore, addDoc, collection } from '@angular/fire/firestore';

import User from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {
  private firestore: Firestore = inject(Firestore);

  constructor() {}

  async execute(user: User) {
    return addDoc(collection(this.firestore, 'users'), {
      username: user.username,
      private: user.private,
      follow: user.follow,
      followed: user.followed,
      posts: user.posts,
      email: user.email,
      company: user.company,
      phone: user.phone,
      about: user.about,
      photo: user.photo,
      country: user.country,
      admin: false
    })
  }
}
