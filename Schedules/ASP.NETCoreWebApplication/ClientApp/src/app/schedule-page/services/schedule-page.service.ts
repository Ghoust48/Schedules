import {Inject, Injectable} from '@angular/core';
import {ApiResult, BaseService} from "../../base.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SchedulePageService extends BaseService{

  constructor(
    http: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    super(http, baseUrl);
  }

  public getData<ApiResult>(pageIndex: number, pageSize: number,
                            sortColumn: string, sortOrder: string,
                            filterColumn: string, filterQuery: string): Observable<ApiResult> {
    const url = this.baseUrl + 'api/schedules';
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

  public getChildrenByUrl<ApiResult>(childUrl: string, pageIndex: number, pageSize: number,
                                     sortColumn: string, sortOrder: string,
                                     filterColumn: string, filterQuery: string)
  {
    const url = this.baseUrl + `api/${childUrl}`;

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

  public get<Schedule>(id: number): Observable<Schedule> {
    const url = this.baseUrl + "api/schedules/" + id;
    return this.http.get<Schedule>(url);
  }

  public post<Schedule>(item: Schedule): Observable<Schedule> {
    const url = this.baseUrl + "api/schedules/";
    return this.http.post<Schedule>(url, item);
  }

  public put<Schedule>(item): Observable<Schedule> {
    const url = this.baseUrl + "api/schedules/" + item.id;
    return this.http.put<Schedule>(url, item);
  }
}
