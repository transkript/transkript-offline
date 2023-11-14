import {HttpParams} from "@angular/common/http";
import {Id, Pair} from "../../models/base/base.types";
import {PaginationPayload} from "../../models/base/pagination.payload";
import {OrganisationId, SchoolId} from "../../services/http/local-storage.service";

export interface BaseFilterParams {
  id?: Id
}

export interface OrganisationBaseFilterParams extends BaseFilterParams {
  organisationId?: Id
}

export interface SchoolBaseFilterParams extends OrganisationBaseFilterParams {
  schoolId?: Id
}
export abstract class BaseFilter<T> extends HttpParams {
  private readonly _parameters: { [p: string]: any } = {};

  protected constructor(public p: T) {
    super();
    this.construct(p);
  }

  set param(pair: Pair) {
    this.updateParam(pair)
  }

  get parameters() {
    return this._parameters;
  }

  get obj(): { [p: string]: any } {
    const filteredParameters: { [p: string]: any } = {};
    Object.entries(this.parameters).forEach(([key, value]) => {
      if (value !== undefined && value != 'undefined') {
        filteredParameters[key] = value;
      }
    });
    return {
      'filter': JSON.stringify(filteredParameters)
    }
  }

  update(o: any | { [p: string]: any }) {
    if (typeof o == 'object') {
      Object.entries(o).forEach(([k, v]) => {
        this.param = {key: k, value: v};
      });
    }
  }

  addPagination = (pagination: PaginationPayload) => {
    this.update({pagination: undefined})
    this.update({pagination: pagination})
  }

  private construct(obj: any) {
    if (obj) {
      Object.entries(obj)
        .filter(([_, value]) => value !== undefined)
        .forEach(([key, value]) => {
          this.updateParam({key: key, value: value});
        });
    }
  }

  private updateParam(pair: Pair) {
    if (pair.value) {
      (this.p as any)[pair.key] = pair.value;
      this.set(pair.key, pair.value);
      this.append(pair.key, pair.value);
      this._parameters[pair.key] = pair.value;
    }
  }
}

export class SchoolBaseFilter<T = SchoolBaseFilterParams> extends BaseFilter<T> {
  constructor(public params: SchoolBaseFilterParams = {}, fill?: boolean) {
    if (fill) {
      params.schoolId = SchoolId()
      params.organisationId = OrganisationId()
    }
    if (params.schoolId && (params.schoolId as number) < 1) {
      params.schoolId = undefined;
    }
    if (params.organisationId && (params.organisationId as number) < 1) {
      params.organisationId = undefined;
    }
    super(<any>params);
  }

  static simple(obj?: SchoolBaseFilterParams) {
    const params = <SchoolBaseFilterParams>{
      schoolId: SchoolId(),
      organisationId: OrganisationId()
    }
    const filter = new SchoolBaseFilter(params, true);
    if (obj) {
      filter.update(obj);
    }
    return filter;
  }
}
