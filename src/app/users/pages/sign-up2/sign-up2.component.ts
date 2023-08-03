import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateUserService } from '../../services/create.user.service';
import { AuthService } from '../../services/auth.service';
import { StorageService } from 'src/app/utils/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up2',
  templateUrl: './sign-up2.component.html',
  styleUrls: ['./sign-up2.component.css']
})
export class SignUp2Component {
  FormCad: FormGroup
  isSubmitted: boolean
  image: any

  constructor(private formBuilder: FormBuilder,
    private cUserS: CreateUserService,
    private authService: AuthService,
    private FSService: StorageService,
    private router: Router) {}

  ngOnInit() {
    this.isSubmitted = false;
    this.FormCad = this.formBuilder.group({
      file: [null, []],
      //password: ['', [Validators.required, Validators.minLength(6)]],
      terms: ['', Validators.requiredTrue],
    })
  }

  navegar(link: string) {
    this.router.navigate([link])
  }

  getErrorControl(control: string, error: string): boolean {
    return this.FormCad.controls[control]?.hasError(error)
  }

  onSubmit() {
    this.isSubmitted = true

    if(!this.FormCad.valid) {
      this.isSubmitted = false
      this.FormCad.reset()
      alert('Login ou senha inválidos')
      return false
    }

    this.teste()
    return true
  }

  uploadFile(event: any){
    this.image = event.target.files[0];
  }

  teste() {

    if(this.image) {
      console.log(this.image)
      console.log("disponivel em: " + this.FSService.uploadFile(this.image))
    }else {
      console.log("https://firebasestorage.googleapis.com/v0/b/learnhub-d88d5.appspot.com/o/imagens%2F1689342292384_messi.jpg?alt=media&token=b2f13891-8607-432b-baef-8a969b1c10df")
    }
  }
}
