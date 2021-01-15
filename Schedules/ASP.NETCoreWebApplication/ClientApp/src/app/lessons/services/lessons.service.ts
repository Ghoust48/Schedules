import {Inject, Injectable} from "@angular/core";
import {BaseService} from "../../base.service";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LessonsService extends BaseService{

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super(http, baseUrl);
  }

  public getData<ApiResult>(pageIndex: number, pageSize: number,
                     sortColumn: string, sortOrder: string,
                     filterColumn: string, filterQuery: string): Observable<ApiResult> {
    const url = this.baseUrl + 'api/Lessons';
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

  public get<Lesson>(id: number): Observable<Lesson> {
    const url = this.baseUrl + "api/Lessons/" + id;
    return this.http.get<Lesson>(url);
  }

  public post<Lesson>(item: Lesson): Observable<Lesson> {
    const url = this.baseUrl + "api/Lessons/";
    return this.http.post<Lesson>(url, item);
  }

  public put<Lesson>(item): Observable<Lesson> {
    const url = this.baseUrl + "api/Lessons/" + item.id;
    return this.http.put<Lesson>(url, item);
  }

  //TODO: Сделать универсальный метод
  public getAuditories<ApiResult>(pageIndex: number, pageSize: number,
                                  sortColumn: string, sortOrder: string,
                                  filterColumn: string, filterQuery: string): Observable<ApiResult> {
    const url = this.baseUrl + 'api/auditories';
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

  public getTimetables<ApiResult>(pageIndex: number, pageSize: number,
                                  sortColumn: string, sortOrder: string,
                                  filterColumn: string, filterQuery: string): Observable<ApiResult> {
    const url = this.baseUrl + 'api/timetables';
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
}
