import {Inject, Injectable} from '@angular/core';
import {BaseService} from "../../base.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {DaysWeek} from "../interfaces/days-week";

@Injectable({
  providedIn: 'root'
})
export class DaysWeekService extends BaseService{

  constructor(
    http: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    super(http, baseUrl);
  }

  public getData<ApiResult>(pageIndex: number, pageSize: number,
                            sortColumn: string, sortOrder: string,
                            filterColumn: string, filterQuery: string): Observable<ApiResult> {
    const url = this.baseUrl + 'api/daysweeks';
    let params = new HttpParams()
      .set("pageIndex", pageIndex.toString())
      .set("pageSize", pageSize.toString())
      .set("sortColumn", sortColumn)
      .set("sortOrder", sortOrder);

    if (filterQuery) {
      params = params
        .set("filterColumn", filterColumn)
        .set("filterQuery", filterQuery);
    }

    return this.http.get<ApiResult>(url, { params });
  }

  public get<DaysWeek>(id: number): Observable<DaysWeek> {
    const url = this.baseUrl + "api/daysweeks/" + id;
    return this.http.get<DaysWeek>(url);
  }

  public post<DaysWeek>(item: DaysWeek): Observable<DaysWeek> {
    const url = this.baseUrl + "api/daysweeks/";
    return this.http.post<DaysWeek>(url, item);
  }

  public put<DaysWeek>(item): Observable<DaysWeek> {
    const url = this.baseUrl + "api/daysweeks/" + item.id;
    return this.http.put<DaysWeek>(url, item);
  }
}
