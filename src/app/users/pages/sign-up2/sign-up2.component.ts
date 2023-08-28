import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateUserService } from '../../services/create.user.service';
import { StorageService } from 'src/app/utils/services/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import User from '../../models/User';
import { UpdateUserService } from '../../services/update.user.service';

@Component({
  selector: 'app-sign-up2',
  templateUrl: './sign-up2.component.html',
  styleUrls: ['./sign-up2.component.css']
})
export class SignUp2Component {
  FormCad: FormGroup
  isSubmitted: boolean
  image: any
  email: string

  constructor(private formBuilder: FormBuilder,
    private uUserS: UpdateUserService,
    private FSService: StorageService,
    private router: Router,) {}

  ngOnInit() {
    this.isSubmitted = false;
    this.FormCad = this.formBuilder.group({
      username: ['', [Validators.required]],
      company: ['', []],
      country: ['', []],
      photo: [null, []],
      phone: ['', []],
      bio: ['', []],
      terms: ['', [Validators.requiredTrue]],
    })

    this.email = history.state.email

    if(this.email == undefined) {
      alert('Ops, ocorreu um engano tente inserir novamente as informações da primeira etapa!')
      this.navigate('sign-up')
    }

    console.log(this.email)
  }

  navigate(link: string) {
    this.router.navigate([link])
  }

  getErrorControl(control: string, error: string): boolean {
    return this.FormCad.controls[control]?.hasError(error)
  }

  onSubmit() {
    this.isSubmitted = true

    if(!this.FormCad.valid) {
      this.isSubmitted = false
      if(this.FormCad.controls['username'].value) {
        alert('Por favor, marque a opção de Política de Privacidade!')
      }else {
        alert('Insira um Nome de Usuário válido!')
      }

      return false
    }

    if(this.email == undefined) {
      alert('Ops, ocorreu um engano tente inserir novamente as informações da primeira etapa!')
      this.navigate('sign-up')
    }

    this.createAcc()
    return true
  }

  uploadFile(event: any){
    this.image = event.target.files[0];
  }

  async createAcc() {
    let user = new User()

    user.username = this.FormCad.controls['username'].value
    user.company = this.FormCad.controls['company'].value
    user.country = this.FormCad.controls['country'].value
    user.phone = this.FormCad.controls['phone'].value
    user.about = this.FormCad.controls['bio'].value
    user.email = this.email

    user.private = true
    user.follow = []
    user.followed = []

    if(this.image) {
      user.photo = this.FSService.uploadFile(this.image)
    }else {
      user.photo = "https://firebasestorage.googleapis.com/v0/b/learnhub-d88d5.appspot.com/o/imagens%2Fuser.png?alt=media&token=b9ab5681-d60a-493e-ba6a-dfbda81895b9"
    }

    let userId = history.state.userId
    console.log(userId)
    this.uUserS.execute(userId, user)
    alert('Cadastro realizado com sucesso')
    this.navigate('')
  }
}
