import { Component } from '@angular/core';
import { User } from './model/model';
import { IUserService } from './services/model-related/iuser.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'team-booking-front';
  protected loggedUser : User | null = null;

  constructor(private authService : IUserService){

  }

  onNgInit(){
    this.loggedUser = this.authService.getLoggedUser();
  }


}
