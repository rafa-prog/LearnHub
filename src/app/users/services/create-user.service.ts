import { Injectable, inject } from '@angular/core';
import { UserProfile } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {
  private firestore: Firestore = inject(Firestore);
  users$: Observable<UserProfile[]>;

  constructor() { }


}
