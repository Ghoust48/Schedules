import {Component, OnInit} from "@angular/core";
import {BaseService} from "../../base.service";
import {BaseFormComponent} from "../../base.form.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Auditory} from "../interfaces/auditory";
import {ActivatedRoute, Router} from "@angular/router";
import {AuditoriesService} from "../services/auditories.service";

@Component({
  selector: 'app-auditory-edit',
  templateUrl: './auditory-edit.component.html',
  styleUrls: ['./auditory-edit.component.css']
})
export class AuditoryEditComponent extends BaseFormComponent implements OnInit{

  // the view title
  private _title: string;

  // the form model
  private _form: FormGroup;

  // the city object to edit or create
  private _auditory: Auditory;

  // the auditory object id, as fetched from the active route:
  // It's NULL when we're adding a new auditory,
  // and not NULL when we're editing an existing one.
  private _id?: number;

  constructor(
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _auditoriesService: AuditoriesService) {
    super();
  }

  public ngOnInit(): void {
    this.form = this._formBuilder.group({
      name: ['',
        Validators.required,
      ],
    });

    this.loadData();
  }


  public loadData() {
    // retrieve the ID from the 'id'
    this.id = +this._activatedRoute.snapshot.paramMap.get('id');

    if (this.id) {
      // EDIT MODE

      // fetch the country from the server
      this._auditoriesService.get<Auditory>(this.id)
        .subscribe(result => {
          this.auditory = result;
          this.title = "Edit - " + this.auditory.name;

          // update the form with the country value
          this.form.patchValue(this.auditory);
        }, error => console.error(error));
    }
    else {
      // ADD NEW MODE

      this.title = "Create a new Auditory";
    }
  }

  public onSubmit() {

    let auditory = (this.id) ? this.auditory : <Auditory>{};

    auditory.name = this.form.get("name").value;

    if (this.id) {
      // EDIT mode
      this._auditoriesService
        .put<Auditory>(auditory)
        .subscribe(result => {

          console.log("Auditory " + auditory.id + " has been updated.");

          // go back to cities view
          this._router.navigate(['/auditories']);
        }, error => console.error(error));
    }
    else {
      // ADD NEW mode
      this._auditoriesService
        .post<Auditory>(auditory)
        .subscribe(result => {

          console.log("Auditory " + result.id + " has been created.");

          // go back to cities view
          this._router.navigate(['/auditories']);
        }, error => console.error(error));
    }
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get auditory(): Auditory {
    return this._auditory;
  }

  set auditory(value: Auditory) {
    this._auditory = value;
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
