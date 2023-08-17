import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'LearnHub';
  headers = ["", "Recursos", "Comunidades", "Empresa", "Posts"]
  urls = ["", "features", "communities", "b", "t/name/post"]
  current = 0
  isDarkMode = false;
  isLogged = false

  FormBusca: FormGroup

  constructor(private router: Router,
    private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.FormBusca = this.formBuilder.group({busca: ['', [Validators.required]],})
  }

  searchFor(text: string) {
    if(this.FormBusca.valid) {
      console.log(text)
    }
  }

  navigate(i: number) {
    this.current = i
    this.router.navigate([this.urls[i]])
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
  }


}
