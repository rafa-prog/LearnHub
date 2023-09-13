import { Injectable, inject } from '@angular/core';
import { createUserWithEmailAndPassword, Auth, user, User, signInWithPopup, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth)
  private user$ = user(this.auth)
  private userLogged: User | null
  private userSubscription: Subscription

  constructor() {
    this.getSub()
  }

  async getSub() {
    this.userSubscription =  this.user$.subscribe((aUser: User | null) => {
      //handle user state changes here. Note, that user will be null if there is no currently logged in user.
      this.userLogged = aUser
      //console.log(this.userLogged)
    })

    return this.userSubscription
  }

  getUserLogged() {
    return this.userLogged
  }

  isAuthenticated(): boolean {
    const userLogged: any = user(this.auth);
    return userLogged !== null; // Verifica se há um usuário autenticado
  }

  ngOnDestroy() {
    // when manually subscribing to an observable remember to unsubscribe in ngOnDestroy
    this.userSubscription.unsubscribe();
  }

  async signIn(acc: any) {
    return signInWithEmailAndPassword(this.auth, acc.email, acc.password)
    .then((userCredential) => {
      // Signed in
      const userAuth = userCredential.user;
      //console.log(userAuth)
    }).catch((error) => {
      // An error happened.
    });
  }

  async loginWithGoogle(user: any) {
    await signInWithPopup(this.auth, user);
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

  delay(ms: number): Promise<void> {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }
}
