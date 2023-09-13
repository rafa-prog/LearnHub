import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import User from '../../models/User';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowUserService } from '../../services/show.user.service';
import { ListPostService } from 'src/app/forum/services/list.post.service';
import { Timestamp } from '@angular/fire/firestore/firebase';
import Post from 'src/app/forum/models/Post';
import { tap } from 'rxjs';
import { AuthService } from 'src/utils/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
goToUser(arg0: string) {
throw new Error('Method not implemented.');
}
  FormProfile: FormGroup
  isSubmitted: boolean
  image: string
  user: User | null
  posts$: any
  uid:any
  username: any
  userPosts: Post[] = []

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private showUserService: ShowUserService,
    private listPostsService: ListPostService,
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

    this.getUsername()
  }

  async getUsername() {
    await this.delay(1000);
    let user = this.authService.getUserLogged()

    if(user) {
      this.uid = user.uid
      let userData: User | null = await this.showUserService.execute(this.uid)
      this.username = userData?.username
      //console.log(this.username)
    }
  }

  async setUser() {
    this.user = history.state.user

    if (this.user == undefined) {
      this.aRoute.params.subscribe(async params => {
        const username = params['username'];
        try {
          this.user = await this.showUserService?.getUserByUsername(username);

          if(this.user == null || this.user == undefined) {
            alert('Erro ao buscar usuário, tente novamente!')
            this.navigate('')
          }

          if(this.user) {
            this.posts$ = await this.listPostsService.getPostsByUser(username)

            if (this.posts$) {
              this.posts$.pipe(
                tap((posts: Post[]) => {
                  this.userPosts = posts;
                })
              ).subscribe();
            }
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
      if(!this.FormProfile.controls['username'].value) {
        alert('Insira um Nome de Usuário válido!')
      }

      return false
    }

    if(this.user == null || this.user == undefined) {
      alert('Ops, ocorreu um erro ao acessar este perfil, tente novamente!')
      this.navigate('')
    }

    //this.fazerAlgo()
    return true
  }

  formatTimeAgo(postDate: Timestamp): string {
    const now = new Date();
    const timeDifference: number = now.getTime() - postDate.toDate().getTime();
    // Calcula a diferença em segundos
    const seconds = Math.floor(timeDifference / 1000);

    if (seconds < 60) {
      return `há ${seconds} segundo${seconds !== 1 ? 's' : ''}`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `há ${minutes} minuto${minutes !== 1 ? 's' : ''}`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `há ${hours} hora${hours !== 1 ? 's' : ''}`;
    } else if (seconds < 2592000) {
      const days = Math.floor(seconds / 86400);
      return `há ${days} dia${days !== 1 ? 's' : ''}`;
    } else if (seconds < 31536000) {
      const months = Math.floor(seconds / 2592000);
      return `há ${months} mês${months !== 1 ? 'es' : ''}`;
    } else {
      const years = Math.floor(seconds / 31536000);
      return `há ${years} ano${years !== 1 ? 's' : ''}`;
    }
  }

  delay(ms: number): Promise<void> {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }

  navigate(link: string) {
    this.router.navigate([link])
  }
}
