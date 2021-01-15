import { Component, OnInit } from '@angular/core';
import {BaseFormComponent} from "../../base.form.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Auditory} from "../../auditories/interfaces/auditory";
import {ActivatedRoute, Router} from "@angular/router";
import {AuditoriesService} from "../../auditories/services/auditories.service";
import {Timetable} from "../interfaces/timetable";
import {TimetablesService} from "../services/timetables.service";

@Component({
  selector: 'app-timetable-edit',
  templateUrl: './timetable-edit.component.html',
  styleUrls: ['./timetable-edit.component.css']
})
export class TimetableEditComponent extends BaseFormComponent implements OnInit {

  // the view title
  private _title: string;

  // the form model
  private _form: FormGroup;

  // the city object to edit or create
  private _timetable: Timetable;

  // the auditory object id, as fetched from the active route:
  // It's NULL when we're adding a new auditory,
  // and not NULL when we're editing an existing one.
  private _id?: number;

  constructor(
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _timetablesService: TimetablesService) {
    super();
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      startTime: ['',
        [Validators.required,
        Validators.pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)]
      ],
      endTime: ['',
        [Validators.required,
        Validators.pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)]
      ],
    });

    this.loadData();
  }

  public loadData() {
    // retrieve the ID from the 'id'
    this.id = +this._activatedRoute.snapshot.paramMap.get('id');

    if (this.id) {
      // EDIT MODE

      this._timetablesService.get<Timetable>(this.id)
        .subscribe(result => {
          this.timetable = result;
          this.title = `Edit - ${this.timetable.startTime}-${this.timetable.endTime}`;

          this.form.patchValue(this.timetable);
        }, error => console.error(error));
    }
    else {
      // ADD NEW MODE

      this.title = "Create a new Time";
    }
  }

  public onSubmit() {

    let timetable = (this.id) ? this.timetable : <Timetable>{};

    timetable.startTime = this.form.get("startTime").value;
    timetable.endTime = this.form.get("endTime").value;

    if (this.id) {
      // EDIT mode
      this._timetablesService
        .put<Timetable>(timetable)
        .subscribe(result => {

          console.log("Timetable " + timetable.id + " has been updated.");

          this._router.navigate(['/timetables']);
        }, error => console.error(error));
    }
    else {
      // ADD NEW mode
      this._timetablesService
        .post<Timetable>(timetable)
        .subscribe(result => {

          console.log("Timetable " + result.id + " has been created.");

          this._router.navigate(['/timetables']);
        }, error => console.error(error));
    }
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }
  get timetable(): Timetable {
    return this._timetable;
  }

  set timetable(value: Timetable) {
    this._timetable = value;
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
}
