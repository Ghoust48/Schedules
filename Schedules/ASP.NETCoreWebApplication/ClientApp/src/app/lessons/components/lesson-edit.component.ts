import {BaseFormComponent} from "../../base.form.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Lesson} from "../interfaces/lesson";
import {ActivatedRoute, Router} from "@angular/router";
import {LessonsService} from "../services/lessons.service";
import {Component, OnInit} from "@angular/core";
import {ApiResult} from "../../base.service";
import {Auditory} from "../../auditories/interfaces/auditory";
import {Timetable} from "../../timetables/interfaces/timetable";
import {WeeksType} from "../../weekstype/interfaces/weeksType";
import {DaysWeek} from "../../daysweek/interfaces/days-week";
import {LessonType} from "../../lesson-type/interfaces/lesson-type";

@Component({
  selector: 'app-lesson-edit',
  templateUrl: './lesson-edit.component.html',
  styleUrls: ['./lesson-edit.component.css']
})
export class LessonEditComponent extends BaseFormComponent implements OnInit{

  private _title: string;

  private _form: FormGroup;

  private _lesson: Lesson;

  private _id?: number;

  private _auditories: Auditory[];

  private _timetables: Timetable[];

  private _weeksTypes: WeeksType[];

  private _daysWeeks: DaysWeek[];

  private _lessonTypes: LessonType[];

  private _activityLog: string = '';

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router,
              private _lessonsService: LessonsService) {
    super();
  }

  public ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      auditoryId: new FormControl('', Validators.required),
      timetableId: new FormControl('', Validators.required),
      weeksTypeId: new FormControl('', Validators.required),
      daysWeekId: new FormControl('', Validators.required),
      lessonTypeId: new FormControl('', Validators.required),
    });

    this.loadData();
  }

  public loadData() {
    // load auditories
    this.loadAuditories();
    this.loadTimetables();
    this.loadWeeksType();
    this.loadDaysWeek();
    this.loadLessonTypes();

    // retrieve the ID from the 'id'
    this.id = +this._activatedRoute.snapshot.paramMap.get('id');

    if (this.id) {
      // EDIT MODE

      // fetch the city from the server
      this._lessonsService.get<Lesson>(this.id).subscribe(result => {
        this.lesson = result;
        this.title = "Edit - " + this.lesson.name;

        // update the form with the city value
        this.form.patchValue(this.lesson);
      }, error => console.error(error));
    }
    else {
      // ADD NEW MODE
      this.title = "Create a new Lesson";
    }
  }

  public loadAuditories() {
    this._lessonsService.getChildrenByUrl<ApiResult<Auditory>>(
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

  public loadLessonTypes() {
    this._lessonsService.getChildrenByUrl<ApiResult<LessonType>>(
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

  public loadDaysWeek() {
    this._lessonsService.getChildrenByUrl<ApiResult<DaysWeek>>(
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
    this._lessonsService.getChildrenByUrl<ApiResult<Timetable>>(
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

  public loadWeeksType() {
    this._lessonsService.getChildrenByUrl<ApiResult<WeeksType>>(
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

  public onSubmit() {

    let lesson = (this.id) ? this.lesson : <Lesson>{};

    lesson.name = this.form.get("name").value;
    lesson.auditoryId = +this.form.get("auditoryId").value;
    lesson.timetableId = +this.form.get("timetableId").value;
    lesson.weeksTypeId = +this.form.get("weeksTypeId").value;
    lesson.daysWeekId = +this.form.get("daysWeekId").value;
    lesson.lessonTypeId = +this.form.get("lessonTypeId").value;


    if (this.id) {
      // EDIT mode
      this._lessonsService
        .put<Lesson>(lesson)
        .subscribe(result => {

          console.log("Lesson " + lesson.id + " has been updated.");

          // go back to cities view
          this._router.navigate(['/lessons']);
        }, error => console.error(error));
    }
    else {
      // ADD NEW mode
      this._lessonsService
        .post<Lesson>(lesson)
        .subscribe(result => {

          console.log("Lesson " + result.id + " has been created.");

          // go back to cities view
          this._router.navigate(['/lessons']);
        }, error => console.error(error));
    }
  }

  get activityLog(): string {
    return this._activityLog;
  }

  set activityLog(value: string) {
    this._activityLog = value;
  }
  get auditories(): Auditory[] {
    return this._auditories;
  }

  set auditories(value: Auditory[]) {
    this._auditories = value;
  }
  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }
  get lesson(): Lesson {
    return this._lesson;
  }

  set lesson(value: Lesson) {
    this._lesson = value;
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

  get timetables(): Timetable[] {
    return this._timetables;
  }

  set timetables(value: Timetable[]) {
    this._timetables = value;
  }

  get weeksTypes(): WeeksType[] {
    return this._weeksTypes;
  }

  set weeksTypes(value: WeeksType[]) {
    this._weeksTypes = value;
  }
  get daysWeeks(): DaysWeek[] {
    return this._daysWeeks;
  }

  set daysWeeks(value: DaysWeek[]) {
    this._daysWeeks = value;
  }

  get lessonTypes(): LessonType[] {
    return this._lessonTypes;
  }

  set lessonTypes(value: LessonType[]) {
    this._lessonTypes = value;
  }

}
