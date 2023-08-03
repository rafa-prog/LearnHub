import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  FormCad: FormGroup
  isSubmitted: boolean

  constructor(private formBuilder: FormBuilder,
    private router: Router) {}

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

    this.registerEmail()
    return true
  }

  navegar(link: string) {
    this.router.navigate([link])
  }

  registerEmail() {
    this.navegar('sign-up-2')
  }
}
