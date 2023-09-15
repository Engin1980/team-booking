import { Component } from '@angular/core';
import { TeamsUserComponent } from '../../user/user-teams/user-teams.component';
import { ITeamService } from 'src/app/services/model-related/iteam.service';
import { Event, ID, ModelFactory, Team, User } from 'src/app/model/model';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { throwUnexpectedException } from 'src/app/classes/UnexpectedException';
import { IUserService } from 'src/app/services/model-related/iuser.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IEventService } from 'src/app/services/model-related/ievent.service';
import { v4 as uuidv4 } from "uuid";
import { concat, mergeMap } from 'rxjs';

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.css']
})
export class TeamInfoComponent {

  protected team: Team | undefined;
  protected members: User[] = [];
  protected events: Event[] = [];
  protected teamId: ID;
  protected isLoggedUserAdmin: boolean | undefined;

  protected formEvent = new FormGroup({
    title: new FormControl('', Validators.required),
    fromDate: new FormControl('2023-09-13'),
    fromTime: new FormControl('17:00'),
    durationInMinutes: new FormControl('90'),
    repeat: new FormControl(false),
    repeatToDate: new FormControl({ value: '', disabled: true }),
    repeatDayInterval: new FormControl({ value: 'w', disabled: true })
  });

  constructor(
    private teamService: ITeamService,
    private eventService: IEventService,
    private route: ActivatedRoute,
    private userService: IUserService
  ) {
    const tmp = route.snapshot.paramMap.get("id") ?? throwUnexpectedException("Team-id is empty");
    this.teamId = ModelFactory.createId(tmp);
  }

  ngOnInit() {
    this.teamService.getById(this.teamId).subscribe(
      q => this.team = q
    );
    this.teamService.getAllMembers(this.teamId).subscribe(
      q => this.members.push(q)
    );
    this.eventService.getAllByTeamId(this.teamId).subscribe(
      q => this.events.push(q)
    );

    //TODO last as fails due to not logged in user
    this.teamService.isMemberAdmin(this.teamId, this.userService.getLoggedUser() ?? throwUnexpectedException("User not logged in")).subscribe(
      q => this.isLoggedUserAdmin = true
    );
  }

  createEvent() {
    const title = this.formEvent.get("title")?.value ?? throwUnexpectedException();
    const fromDateS = this.formEvent.get("fromDate")?.value ?? throwUnexpectedException();
    const fromTimeS = this.formEvent.get("fromTime")?.value ?? throwUnexpectedException();
    const durationInMinutes = +(this.formEvent.get("durationInMinutes")?.value ?? throwUnexpectedException());
    const repeat = this.formEvent.get("repeat")?.value ?? throwUnexpectedException();
    const repeatToDateS = this.formEvent.get("repeatToDate")?.value ?? throwUnexpectedException();
    const repeatDayIntervalFlag = this.formEvent.get("repeatDayInterval")?.value ?? throwUnexpectedException();

    const newEvents: Event[] = [];

    const repeatDayInterval = repeatDayIntervalFlag == "d" ? 1
      : repeatDayIntervalFlag == "w" ? 7
        : repeatDayIntervalFlag == "ww" ? 14
          : repeatDayIntervalFlag == "m" ? -1
            : throwUnexpectedException("Unknown repeat interval flat " + repeatDayIntervalFlag);

    let currentDate: Date = new Date(fromDateS);
    let time: Date = new Date(fromDateS + " " + fromTimeS);
    let hours = time.getHours();
    let minutes = time.getMinutes();

    const groupId = uuidv4();

    if (!repeat) {
      const eventDateTime = new Date(currentDate);
      eventDateTime.setHours(time.getHours());
      eventDateTime.setMinutes(time.getMinutes());

      const newEvent: Event = {
        id: 0,
        title: title,
        date: eventDateTime,
        teamId: this.teamId.id,
        duration: durationInMinutes,
        groupId: groupId
      };
      newEvents.push(newEvent);
    } else {
      const repeatToDate = new Date(repeatToDateS);

      do {
        const eventDateTime = new Date(currentDate);
        eventDateTime.setHours(hours);
        eventDateTime.setMinutes(minutes);

        const newEvent: Event = {
          id: 0,
          title: title,
          date: eventDateTime,
          teamId: this.teamId.id,
          duration: durationInMinutes,
          groupId: groupId
        };
        newEvents.push(newEvent);

        if (repeatDayInterval > 0)
          currentDate.setDate(currentDate.getDate() + repeatDayInterval);
        else
          currentDate.setMonth(currentDate.getMonth() + 1);
      } while (currentDate <= repeatToDate);
    }

    this.eventService.createList(newEvents).pipe(
      mergeMap(_ => this.eventService.getAllByTeamId(this.teamId))
    ).subscribe(
      q => this.events.push(q)
    );
  }

  formEventRepeatChanged() {
    const val = this.formEvent.get("repeat")?.value;
    if (val) {
      this.formEvent.get("repeatToDate")?.disable();
      this.formEvent.get("repeatDayInterval")?.disable();
    } else {
      this.formEvent.get("repeatToDate")?.enable();
      this.formEvent.get("repeatDayInterval")?.enable();
    }
  }
}
