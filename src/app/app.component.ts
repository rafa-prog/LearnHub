import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'LearnHub';
  headers = ["Recursos", "Comunidades", "Empresa"]
  urls = ["features", "communities", "b"]
  isLogged = false

  constructor(private router: Router) {}

  navigate(link: string) {
    this.router.navigate([link])
  }
}
