import { Component, OnInit } from '@angular/core';
import {BaseFormComponent} from "../../base.form.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {LessonType} from "../interfaces/lesson-type";
import {LessonTypeService} from "../services/lesson-type.service";

@Component({
  selector: 'app-lesson-type-edit',
  templateUrl: './lesson-type-edit.component.html',
  styleUrls: ['./lesson-type-edit.component.css']
})
export class LessonTypeEditComponent extends BaseFormComponent implements OnInit {

  private _title: string;

  private _form: FormGroup;

  private _lessonType: LessonType;

  private _id?: number;

  constructor(
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _lessonTypeService: LessonTypeService) {
    super();
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      type: ['',
        [Validators.required]
      ],
    });

    this.loadData();
  }

  public loadData() {
    // retrieve the ID from the 'id'
    this.id = +this._activatedRoute.snapshot.paramMap.get('id');

    if (this.id) {
      // EDIT MODE

      this._lessonTypeService.get<LessonType>(this.id)
        .subscribe(result => {
          this.lessonType = result;
          this.title = `Edit - ${this.lessonType.type}`;

          this.form.patchValue(this.lessonType);
        }, error => console.error(error));
    }
    else {
      // ADD NEW MODE

      this.title = "Create a new Time";
    }
  }

  public onSubmit() {

    let lessonType = (this.id) ? this.lessonType : <LessonType>{};

    lessonType.type = this.form.get("type").value;

    if (this.id) {
      // EDIT mode
      this._lessonTypeService
        .put<LessonType>(lessonType)
        .subscribe(result => {

          console.log("LessonType " + lessonType.id + " has been updated.");

          this._router.navigate(['/lessontypes']);
        }, error => console.error(error));
    }
    else {
      // ADD NEW mode
      this._lessonTypeService
        .post<LessonType>(lessonType)
        .subscribe(result => {

          console.log("LessonType " + result.id + " has been created.");

          this._router.navigate(['/lessontypes']);
        }, error => console.error(error));
    }
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }
  get lessonType(): LessonType {
    return this._lessonType;
  }

  set lessonType(value: LessonType) {
    this._lessonType = value;
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
