import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public nav: NavbarService, private fAuth: AngularFireAuth, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {

  }

  logOut() {
    this.fAuth.signOut()
    .then( res => {
      this.toastr.success('logOut Successfully')
      this.router.navigate(['/login']);
    })
    .catch(error => {
      console.log(error.message);

    })
  }
}
