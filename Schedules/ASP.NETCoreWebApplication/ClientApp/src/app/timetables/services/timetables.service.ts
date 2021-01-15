import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BaseService} from "../../base.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TimetablesService extends BaseService {

  constructor(
    http: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    super(http, baseUrl);
  }

  public getData<ApiResult>(pageIndex: number, pageSize: number,
                            sortColumn: string, sortOrder: string,
                            filterColumn: string, filterQuery: string): Observable<ApiResult> {
    const url = this.baseUrl + 'api/Timetables';
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

  public get<Timetable>(id: number): Observable<Timetable> {
    const url = this.baseUrl + "api/Timetables/" + id;
    return this.http.get<Timetable>(url);
  }

  public post<Timetable>(item: Timetable): Observable<Timetable> {
    const url = this.baseUrl + "api/Timetables/";
    return this.http.post<Timetable>(url, item);
  }

  public put<Timetable>(item): Observable<Timetable> {
    const url = this.baseUrl + "api/Timetables/" + item.id;
    return this.http.put<Timetable>(url, item);
  }
}
