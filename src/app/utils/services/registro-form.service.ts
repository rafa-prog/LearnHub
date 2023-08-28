import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RegistroFormService {
  private formData: FormGroup;

  setFormData(formData: FormGroup) {
    this.formData = formData;
  }

  getFormData() {
    return this.formData;
  }
}
