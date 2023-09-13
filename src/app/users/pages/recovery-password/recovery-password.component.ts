import { Component } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../utils/auth.service';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.css']
})
export class RecoveryPasswordComponent {
  FormRecPwd: FormGroup
  isSubmitted: boolean

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) {}

  ngOnInit() {
    this.isSubmitted = false;
    this.FormRecPwd = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  navegar(link: string) {
    this.router.navigate([link])
  }

  async login() {
    let acc = {
      email: this.FormRecPwd.controls['email'].value,
      password: this.FormRecPwd.controls['password'].value
    }

    await this.authService.signIn(acc).then(() => {
      alert("Success on login")
      this.navegar('')
    })
    .catch(() => {
      this.FormRecPwd.reset()
      alert('Credenciais incorretas ou usuário não cadastrado!')
    });
  }

  async googleLogin() {
    const provider = new GoogleAuthProvider();
    await this.authService.loginWithGoogle(provider);
    await this.router.navigate(['']);
  }

  getErrorControl(control: string, error: string): boolean {
    return this.FormRecPwd.controls[control]?.hasError(error)
  }

  onSubmit() {
    this.isSubmitted = true

    if(!this.FormRecPwd.valid) {
      this.isSubmitted = false
      this.FormRecPwd.reset()
      alert('Login ou senha inválidos')
      return false
    }

    this.login()
    return true
  }
}
