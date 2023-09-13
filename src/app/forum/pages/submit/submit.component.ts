import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Post from '../../models/Post';
import { CreatePostService } from '../../services/create.post.service';
import { AuthService } from 'src/utils/auth.service';
import { ShowUserService } from 'src/app/users/services/show.user.service';
import User from 'src/app/users/models/User';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.css']
})
export class SubmitComponent {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  items: string[] = [];
  blockedTag = 0
  topic: any

  announcer = inject(LiveAnnouncer);

  FormPost: FormGroup
  isSubmitted: boolean
  
  username: any
  uid: any

  constructor(private router: Router, 
    private authService: AuthService,
    private cPostS: CreatePostService,
    private showUserService: ShowUserService, 
    private formBuilder: FormBuilder) {}

  ngOnInit() {
    // puxa o tópico e n deixa tirar
    this.topic = history.state.topic

    if(this.topic == undefined) {
      alert('Ops, ocorreu um engano tente acessar novamente o tópico')
      this.navigate('/')
    }

    this.items.push(this.topic)

    this.isSubmitted = false;
    this.FormPost = this.formBuilder.group({
      title: ['', [Validators.required]],
      text: ['', [Validators.required]],
      tags: [this.items, []]
    })
    this.getUsername()
  }

  async getUsername() {
    let user = this.authService.getUserLogged()

    if(user) {
      this.uid = user.uid
      let userData: User | null = await this.showUserService.execute(this.uid)
      this.username = userData?.username
    }
  }

  onSumbit() {
    this.isSubmitted = true

    if(!this.FormPost.valid) {
      this.isSubmitted = false
      this.FormPost.reset()
      alert('Campo(s) de cadastro inválido(s)!')
      return false
    }

    this.post()
    return true
  }

  post() {
    let post = new Post()
    let topic = this.items[0]
    this.items.shift()

    post.title = this.FormPost.controls['title'].value
    post.topic = topic
    post.user = this.username

    // arrumado

    post.tags = this.items
    post.votes = 0
    post.replies = []

    post.content = this.FormPost.controls['text'].value

    post.post_date = new Date()
    post.edit_date = post.post_date

    alert('Post criado com sucesso!')
    this.cPostS.execute(post).then(() => {
      this.router.navigate(['/t/' + topic + '/' + post.id])
    });

  }

  voltarPaginaAnterior() {
    alert('cancelar operação?')
    return this.router.navigate(['/'])
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our item
    if (value) {
      this.items.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(item: string): void {
    const index = this.items.indexOf(item);

    if (index >= 0) {
      this.items.splice(index, 1);

      this.announcer.announce(`Removed ${item}`);
    }
  }

  edit(item: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove item if it no longer has a name
    if (!value) {
      this.remove(item);
      return;
    }

    // Edit existing item
    const index = this.items.indexOf(item);
    if (index >= 0) {
      this.items[index] = value;
    }
  }

  navigate(link: string) {
    this.router.navigate([link])
  }
}
