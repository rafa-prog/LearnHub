import { Inject, Injectable, inject } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, Auth, user, User, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from '@angular/fire/auth';
import { CreateUserService } from './create.user.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth)
  user$ = user(this.auth)
  userSubscription: Subscription

  constructor() {
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
        //handle user state changes here. Note, that user will be null if there is no currently logged in user.
     console.log(aUser);
    })
  }

  ngOnDestroy() {
    // when manually subscribing to an observable remember to unsubscribe in ngOnDestroy
    this.userSubscription.unsubscribe();
  }

  signIn(acc: any) {
    return signInWithEmailAndPassword(this.auth, acc.email, acc.password)
  }

  async loginWithGoogle(a:any) {
    await signInWithPopup(this.auth, a);
    console.log(this.userSubscription);
  }
}
