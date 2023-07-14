import { Injectable, inject } from '@angular/core';
import { UserProfile } from '@angular/fire/auth';
import { DocumentReference, Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import User from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {
  private firestore: Firestore = inject(Firestore);


  constructor() { }

  execute(user: any) {
    return addDoc(collection(this.firestore, 'users'), {user})
    .then((documentReference: DocumentReference) => {
      console.log(documentReference.id)
    })
  }
}
