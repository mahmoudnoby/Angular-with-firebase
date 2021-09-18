import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NavbarService } from 'src/app/shared/services/navbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  constructor(private navService: NavbarService, private fb:FormBuilder,
     private fAuth: AngularFireAuth, private toastr: ToastrService, private router: Router) {
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
      this.toastr.success('Welcome');
      this.router.navigate(['users-list']);
      this.navService.show();
    })
    .catch( error => {
      debugger
      console.log(error.message);
      this.toastr.error(error.message)

    })
  }


}
