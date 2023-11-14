import {BaseFilter} from "./base.filter";
import {Id} from "../../models/base/base.types";

export interface LaunchFilterParams {
  schoolId?: Id
}

export class LaunchFilter extends BaseFilter<LaunchFilterParams> {
  constructor(
    public params: LaunchFilterParams
  ) {
    super(params);
  }
}
