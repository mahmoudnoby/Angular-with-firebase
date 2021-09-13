import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {path: '', redirectTo: 'login', pathMatch: 'full'},

  { path: 'login',
    loadChildren: () => import('./authentication/authentication.module').then( (m) => m.AuthenticationModule  )
  },
  {
    path: 'users-list',
    loadChildren: () => import ('./users/users.module').then((m) =>m.UsersModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
