import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUp3Component } from './sign-up3.component';

describe('SignUp3Component', () => {
  let component: SignUp3Component;
  let fixture: ComponentFixture<SignUp3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignUp3Component]
    });
    fixture = TestBed.createComponent(SignUp3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
