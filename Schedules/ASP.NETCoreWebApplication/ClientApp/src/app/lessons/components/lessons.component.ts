import {Component, Input, OnInit, ViewChild} from "@angular/core";
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

  private _displayedColumns: string[] = ['daysWeek', 'fullTime', 'name', 'lessonType'];

  private _spanningColumns = ['daysWeek', 'fullTime'];

  private _spans = [];

  private _lessons: MatTableDataSource<Lesson>;

  private _defaultPageIndex: number = 0;

  private _defaultPageSize: number = 10;

  private _defaultSortColumn: string = "daysWeek";

  private _defaultSortOrder: string = "asc";

  private _defaultFilterColumn: string = "name";

  private _filterQuery: string = null;

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

    if (query !== '') {
      this.filterQuery = query;
    }
    else {
      this.filterQuery = null;
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

    const filterColumn = (this.filterQuery)
      ? this.defaultFilterColumn
      : null;

    let filterQuery = (this.filterQuery)
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
        this.cacheSpan('daysWeek', d => d.daysWeek);
        this.cacheSpan('fullTime', d => d.daysWeek + d.fullTime);
      }, error => console.error(error));
  }

  public cacheSpan(key, accessor) {

    for (let i = 0; i < this.lessons.data.length;) {
      let currentValue = accessor(this.lessons.data[i]);
      let count = 1;

      // Iterate through the remaining rows to see how many match
      // the current value as retrieved through the accessor.
      for (let j = i + 1; j < this.lessons.data.length; j++) {
        if (currentValue != accessor(this.lessons.data[j])) {
          break;
        }
        count++;
      }

      if (!this.spans[i]) {
        this.spans[i] = {};
      }

      // Store the number of similar values that were found (the span)
      // and skip i to the next unique row.
      this.spans[i][key] = count;
      i += count;
    }
  }

  public getRowSpan(col, index) {
    return this.spans[index] && this.spans[index][col];
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
  get spans(): any[] {
    return this._spans;
  }

  set spans(value: any[]) {
    this._spans = value;
  }
  get spanningColumns(): string[] {
    return this._spanningColumns;
  }

  set spanningColumns(value: string[]) {
    this._spanningColumns = value;
  }

}
