import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {BaseService} from "../../base.service";
import {Timetable} from "../../timetables/interfaces/timetable";

@Injectable({
  providedIn: 'root'
})
export class WeekstypeService extends BaseService{

  constructor(
    http: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    super(http, baseUrl);
  }

  public getData<ApiResult>(pageIndex: number, pageSize: number,
                            sortColumn: string, sortOrder: string,
                            filterColumn: string, filterQuery: string): Observable<ApiResult> {
    const url = this.baseUrl + 'api/WeeksTypes';
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

  public get<WeeksType>(id: number): Observable<WeeksType> {
    const url = this.baseUrl + "api/WeeksTypes/" + id;
    return this.http.get<WeeksType>(url);
  }

  public post<WeeksType>(item: WeeksType): Observable<WeeksType> {
    const url = this.baseUrl + "api/WeeksTypes/";
    return this.http.post<WeeksType>(url, item);
  }

  public put<WeeksType>(item): Observable<WeeksType> {
    const url = this.baseUrl + "api/WeeksTypes/" + item.id;
    return this.http.put<WeeksType>(url, item);
  }
}
