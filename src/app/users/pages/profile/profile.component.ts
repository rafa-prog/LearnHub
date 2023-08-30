import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import User from '../../models/User';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowUserService } from '../../services/show.user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  FormProfile: FormGroup
  isSubmitted: boolean
  image: string
  user: User | null

  constructor(private formBuilder: FormBuilder,
    private showUserService: ShowUserService,
    private aRoute: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.setUser()

    this.isSubmitted = false;
    this.FormProfile = this.formBuilder.group({
      username: [this.user?.username, [Validators.required]],
      company: [this.user?.company, []],
      country: [this.user?.country, []],
      photo: [this.user?.photo, []],
      phone: [this.user?.phone, []],
      bio: [this.user?.about, []],
      email: [this.user?.email, [Validators.email, Validators.required]],
      private: [this.user?.private, [Validators.requiredTrue]],
      follow: [this.user?.follow, []],
      followed: [this.user?.followed, []],
    })
  }

  async setUser() {
    this.user = history.state.user

    if (this.user == undefined) {
      this.aRoute.params.subscribe(async params => {
        const username = params['username'];
        try {
          this.user = await this.showUserService?.getUserByUsername(username);
          console.log(this.user)
          if(this.user == null || this.user == undefined) {
            alert('Erro ao buscar usuário, tente novamente!')
            this.navigate('')
          }
        } catch (error) {
          alert('Erro ao buscar usuário, tente novamente!')
          this.navigate('')
        }
      });
    }
  }

  onSubmit() {
    this.isSubmitted = true

    if(!this.FormProfile.valid) {
      this.isSubmitted = false
      if(this.FormProfile.controls['username'].value) {
        alert('Por favor, marque a opção de Política de Privacidade!')
      }else {
        alert('Insira um Nome de Usuário válido!')
      }

      return false
    }

    if(this.user == undefined) {
      alert('Ops, ocorreu um erro ao acessar este perfil, tente novamente!')
      this.navigate('')
    }

    //this.fazerAlgo()
    return true
  }

  navigate(link: string) {
    this.router.navigate([link])
  }
}
