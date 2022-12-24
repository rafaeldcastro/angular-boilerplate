import { Injector } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, map } from "rxjs";

/**MODELS */
import { environment as env } from "@env";
import { BaseResourceModel } from "@core/models/base/base-resource.model";
import { PaginationModel } from "@core/models/pagination/pagination.model";
import { PaginatedResourceModel } from "@core/models/pagination/paginated-resource.model";

export abstract class BaseResourceService<T extends BaseResourceModel> {
  protected http: HttpClient;
  private baseUrl: string;

  constructor(
    protected endPointAPI: string,
    protected injector: Injector,
    protected resourceFactory: (jsonData: any) => T
  ) {
    this.http = injector.get(HttpClient);
    this.baseUrl = `${env.URL_API}/${endPointAPI}`;
  }

  getAll(pagination?: any): Observable<T | PaginatedResourceModel> {
    const url: string = this.baseUrl;
    const queryParams = this.getRequestParams(pagination);

    return this.http
      .get(url, { params: queryParams })
      .pipe(map(this.dataToResources.bind(this)));
  }

  getById(resourceId: number | string): Observable<T> {
    const url: string = this.baseUrl;

    return this.http
      .get(`${url}/${resourceId}`)
      .pipe(map(this.dataToResource.bind(this)));
  }

  createOrUpdate(resource: T): Observable<T | any> {
    if (resource.id) {
      return this.update(resource);
    }
    return this.create(resource);
  }

  delete(resourceId: number | string): Observable<any> {
    const url: string = this.baseUrl;

    return this.http.delete(`${url}/${resourceId}`);
  }

  create(resource: T): Observable<T | any> {
    const url: string = this.baseUrl;

    return this.http
      .post(url, resource)
      .pipe(map(this.dataToResource.bind(this)));
  }

  update(resource: T): Observable<T | any> {
    const url: string = this.baseUrl;

    return this.http
      .patch(`${url}/${resource.id}`, resource)
      .pipe(map(this.dataToResource.bind(this)));
  }

  /**
   * Attention on HttpParams wich is by default an immutable object.
   * therefore its "append" function recreates a new Object each calling
   * @param pagination
   * @returns
   */
  private getRequestParams(pagination: PaginationModel): HttpParams {
    if (!pagination) {
      return new HttpParams();
    }
    const filters: { [key: string]: number | string } = {};

    pagination.requestFilters?.forEach((f) => {
      filters[f.filterId] = f.filterValue;
    });

    return new HttpParams({ fromObject: filters });
  }

  private dataToResources(jsonData: any): PaginatedResourceModel {
    const resp: any = jsonData.body;
    const datalist: T[] = resp.data?.rows;
    const paginatedResource = new PaginatedResourceModel({
      datalist: [],
      pagination: new PaginationModel(resp.data),
    });

    delete paginatedResource.pagination?.rows;

    datalist.forEach((d) => {
      paginatedResource.datalist?.push(this.resourceFactory(d));
    });

    return paginatedResource;
  }

  private dataToResource(jsonData: any): T {
    return this.resourceFactory(jsonData);
  }
}
