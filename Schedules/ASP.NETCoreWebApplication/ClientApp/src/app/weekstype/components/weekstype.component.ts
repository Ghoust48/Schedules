import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {WeeksType} from "../interfaces/weeksType";
import {WeekstypeService} from "../services/weekstype.service";
import {ApiResult} from "../../base.service";

@Component({
  selector: 'app-weekstype',
  templateUrl: './weekstype.component.html',
  styleUrls: ['./weekstype.component.css']
})
export class WeekstypeComponent implements OnInit {

  private _displayedColumns: string[] = ['id', 'type'];
  private _weeksType: MatTableDataSource<WeeksType>;

  private _defaultPageIndex: number = 0;
  private _defaultPageSize: number = 10;
  private _defaultSortColumn: string = "type";
  private _defaultSortOrder: string = "asc";

  private _defaultFilterColumn: string = "type";
  private _filterQuery: string = null;

  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  @ViewChild(MatSort) private _sort: MatSort;

  constructor(private _weekstypeService: WeekstypeService) { }

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

    this._weekstypeService.getData<ApiResult<WeeksType>>(
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
        this.weeksType = new MatTableDataSource<WeeksType>(result.data);
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
  get weeksType(): MatTableDataSource<WeeksType> {
    return this._weeksType;
  }

  set weeksType(value: MatTableDataSource<WeeksType>) {
    this._weeksType = value;
  }
  get displayedColumns(): string[] {
    return this._displayedColumns;
  }

  set displayedColumns(value: string[]) {
    this._displayedColumns = value;
  }
}
