import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ApiResult} from "../../base.service";
import {Schedule} from "../interfaces/schedule";
import {SchedulePageService} from "../services/schedule-page.service";

@Component({
  selector: 'app-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.css']
})
export class SchedulePageComponent implements OnInit {

  private _displayedColumns: string[] = ['daysWeek', 'fullTime', 'lesson', 'lessonType'];
  private _spanningColumns = ['daysWeek', 'fullTime'];

  private _spans = [];

  private _schedule: MatTableDataSource<Schedule>;

  private _defaultPageIndex: number = 0;
  private _defaultPageSize: number = 10;
  private _defaultSortColumn: string = "daysWeek";
  private _defaultSortOrder: string = "asc";

  private _defaultFilterColumn: string = "daysWeek";
  private _filterQuery: string = null;

  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  @ViewChild(MatSort) private _sort: MatSort;

  constructor(private _scheduleService: SchedulePageService) { }

  ngOnInit(): void {
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

  public getData(event: PageEvent) {

    const sortColumn = (this.sort)
      ? this.sort.active
      : this.defaultSortColumn;

    const sortOrder = (this.sort)
      ? this.sort.direction
      : this.defaultSortOrder;

    const filterColumn = (this.filterQuery)
      ? this.defaultFilterColumn
      : null;

    const filterQuery = (this.filterQuery)
      ? this.filterQuery
      : null;

    this._scheduleService.getData<ApiResult<Schedule>>(
      event.pageIndex,
      event.pageSize,
      sortColumn,
      sortOrder,
      filterColumn,
      filterQuery)
      .subscribe(result => {
        this.paginator.length = result.totalCount;
        this.paginator.pageIndex = result.pageIndex;
        this.paginator.pageSize = result.pageSize;
        this.schedule = new MatTableDataSource<Schedule>(result.data);
        this.cacheSpan('daysWeek', d => d.daysWeek);
        this.cacheSpan('fullTime', d => d.daysWeek + d.fullTime);
      }, error => console.error(error));
  }

  public cacheSpan(key, accessor) {

    for (let i = 0; i < this.schedule.data.length;) {
      let currentValue = accessor(this.schedule.data[i]);
      let count = 1;

      // Iterate through the remaining rows to see how many match
      // the current value as retrieved through the accessor.
      for (let j = i + 1; j < this.schedule.data.length; j++) {
        if (currentValue != accessor(this.schedule.data[j])) {
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
  get schedule(): MatTableDataSource<Schedule> {
    return this._schedule;
  }

  set schedule(value: MatTableDataSource<Schedule>) {
    this._schedule = value;
  }
  get displayedColumns(): string[] {
    return this._displayedColumns;
  }

  set displayedColumns(value: string[]) {
    this._displayedColumns = value;
  }

  get spanningColumns(): string[] {
    return this._spanningColumns;
  }

  set spanningColumns(value: string[]) {
    this._spanningColumns = value;
  }
  get spans(): any[] {
    return this._spans;
  }

  set spans(value: any[]) {
    this._spans = value;
  }


}
