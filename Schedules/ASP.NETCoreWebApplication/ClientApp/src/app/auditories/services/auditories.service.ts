import {BaseService} from "../../base.service";
import {Observable} from "rxjs";
import {Inject, Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuditoriesService extends BaseService{

  constructor(
    http: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    super(http, baseUrl);
  }

  public getData<ApiResult>(pageIndex: number, pageSize: number,
                     sortColumn: string, sortOrder: string,
                     filterColumn: string, filterQuery: string): Observable<ApiResult> {
    const url = this.baseUrl + 'api/Auditories';
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

  public get<Auditory>(id: number): Observable<Auditory> {
    const url = this.baseUrl + "api/Auditories/" + id;
    return this.http.get<Auditory>(url);
  }

  public post<Auditory>(item: Auditory): Observable<Auditory> {
    const url = this.baseUrl + "api/Auditories/";
    return this.http.post<Auditory>(url, item);
  }

  public put<Auditory>(item): Observable<Auditory> {
    const url = this.baseUrl + "api/Auditories/" + item.id;
    return this.http.put<Auditory>(url, item);
  }

}
