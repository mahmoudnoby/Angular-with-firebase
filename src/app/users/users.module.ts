import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list/users-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    UsersListComponent,
    AddUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild( [
      { path: '' , component: UsersListComponent },
      { path: 'add-new' , component: AddUserComponent }
    ])
  ]
})
export class UsersModule { }
