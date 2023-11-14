import {UserPayload} from "../../../../models/user/user.payload";
import {JsonRepo, JsonRepoService} from "../../../../services/repo/json-repo.service";
import {inject, Injectable} from "@angular/core";

@Injectable({providedIn: "root"})
export abstract class AbstractComponent {
  protected currentUser?: UserPayload;
  protected jsonRepoService: JsonRepoService;
  protected jsonRepoData?: JsonRepo;

  protected constructor() {
    this.jsonRepoService= inject(JsonRepoService);
    this.jsonRepoService.retrieve<UserPayload>("currentUser").then(res => {
      this.currentUser = res;
    });
    this.loadData();
  }

  get currentUsername() {
    return this.currentUser?.account?.name?? 'User';
  }
  get currentSchool() {
    return this.jsonRepoData?.currentSchool;
  }

  get dbSchools() {
    return this.jsonRepoData?.currentUser?.account?.schools ?? [];
  }

  private loadData() {
    this.jsonRepoService.data().then(res => {
      this.jsonRepoData = res;
    });
  }

  jsonRepoDataAsync= async () => {
    return this.jsonRepoService.data();
  }
}
