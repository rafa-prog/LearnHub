import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.css']
})
export class CreateTopicComponent {
  FormTopic: FormGroup
  isSubmitted: boolean

  constructor(private router: Router){}

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

  voltarPaginaAnterior() {
    alert('cancelar operação?')
    return this.router.navigate(['/'])
  }
}
