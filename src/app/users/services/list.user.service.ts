import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ListUserService {
  private firestore: Firestore = inject(Firestore);

  constructor() { }

  execute() {
    return collectionData(collection(this.firestore, 'users'));
  }
}
