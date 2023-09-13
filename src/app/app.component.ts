import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../utils/auth.service';
import { ShowUserService } from './users/services/show.user.service';
import User from './users/models/User';
import { UpdateUserService } from './users/services/update.user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'LearnHub'
  headers = ["", "Explorar", "Comunidades", "Empresa", "Criar Tópico"]
  urls = ["", "explore", "communities", "company", "create-topic"]
  current = 0
  
  user: any
  photo: any
  uid: any
  username: any
  email: any
  isLogged = false
  isDarkMode = false;

  isSubmitted = false

  showUserOptions = false

  FormBusca: FormGroup

  constructor(private router: Router,
    private showUserService: ShowUserService,
    private updateUserService: UpdateUserService,
    private formBuilder: FormBuilder,
    private auth: AuthService) {
      this.getCurrentUser()
    }

  ngOnInit() {
    this.FormBusca = this.formBuilder.group({search: ['', [Validators.required]],})
    this.setCurrent()
  }

  async getCurrentUser() {
    
    await this.delay(1000);
    this.user = this.auth.getUserLogged()
    //console.log(this.user)

    if(this.user == null) {
      this.isLogged = false
    }else {
      this.isLogged = true
      this.uid = this.user.uid
      let userData: User | null = await this.showUserService.execute(this.uid)

      this.username = userData?.username
      this.email = userData?.email

      this.photo = userData?.photo
      this.isDarkMode = userData?.darkMode || false
    }
  }

  disconnectUser() {
    this.auth.disconnect()
    this.user = null
    location.reload();
  }

  setCurrent() {
    const urlTree = this.router.parseUrl(this.router.url);
    const primaryChild = urlTree.root.children['primary'];

    if (primaryChild) {
      const segments = primaryChild.segments.map(segment => segment.path);
      const firstSegment = segments.length > 0 ? segments[0] : '';
      const index = this.urls.indexOf(firstSegment);

      if (index !== -1) {
        this.current = index;
      } else {
        this.current = 0;
      }
    } else {
      this.current = 0; // Ou defina um valor padrão apropriado se necessário
    }
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
    this.FormBusca.reset()
    this.router.navigate([this.urls[pos]])
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.updateUserService.toggleDarkMode(this.uid ,this.isDarkMode)
  }

  delay(ms: number): Promise<void> {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }

  async altUserSettings() {
    this.showUserOptions = !this.showUserOptions;
  }

}
