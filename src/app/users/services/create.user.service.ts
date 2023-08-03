import { Injectable, inject } from '@angular/core';
import { DocumentReference, Firestore, addDoc, collection } from '@angular/fire/firestore';

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
