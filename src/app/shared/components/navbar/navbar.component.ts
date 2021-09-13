import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public nav: NavbarService, private router: Router) { }

  ngOnInit(): void {

  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login'])
  }
}
