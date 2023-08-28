import { Injectable, inject } from '@angular/core';
import { createUserWithEmailAndPassword, Auth, user, User, signInWithPopup, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth)
  private user$ = user(this.auth)
  private userSubscription: Subscription

  constructor() {
    this.getUser()
  }

  getUser() {
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      //handle user state changes here. Note, that user will be null if there is no currently logged in user.
    })

    return this.userSubscription
  }

  ngOnDestroy() {
    // when manually subscribing to an observable remember to unsubscribe in ngOnDestroy
    this.userSubscription.unsubscribe();
  }

  async signIn(acc: any) {
    return signInWithEmailAndPassword(this.auth, acc.email, acc.password)
    .then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  async loginWithGoogle(a:any) {
    await signInWithPopup(this.auth, a);
    console.log(this.userSubscription);
  }

  signUp(email:string, password:string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
  }

  disconnect() {
    signOut(this.auth)
    .then(() => {
      this.userSubscription.unsubscribe();
      // Sign-out successful.
    }).catch((error) => {
      return error
      // An error happened.
    });
  }
}
