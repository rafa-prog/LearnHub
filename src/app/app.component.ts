import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './users/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'LearnHub'
  headers = ["", "Explorar", "Comunidades", "Empresa", "Criar Tópico", "Criar Post"]
  urls = ["", "explore", "communities", "company", "create-topic", "submit"]
  current = 0

  isSubmitted = false
  isDarkMode = false;
  isLogged = false

  FormBusca: FormGroup

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private auth: AuthService) {
      console.log(auth.getUser())
      if(auth.getUser()) {
          this.isLogged = true
      }
    }

  ngOnInit() {
    this.FormBusca = this.formBuilder.group({search: ['', [Validators.required]],})
  }

  onSubmit() {
    this.isSubmitted = true

    if(!this.FormBusca.valid) {
      this.isSubmitted = false
      return false
    }

    this.searchFor()
    return true
  }

  searchFor() {
    if(this.FormBusca.valid) {
      this.current = 0
      this.router.navigate([`/search/${this.FormBusca.controls['search'].value}`])
    }
  }

  navigate(pos: number) {
    this.current = pos
    this.router.navigate([this.urls[pos]])
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
  }

  async teste() {
    await this.auth.disconnect();
    this.isLogged = false

  }

}
