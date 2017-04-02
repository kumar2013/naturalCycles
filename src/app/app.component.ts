import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { EmailValidator } from './emailValidator.service';

declare var Mailcheck: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  show: boolean = false;
  emailSuggestion: string = '';

  loginForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.loginForm = fb.group({
      'email': [null, Validators.compose([Validators.required, EmailValidator.validate])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12)])]
    })

    this.loginForm.valueChanges.subscribe(data => {
      let emailAddress = data.email;

      if (emailAddress.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {

        Mailcheck.run({
          email: emailAddress,
          suggested: (suggestion) => {
            this.show = true;
            this.emailSuggestion = suggestion.full;
          },
          empty: () => {
            this.show = false;
          }
        });
      } else {
        this.show = false;
      }
    })
  }

  submitForm(value: any):void {
    console.log('Form Submitted with values: ', value);
    this.loginForm.reset();
  }
}

