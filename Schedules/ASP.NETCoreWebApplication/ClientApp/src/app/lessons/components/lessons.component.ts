import {Component, OnInit, ViewChild} from "@angular/core";
import {Lesson} from "../interfaces/lesson";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {LessonsService} from "../services/lessons.service";
import {ApiResult} from "../../base.service";

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit{

  private _displayedColumns: string[] = ['id', 'name', 'auditory'];

  private _lessons: MatTableDataSource<Lesson>;

  private _defaultPageIndex: number = 0;

  private _defaultPageSize: number = 10;

  private _defaultSortColumn: string = "name";

  private _defaultSortOrder: string = "asc";

  private _defaultFilterColumn: string = "name";

  private _filterQuery:string = null;

  @ViewChild(MatPaginator) private _paginator: MatPaginator;

  @ViewChild(MatSort) private _sort: MatSort;

  constructor(private _lessonsService: LessonsService) {
  }

  ngOnInit() {
    this.loadData(null);
  }

  public loadData(query: string = null) {
    const pageEvent = new PageEvent();
    pageEvent.pageIndex = this.defaultPageIndex;
    pageEvent.pageSize = this.defaultPageSize;

    if (query) {
      this.filterQuery = query;
    }

    this.getData(pageEvent);
  }

  public getData(pageEvent: PageEvent) {
    const sortColumn = (this.sort)
      ? this.sort.active
      : this.defaultSortColumn;

    const sortOrder = (this.sort)
      ? this.sort.direction
      : this.defaultSortOrder;

    const filterColumn = (this._filterQuery)
      ? this.defaultFilterColumn
      : null;

    const filterQuery = (this._filterQuery)
      ? this.filterQuery
      : null;

    this._lessonsService.getData<ApiResult<Lesson>>(
      pageEvent.pageIndex,
      pageEvent.pageSize,
      sortColumn,
      sortOrder,
      filterColumn,
      filterQuery)
      .subscribe(result => {
        this.paginator.length = result.totalCount;
        this.paginator.pageIndex = result.pageIndex;
        this.paginator.pageSize = result.pageSize;
        this.lessons = new MatTableDataSource<Lesson>(result.data);
      }, error => console.error(error));
  }

  get defaultSortOrder(): string {
    return this._defaultSortOrder;
  }

  set defaultSortOrder(value: string) {
    this._defaultSortOrder = value;
  }
  get defaultSortColumn(): string {
    return this._defaultSortColumn;
  }

  set defaultSortColumn(value: string) {
    this._defaultSortColumn = value;
  }
  get lessons(): MatTableDataSource<Lesson> {
    return this._lessons;
  }

  set lessons(value: MatTableDataSource<Lesson>) {
    this._lessons = value;
  }
  get displayedColumns(): string[] {
    return this._displayedColumns;
  }

  set displayedColumns(value: string[]) {
    this._displayedColumns = value;
  }

  get filterQuery(): string {
    return this._filterQuery;
  }

  set filterQuery(value: string) {
    this._filterQuery = value;
  }
  get defaultFilterColumn(): string {
    return this._defaultFilterColumn;
  }

  set defaultFilterColumn(value: string) {
    this._defaultFilterColumn = value;
  }
  get defaultPageSize(): number {
    return this._defaultPageSize;
  }

  set defaultPageSize(value: number) {
    this._defaultPageSize = value;
  }
  get defaultPageIndex(): number {
    return this._defaultPageIndex;
  }

  set defaultPageIndex(value: number) {
    this._defaultPageIndex = value;
  }

  get sort(): MatSort {
    return this._sort;
  }

  set sort(value: MatSort) {
    this._sort = value;
  }
  get paginator(): MatPaginator {
    return this._paginator;
  }

  set paginator(value: MatPaginator) {
    this._paginator = value;
  }
}
