import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {WeeksType} from "../../weekstype/interfaces/weeksType";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {WeekstypeService} from "../../weekstype/services/weekstype.service";
import {ApiResult} from "../../base.service";
import {DaysWeek} from "../interfaces/days-week";
import {DaysWeekService} from "../services/days-week.service";

@Component({
  selector: 'app-days-week',
  templateUrl: './days-week.component.html',
  styleUrls: ['./days-week.component.css']
})
export class DaysWeekComponent implements OnInit {

  private _displayedColumns: string[] = ['id', 'day'];
  private _daysWeek: MatTableDataSource<DaysWeek>;

  private _defaultPageIndex: number = 0;
  private _defaultPageSize: number = 10;
  private _defaultSortColumn: string = "day";
  private _defaultSortOrder: string = "asc";

  private _defaultFilterColumn: string = "day";
  private _filterQuery: string = null;

  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  @ViewChild(MatSort) private _sort: MatSort;

  constructor(private _daysWeekService: DaysWeekService) { }

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

    this._daysWeekService.getData<ApiResult<DaysWeek>>(
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
        this.daysWeek = new MatTableDataSource<DaysWeek>(result.data);
      }, error => console.error(error));
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
  get daysWeek(): MatTableDataSource<DaysWeek> {
    return this._daysWeek;
  }

  set daysWeek(value: MatTableDataSource<DaysWeek>) {
    this._daysWeek = value;
  }
  get displayedColumns(): string[] {
    return this._displayedColumns;
  }

  set displayedColumns(value: string[]) {
    this._displayedColumns = value;
  }
}
