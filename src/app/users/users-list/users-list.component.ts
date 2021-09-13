import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  items!: Observable<any[]>;
  constructor(firestore: AngularFirestore) {
    this.items =firestore.collection('top-students').valueChanges();

  }

  ngOnInit(): void {
    console.log(this.items);

  }

}
