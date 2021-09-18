import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/shared/services/navbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  constructor(private navService: NavbarService, private fb:FormBuilder, private fAuth: AngularFireAuth) {
    this.navService.hide();
    this.loginForm = this.fb.group({
      userEmail: ['', [Validators.required]],
      userPassword: ['', [Validators.required]]
    })
   }

  ngOnInit(): void {

  }

  userLogin() :void {
    console.log(this.loginForm.value);
    this.fAuth.signInWithEmailAndPassword(this.loginForm.get('userEmail')?.value, this.loginForm.get('userPassword')?.value)
    .then( res => {
      console.log(res);

    })
    .catch( error => {
      console.log(error);

    })
  }


}
