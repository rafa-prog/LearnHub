import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../utils/auth.service';
import User from '../../models/User';
import { CreateUserService } from '../../services/create.user.service';
import { DocumentReference } from '@angular/fire/firestore';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  FormCad: FormGroup
  isSubmitted: boolean

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private cUserS: CreateUserService,
    private router: Router,) {}

  ngOnInit() {
    this.isSubmitted = false;
    this.FormCad = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  getErrorControl(control: string, error: string): boolean {
    return this.FormCad.controls[control].hasError(error)
  }

  onSubmit() {
    this.isSubmitted = true

    if(!this.FormCad.valid) {
      this.isSubmitted = false
      this.FormCad.reset()
      alert('Campo(s) de cadastro inválido(s)!')
      return false
    }

    if(this.FormCad.controls['password'].value != this.FormCad.controls['confirm_password'].value) {
      this.isSubmitted = false
      this.FormCad.reset()
      alert('As senhas estão diferentes!')
      return false
    }

    this.proximaEtapa()
    return true
  }

  async proximaEtapa() {
    let email = this.FormCad.controls['email'].value
    let password = this.FormCad.controls['password'].value

    let user = new User()
    user.username = this.FormCad.controls['email'].value
    user.email = this.FormCad.controls['email'].value
    user.company = ''
    user.country = ''
    user.phone = ''
    user.about = ''
    user.private = true
    user.follow = []
    user.posts = []
    user.followed = []
    user.photo = "https://firebasestorage.googleapis.com/v0/b/learnhub-d88d5.appspot.com/o/imagens%2Fuser.png?alt=media&token=b9ab5681-d60a-493e-ba6a-dfbda81895b9"

    await this.authService.signUp(email, password)
    .then((userCredential) => {

      this.cUserS.execute(user, userCredential.user.uid)

      .then((documentReference) => {
        this.router.navigateByUrl('/sign-up-2', {state: {email: email, userId: userCredential.user.uid}});
      }).catch((error) => {
        // An error happened.
        alert('Um erro ocorreu, tente novamente mais tarde!')
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      if(errorCode == 'auth/email-already-in-use') {
        alert('Este email já está sendo usado')
      }else {
        alert(errorMessage)
      }

      this.FormCad.reset()
    });
  }
}
