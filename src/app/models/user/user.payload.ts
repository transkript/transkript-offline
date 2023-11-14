import {UserModel} from "./user.model";
import {UserAccountModel} from "./user-account.model";

export interface UserPayload {
  user: UserModel,
  account?: UserAccountModel,
  selected?: boolean,
}
