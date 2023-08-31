import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.css']
})
export class CreateTopicComponent {
  FormTopic: FormGroup
  isSubmitted: boolean
  marca: boolean = false
  currentOption: number = 0
  options: string[] = ['Público', 'Restrito', 'Privado'];
  description = ['Qualquer um pode ver, postar e comentar.',
  'Apenas os usuários selecionados podem postar.',
  'Apenas os usuários selecionados podem ver, postar e comentar.']


  constructor(private router: Router, private formBuilder: FormBuilder){}

  ngOnInit() {
    this.isSubmitted = false;
    this.FormTopic = this.formBuilder.group({
      name: ['', [Validators.required]],
      type: [this.options[this.currentOption], [Validators.required]],
    })
  }

  onSumbit() {
    this.isSubmitted = true

    if(!this.FormTopic.valid) {
      this.isSubmitted = false
      this.FormTopic.reset()
      alert('Campo(s) de cadastro inválido(s)!')
      return false
    }

    this.createTopic()
    return true
  }

  createTopic() {

  }

  changeCurrent(i: number) {
    this.marca = true
    this.currentOption = i
  }

  voltarPaginaAnterior() {
    alert('cancelar operação?')
    return this.router.navigate(['/'])
  }
}
