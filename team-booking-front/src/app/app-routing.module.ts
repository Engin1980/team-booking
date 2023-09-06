import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './components/user/create-user/create-user.component';
import { LoginUserComponent } from './components/user/login-user/login-user.component';

const routes: Routes = [
  {path: "user/create", component: CreateUserComponent},
  {path: "user/login", component: LoginUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
