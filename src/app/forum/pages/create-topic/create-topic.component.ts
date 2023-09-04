import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateTopicService } from '../../services/create.topic.service';
import Topic from '../../models/Topic';
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


  constructor(private router: Router, private formBuilder: FormBuilder,
    private createTopicS: CreateTopicService){}

  ngOnInit() {
    this.isSubmitted = false;
    this.FormTopic = this.formBuilder.group({
      name: ['', [Validators.required]]
    })
  }

  onSumbit() {
    this.isSubmitted = true

    if(!this.FormTopic.valid || this.currentOption == -1) {
      this.isSubmitted = false
      this.FormTopic.reset()
      alert('Campo(s) de cadastro de tópico inválido(s)!')
      return false
    }

    this.createTopic()
    return true
  }

  createTopic() {
    let topic: Topic = new Topic()

    topic.name = this.FormTopic.controls['name'].value
    topic.type = 'Primário'
    topic.users = []
    topic.posts = []
    topic.owner = 'rafab'

    this.createTopicS.execute(topic)
    alert('foi')
  }

  tryCancel() {
    this.cancel = true
  }

  retry() {
    console.log(this.cancel)
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
}
