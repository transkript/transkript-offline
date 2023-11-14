import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BaseFilter} from "../../config/filter/base.filter";
import {AppEndpoint} from "../../config/route/app.endpoint";

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractHttpService<E = any, P = any> {
  private readonly _endpoint: string;
  private readonly _pathPrefixFactory?: () => string

  protected constructor(private _http: HttpClient, endpoint?: AppEndpoint, pathPrefixFactory?: () => string) {
    this._endpoint = endpoint?.url ?? '';
    this._pathPrefixFactory = pathPrefixFactory;
  }


  protected get url() {
    const pathPrefix = this._pathPrefixFactory == undefined ? '' : this._pathPrefixFactory();
    return `${this._endpoint}${pathPrefix}`
  }

  urlWithPath = (path: string) => `${this.url}${path}`

  list = <PAYLOAD = P> (filter: BaseFilter<any>, path: string = '/list'): Observable<PAYLOAD[]> => this.listT(filter, {path: path})

  listDto = <ENTITY = E> (filter: BaseFilter<any>): Observable<ENTITY[]> => this.listT(filter, {path: '/list-dto'})

  listT = <MODEL>(filter: BaseFilter<any>, options?: HttpFilterOptions): Observable<MODEL> => {
    if (!options) options = {}
    if (!options.path) options.path = ''
    if (!options.method) options.method = 'params'

    let params = {}
    if (options.method == "params") {
      params = filter.parameters
    } else if (options.method == "object") {
      params = filter.obj
    }

    return this._http.get<MODEL>(this.urlWithPath(options.path), {params: params});
  }
}

interface HttpFilterOptions {
  path?: string,
  method?: 'params' | 'object'
}
