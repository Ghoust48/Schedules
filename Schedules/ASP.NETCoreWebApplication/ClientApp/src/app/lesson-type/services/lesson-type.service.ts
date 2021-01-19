import {Inject, Injectable} from '@angular/core';
import {BaseService} from "../../base.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {LessonType} from "../interfaces/lesson-type";

@Injectable({
  providedIn: 'root'
})
export class LessonTypeService extends BaseService{

  constructor(
    http: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    super(http, baseUrl);
  }

  public getData<ApiResult>(pageIndex: number, pageSize: number,
                            sortColumn: string, sortOrder: string,
                            filterColumn: string, filterQuery: string): Observable<ApiResult> {
    const url = this.baseUrl + 'api/lessontypes';
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

  public get<LessonType>(id: number): Observable<LessonType> {
    const url = this.baseUrl + "api/lessontypes/" + id;
    return this.http.get<LessonType>(url);
  }

  public post<LessonType>(item: LessonType): Observable<LessonType> {
    const url = this.baseUrl + "api/lessontypes/";
    return this.http.post<LessonType>(url, item);
  }

  public put<LessonType>(item): Observable<LessonType> {
    const url = this.baseUrl + "api/lessontypes/" + item.id;
    return this.http.put<LessonType>(url, item);
  }
}
