import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'LearnHub';
  headers = ["Recursos", "Comunidades", "Empresa"]
  urls = ["features", "a", "b"]
}
