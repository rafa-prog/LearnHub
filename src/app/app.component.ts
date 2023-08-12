import { Component } from '@angular/core';
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

  constructor(private router: Router) {}

  navigate(i: number) {
    console.log(i)
    this.current = i
    this.router.navigate([this.urls[i]])
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
  }
}
