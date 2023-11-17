import {$localize} from "@angular/localize/init";

type AppRouteType = {
  [p: string | number]: string | AppRouteType;
  main: string;
  name: string;
}

export const AppRoutes: AppRouteType = {
  name: $localize`Routes`,
  main: '/',
  auth: {
    main: '/auth',
    name: $localize`Authentication`,
    login: {
      main: '/login',
      name: $localize`Login`
    },
    register: {
      main: '/register',
      name: $localize`Register`
    },
    forgot_password: {
      main: '/forgot-password',
      name: $localize`Forgot Password`
    }
  },
  app: {
    main: '/app',
    name: $localize`App`,
    home: {
      main: '/home',
      name: $localize`Home`,
    },
    fees: {
      main: '/fees',
      name: $localize`Fees`,
    },
    user: {
      main: '/user',
      name: $localize`User`,
      profile: {
        main: '/profile',
        name: $localize`Profile`
      },
      issue: {
        main: '/issue',
        name: $localize`Submit Issue`
      }
    },
  },
  page: {
    name: $localize`Page`,
    main: '/page',
    '404': {
      main: '/404',
      name: $localize`404`
    },
    '500': {
      main: '/500',
      name: $localize`500`
    },
  },
};

export class AppRoute {
  static APP_MAIN = new AppRoute("app.home");
  static APP_MAIN_FEES = new AppRoute("app.fees");
  private _r: string = "";
  private _n: string = "";

  constructor(key: string) {
    this.resolve(key);
  }

  private _routes: AppRouteType[] = [];

  get routes() {
    return this._routes;
  }

  get path() {
    return this._r;
  }

  get name() {
    return this._n;
  }

  static path = (route: AppRoute, extra = '') => `${route.path}/${extra}`

  private resolve(k: string) {
    let route = AppRoutes;
    const segments = k.split('.');
    const mains: string[] = [];
    segments.forEach((s, index) => {
      let m = route[s];
      if (typeof m === 'string' || m == undefined) {
      } else {
        if (index == segments.length - 1) {
          this._n = m.name;
        }
        route = m;
        mains.push(route.main);
        this._routes.push(route);
      }
    });
    this._r = mains.join('');
  }
}
