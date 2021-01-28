import { Component, OnInit } from '@angular/core';
import {BaseFormComponent} from "../../base.form.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Lesson} from "../../lessons/interfaces/lesson";
import {Auditory} from "../../auditories/interfaces/auditory";
import {Timetable} from "../../timetables/interfaces/timetable";
import {WeeksType} from "../../weekstype/interfaces/weeksType";
import {DaysWeek} from "../../daysweek/interfaces/days-week";
import {LessonType} from "../../lesson-type/interfaces/lesson-type";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiResult} from "../../base.service";
import {Schedule} from "../interfaces/schedule";
import {SchedulePageService} from "../services/schedule-page.service";

@Component({
  selector: 'app-schedule-page-edit',
  templateUrl: './schedule-page-edit.component.html',
  styleUrls: ['./schedule-page-edit.component.css']
})
export class SchedulePageEditComponent extends BaseFormComponent implements OnInit{

  private _title: string;

  private _form: FormGroup;

  private _schedule: Schedule;

  private _id?: number;

  private _auditories: Auditory[];

  private _timetables: Timetable[];

  private _weeksTypes: WeeksType[];

  private _daysWeeks: DaysWeek[];

  private _lessonTypes: LessonType[];

  private _lessons: Lesson[];

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router,
              private _scheduleService: SchedulePageService) {
    super();
  }

  public ngOnInit(): void {
    this.form = new FormGroup({
      auditoryId: new FormControl('', Validators.required),
      timetableId: new FormControl('', Validators.required),
      weeksTypeId: new FormControl('', Validators.required),
      daysWeekId: new FormControl('', Validators.required),
      lessonTypeId: new FormControl('', Validators.required),
      lessonId:  new FormControl('', Validators.required),
    });

    this.loadData();
  }

  public loadData() {
    this.loadAuditories();
    this.loadTimetables();
    this.loadWeeksType();
    this.loadDaysWeek();
    this.loadLessonTypes();
    this.loadLessons();

    // retrieve the ID from the 'id'
    this.id = +this._activatedRoute.snapshot.paramMap.get('id');

    if (this.id) {
      // EDIT MODE

      // fetch the city from the server
      this._scheduleService.get<Schedule>(this.id).subscribe(result => {
        this.schedule = result;
        this.title = "Edit - schedule";// + this.lesson.name;

        // update the form with the city value
        this.form.patchValue(this.schedule);
      }, error => console.error(error));
    }
    else {
      // ADD NEW MODE
      this.title = "Create a new schedule";
    }
  }

  public loadDaysWeek() {
    this._scheduleService.getChildrenByUrl<ApiResult<DaysWeek>>(
      "daysweeks",
      0,
      9999,
      "day",
      null,
      null,
      null,
    ).subscribe(result => {
      this.daysWeeks = result.data;
    }, error => console.error(error));
  }

  public loadTimetables() {
    this._scheduleService.getChildrenByUrl<ApiResult<Timetable>>(
      "timetables",
      0,
      9999,
      "startTime",
      null,
      null,
      null,
    ).subscribe(result => {
      this.timetables = result.data;
    }, error => console.error(error));
  }

  public loadAuditories() {
    this._scheduleService.getChildrenByUrl<ApiResult<Auditory>>(
      "auditories",
      0,
      9999,
      "name",
      null,
      null,
      null,
    ).subscribe(result => {
      this.auditories = result.data;
    }, error => console.error(error));
  }

  public loadWeeksType() {
    this._scheduleService.getChildrenByUrl<ApiResult<WeeksType>>(
      "weekstypes",
      0,
      9999,
      "type",
      null,
      null,
      null,
    ).subscribe(result => {
      this.weeksTypes = result.data;
    }, error => console.error(error));
  }

  public loadLessonTypes() {
    this._scheduleService.getChildrenByUrl<ApiResult<LessonType>>(
      "lessontypes",
      0,
      9999,
      "type",
      null,
      null,
      null,
    ).subscribe(result => {
      this.lessonTypes = result.data;
    }, error => console.error(error));
  }

  public loadLessons() {
    this._scheduleService.getChildrenByUrl<ApiResult<Lesson>>(
      "lessons",
      0,
      9999,
      "name",
      null,
      null,
      null,
    ).subscribe(result => {
      this.lessons = result.data;
    }, error => console.error(error));
  }

  public onSubmit() {

    let schedule = (this.id) ? this.schedule : <Schedule>{};

    schedule.auditoryId = +this.form.get("auditoryId").value;
    schedule.timetableId = +this.form.get("timetableId").value;
    schedule.weeksTypeId = +this.form.get("weeksTypeId").value;
    schedule.daysWeekId = +this.form.get("daysWeekId").value;
    schedule.lessonTypeId = +this.form.get("lessonTypeId").value;
    schedule.lessonId = +this.form.get("lessonId").value;


    if (this.id) {
      // EDIT mode
      this._scheduleService
        .put<Schedule>(schedule)
        .subscribe(result => {

          console.log("schedule " + schedule.id + " has been updated.");

          // go back to cities view
          this._router.navigate(['/schedules']);
        }, error => console.error(error));
    }
    else {
      // ADD NEW mode
      this._scheduleService
        .post<Schedule>(schedule)
        .subscribe(result => {

          console.log("schedule " + result.id + " has been created.");
          console.log(result)

          // go back to cities view
          this._router.navigate(['/schedules']);
        }, error => console.error(error));
    }
  }

  get lessons(): Lesson[] {
    return this._lessons;
  }

  set lessons(value: Lesson[]) {
    this._lessons = value;
  }
  get daysWeeks(): DaysWeek[] {
    return this._daysWeeks;
  }

  set daysWeeks(value: DaysWeek[]) {
    this._daysWeeks = value;
  }
  get timetables(): Timetable[] {
    return this._timetables;
  }

  set timetables(value: Timetable[]) {
    this._timetables = value;
  }
  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }
  get schedule(): Schedule {
    return this._schedule;
  }

  set schedule(value: Schedule) {
    this._schedule = value;
  }
  get form(): FormGroup {
    return this._form;
  }

  set form(value: FormGroup) {
    this._form = value;
  }
  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get lessonTypes(): LessonType[] {
    return this._lessonTypes;
  }

  set lessonTypes(value: LessonType[]) {
    this._lessonTypes = value;
  }
  get weeksTypes(): WeeksType[] {
    return this._weeksTypes;
  }

  set weeksTypes(value: WeeksType[]) {
    this._weeksTypes = value;
  }
  get auditories(): Auditory[] {
    return this._auditories;
  }

  set auditories(value: Auditory[]) {
    this._auditories = value;
  }
}
