import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { CreateUserComponent } from './components/user/create-user/create-user.component';
import { IUserService } from './services/model-related/iuser.service';
import { FireUserService } from './services/backend-related/fire/fire-user.service';
import { LoginUserComponent } from './components/user/login-user/login-user.component';
import { InfoUserComponent } from './components/user/info-user/info-user.component';
import { TeamsUserComponent } from './components/user/teams-user/teams-user.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
    LoginUserComponent,
    InfoUserComponent,
    TeamsUserComponent
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }