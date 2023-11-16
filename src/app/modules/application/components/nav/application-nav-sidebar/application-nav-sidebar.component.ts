import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {picon} from "../../../../../config/util/general.util";
import {AppRoute} from "../../../../../config/route/app.route";
import {AbstractComponent} from "../../../../library/components/general/abstract.component";
import {SchoolModel} from "../../../../../models/school/school.model";
import {DropdownChangeEvent} from "primeng/dropdown";
import {AuthService} from "../../../../../services/http/auth.service";
import {LaunchFilter} from "../../../../../config/filter/launch.filter";

type SidebarNavItem = {
  label: string,
  icon: string,
  route: AppRoute
}
@Component({
  selector: 'app-application-nav-sidebar',
  templateUrl: './application-nav-sidebar.component.html',
  styleUrl: './application-nav-sidebar.component.scss'
})
export class ApplicationNavSidebarComponent extends AbstractComponent implements OnInit {
  navItems: SidebarNavItem[] = [
    { label: $localize`Fees`, icon: picon('money-bill'), route: AppRoute.APP_MAIN_FEES },
  ]
  selectedSchool?: SchoolModel;

  constructor(
    private authService: AuthService,
  ) {
    super();
  }

  ngOnInit() {
    if (this.dbSchools.length > 0) {
      this.selectedSchoolChange(this.dbSchools[0]);
    }
  }

  selectedSchoolChange(selectedSchool: SchoolModel) {
    this.jsonRepoService.update("currentSchool", selectedSchool).then(() => {
      const launchFilter = new LaunchFilter({ schoolId: selectedSchool.id });
      this.authService.launch(launchFilter).subscribe( res => {
        const academicYears = res.schoolData?.academicYears ?? [];
        this.jsonRepoService.update("launchData", res).then();
        this.jsonRepoService.update("academicYears", academicYears).then();
      });
    });
  }
}
