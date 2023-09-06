import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './components/user/create-user/create-user.component';
import { LoginUserComponent } from './components/user/login-user/login-user.component';
import { InfoUserComponent } from './components/user/info-user/info-user.component';
import { TeamsUserComponent } from './components/user/teams-user/teams-user.component';

const routes: Routes = [
  {path: "user/create", component: CreateUserComponent},
  {path: "user/login", component: LoginUserComponent},
  {path: "user/:id", children: [
    {path:'info', component: InfoUserComponent},
    {path:"teams", component:TeamsUserComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
