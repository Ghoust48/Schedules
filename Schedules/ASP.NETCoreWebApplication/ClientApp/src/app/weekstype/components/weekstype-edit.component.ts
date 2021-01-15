import { Component, OnInit } from '@angular/core';
import {BaseFormComponent} from "../../base.form.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Timetable} from "../../timetables/interfaces/timetable";
import {ActivatedRoute, Router} from "@angular/router";
import {TimetablesService} from "../../timetables/services/timetables.service";
import {WeeksType} from "../interfaces/weeksType";
import {WeekstypeService} from "../services/weekstype.service";

@Component({
  selector: 'app-weekstype-edit',
  templateUrl: './weekstype-edit.component.html',
  styleUrls: ['./weekstype-edit.component.css']
})
export class WeekstypeEditComponent extends BaseFormComponent implements OnInit {

  private _title: string;

  private _form: FormGroup;

  private _weeksType: WeeksType;

  private _id?: number;

  constructor(
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _weekstypeService: WeekstypeService) {
    super();
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      type: ['',
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

      this._weekstypeService.get<WeeksType>(this.id)
        .subscribe(result => {
          this.weeksType = result;
          this.title = `Edit - ${this.weeksType.type}`;

          this.form.patchValue(this.weeksType);
        }, error => console.error(error));
    }
    else {
      // ADD NEW MODE

      this.title = "Create a new Time";
    }
  }

  public onSubmit() {

    let weeksType = (this.id) ? this.weeksType : <WeeksType>{};

    weeksType.type = this.form.get("type").value;

    if (this.id) {
      // EDIT mode
      this._weekstypeService
        .put<WeeksType>(weeksType)
        .subscribe(result => {

          console.log("WeeksType " + weeksType.id + " has been updated.");

          this._router.navigate(['/weekstype']);
        }, error => console.error(error));
    }
    else {
      // ADD NEW mode
      this._weekstypeService
        .post<WeeksType>(weeksType)
        .subscribe(result => {

          console.log("WeeksType " + result.id + " has been created.");

          this._router.navigate(['/weekstype']);
        }, error => console.error(error));
    }
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }
  get weeksType(): WeeksType {
    return this._weeksType;
  }

  set weeksType(value: WeeksType) {
    this._weeksType = value;
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
