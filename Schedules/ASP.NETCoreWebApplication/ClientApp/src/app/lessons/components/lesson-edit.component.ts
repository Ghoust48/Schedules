import {BaseFormComponent} from "../../base.form.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Lesson} from "../interfaces/lesson";
import {ActivatedRoute, Router} from "@angular/router";
import {LessonsService} from "../services/lessons.service";
import {Component, OnInit} from "@angular/core";

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

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router,
              private _lessonsService: LessonsService) {
    super();
  }

  public ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
    });

    this.loadData();
  }

  public loadData() {

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

  public onSubmit() {

    let lesson = (this.id) ? this.lesson : <Lesson>{};

    lesson.name = this.form.get("name").value;

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
}
