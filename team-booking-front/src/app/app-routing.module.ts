import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './components/user/user-create/user-create.component';
import { LoginUserComponent } from './components/user/user-login/user-login.component';
import { TeamsUserComponent } from './components/user/user-teams/user-teams.component';
import { UserInfoComponent } from './components/user/user-info/user-info.component';

const routes: Routes = [
  {path: "user/create", component: CreateUserComponent},
  {path: "user/login", component: LoginUserComponent},
  {path: "user/:id", children: [
    {path:'info', component: UserInfoComponent},
    {path:"teams", component:TeamsUserComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
