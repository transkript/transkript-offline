import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../../shared.module";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../services/http/auth.service";
import {LoginRequestModel} from "../../../../models/auth/login.model";
import {LocalStorageService} from "../../../../services/http/local-storage.service";
import {UserService} from "../../../../services/http/user.service";
import {JsonRepoService} from "../../../../services/repo/json-repo.service";
import {Router} from "@angular/router";
import {AppRoute} from "../../../../config/route/app.route";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private localStorage: LocalStorageService,
    private userService: UserService,
    private jsonRepo: JsonRepoService,
    private router: Router,
  ) {
  }


  loginAction() {
    const request = <LoginRequestModel> this.loginForm.value;
    this.authService.login(request).subscribe(res => {
      this.localStorage.set("access_token", res.token);
      this.loadApplication();
    });
  }

  private loadApplication = () => this.userService.getByPrincipal().subscribe(user => {
    this.jsonRepo.update("currentUser", user).then();
    const targetRoute = AppRoute.APP_MAIN.path;
    this.router.navigate([targetRoute]).then();
  })
}
