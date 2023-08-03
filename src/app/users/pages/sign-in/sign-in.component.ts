import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  FormLogin: FormGroup
  isSubmitted: boolean

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) {}

  ngOnInit() {
    this.isSubmitted = false;
    this.FormLogin = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  navegar(link: string) {
    this.router.navigate([link])
  }

  async login() {
    let acc = {
      email: this.FormLogin.controls['email'].value,
      password: this.FormLogin.controls['password'].value
    }

    await this.authService.signIn(acc).then(() => {
      alert("Success on login")
      this.navegar('')
    })
    .catch(() => {
      this.FormLogin.reset()
      alert('Credenciais incorretas ou usuário não cadastrado!')
    });
  }

  async googleLogin() {
    const provider = new GoogleAuthProvider();
    await this.authService.loginWithGoogle(provider);
    await this.router.navigate(['']);
  }

  getErrorControl(control: string, error: string): boolean {
    return this.FormLogin.controls[control]?.hasError(error)
  }

  onSubmit() {
    this.isSubmitted = true

    if(!this.FormLogin.valid) {
      this.isSubmitted = false
      this.FormLogin.reset()
      alert('Login ou senha inválidos')
      return false
    }

    this.login()
    return true
  }
}
