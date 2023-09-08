import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { CreateUserComponent } from './components/user/user-create/user-create.component';
import { IUserService } from './services/model-related/iuser.service';
import { FireUserService } from './services/backend-related/fire/fire-user.service';
import { LoginUserComponent } from './components/user/user-login/user-login.component';
import { TeamsUserComponent } from './components/user/user-teams/user-teams.component';
import { ITeamService } from './services/model-related/iteam.service';
import { FireTeamService } from './services/backend-related/fire/fire-team.service';
import { UserInfoComponent } from './components/user/user-info/user-info.component';
import { TeamInfoComponent } from './components/team/team-info/team-info.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
    LoginUserComponent,
    UserInfoComponent,
    TeamsUserComponent,
    UserInfoComponent,
    TeamInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // for firestore
  ],
  providers: [
    { provide: IUserService, useClass: FireUserService },
    { provide: ITeamService, useClass: FireTeamService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }