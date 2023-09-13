import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateTopicService } from '../../services/create.topic.service';
import Topic from '../../models/Topic';
import { AuthService } from 'src/utils/auth.service';
import { ShowUserService } from 'src/app/users/services/show.user.service';
import User from 'src/app/users/models/User';

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.css']
})
export class CreateTopicComponent {
  FormTopic: FormGroup
  isSubmitted: boolean
  cancel: boolean = false
  currentOption: number = -1
  options: string[] = ['Público', 'Restrito', 'Privado'];
  description = ['Qualquer um pode ver, postar e comentar.',
  'Apenas os usuários selecionados podem postar.',
  'Apenas os usuários selecionados podem ver, postar e comentar.']

  username: any
  uid: any

  constructor(private router: Router, 
    private authService: AuthService,
    private showUserService: ShowUserService,
    private formBuilder: FormBuilder,
    private createTopicS: CreateTopicService){}

  ngOnInit() {
    this.isSubmitted = false;
    this.FormTopic = this.formBuilder.group({
      name: ['', [Validators.required]]
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

    if(!this.FormTopic.valid || this.currentOption == -1 || this.username == null) {
      this.isSubmitted = false
      this.FormTopic.reset()

      if(this.username == null) {
        this.navigate('/sign-in')
        alert('Usuário desconectado!')
        return false
      }
      alert('Campo(s) de cadastro de tópico inválido(s)!')
      return false
    }

    this.createTopic()
    return true
  }

  createTopic() {
    let topic: Topic = new Topic()

    topic.name = this.FormTopic.controls['name'].value
    topic.type = this.options[this.currentOption]
    topic.users = []
    topic.users.push(this.uid)
    topic.posts = []
    topic.owner = this.username

    this.createTopicS.execute(topic)
    alert('Tópico criado com sucesso!')
    this.navigate('/t/' + topic.name)
  }

  tryCancel() {
    this.cancel = true
  }

  retry() {
    //console.log(this.cancel)
    this.cancel = false
  }

  changeCurrent(i: number) {
    this.currentOption = i
  }

  ngOnDestroy(event: any) {
    this.voltarPaginaAnterior(event)
  }


  voltarPaginaAnterior(event: Event) {
    if(this.currentOption == -1 || this.FormTopic.dirty) {
      return this.cancel = true
    }

    return this.router.navigate(['/'])
  }

  navigate(link: string) {
    this.router.navigate([link])
  }
}
