import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {
  private firestore: Firestore = inject(Firestore);

  constructor() { }

  execute() { //colocar single
    return collectionData(collection(this.firestore, 'topics'));
  }
}
