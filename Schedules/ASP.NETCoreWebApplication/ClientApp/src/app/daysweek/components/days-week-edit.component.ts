import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WeeksType} from "../../weekstype/interfaces/weeksType";
import {ActivatedRoute, Router} from "@angular/router";
import {WeekstypeService} from "../../weekstype/services/weekstype.service";
import {BaseFormComponent} from "../../base.form.component";
import {DaysWeekService} from "../services/days-week.service";
import {DaysWeek} from "../interfaces/days-week";

@Component({
  selector: 'app-days-week-edit',
  templateUrl: './days-week-edit.component.html',
  styleUrls: ['./days-week-edit.component.css']
})
export class DaysWeekEditComponent extends BaseFormComponent implements OnInit {


  private _title: string;

  private _form: FormGroup;

  private _daysWeek: DaysWeek;

  private _id?: number;

  constructor(
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _daysWeekService: DaysWeekService) {
    super();
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      day: ['',
        [Validators.required]
      ]
    });

    this.loadData();
  }

  public loadData() {
    // retrieve the ID from the 'id'
    this.id = +this._activatedRoute.snapshot.paramMap.get('id');

    if (this.id) {
      // EDIT MODE

      this._daysWeekService.get<DaysWeek>(this.id)
        .subscribe(result => {
          this.daysWeek = result;
          this.title = `Edit - ${this.daysWeek.day}`;

          this.form.patchValue(this.daysWeek);
        }, error => console.error(error));
    }
    else {
      // ADD NEW MODE

      this.title = "Create a new Time";
    }
  }

  public onSubmit() {

    let daysWeek = (this.id) ? this.daysWeek : <DaysWeek>{};

    daysWeek.day = this.form.get("day").value;

    if (this.id) {
      // EDIT mode
      this._daysWeekService
        .put<DaysWeek>(daysWeek)
        .subscribe(result => {

          console.log("DaysWeek " + daysWeek.id + " has been updated.");

          this._router.navigate(['/daysweeks']);
        }, error => console.error(error));
    }
    else {
      // ADD NEW mode
      this._daysWeekService
        .post<DaysWeek>(daysWeek)
        .subscribe(result => {

          console.log("DaysWeek " + result.id + " has been created.");

          this._router.navigate(['/daysweeks']);
        }, error => console.error(error));
    }
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }
  get daysWeek(): DaysWeek {
    return this._daysWeek;
  }

  set daysWeek(value: DaysWeek) {
    this._daysWeek = value;
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
