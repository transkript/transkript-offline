import {environment} from "../../../environments/environment";

export const AppEndpoints: AppEndpointType = {
  path: environment.apiUrl,
  auth: {
    path: '/auth',
    role: {
      path: '/policy-role',
    },
    login: {
      path: '/login'
    },
    check: {
      path: '/check'
    },
    check_verify: {
      path: '/check-verify'
    },
  },
  class_level: {
    path: '/class-level'
  },
  importer: {
    path: '/importer',
    excel: {
      path: '/excel',
      template: {
        path: '/template',
      },
    },
  },
  launch: {
    path: '/launch'
  },
  payment: {
    path: '/payment',
    tuition: {
      path: '/tuition'
    },
    trial: {
      path: '/trial'
    },
  },
  section: {
    path: '/section'
  },
  school: {
    path: '/school',
    staff: {
      path: '/school-staff'
    }
  },
  student: {
    path: '/student'
  },
  student_application: {
    path: '/student-application'
  },
  student_application_trial: {
    path: '/student-application-trial'
  },
  subject: {
    path: '/subject'
  },
  subject_registration: {
    path: '/subject-registration'
  },
  user: {
    path: '/user',
    account: {
      path: '/account'
    },
  },
}


type AppEndpointType = {
  [c: string]: string | AppEndpointType
  path: string,
}
export class AppEndpoint {

  private _base: string = "";
  private _path: string = "";
  private readonly _url: string
  static AUTH_LOGIN = new AppEndpoint("auth.login");
  static AUTH_LAUNCH = new AppEndpoint("launch");
  static STUDENT_APPLICATION_TRIAL = new AppEndpoint("student_application_trial");
  static USER = new AppEndpoint("user");

  constructor(key: string) {
    this._url = this.constructUrl(key);
    this.validate();
  }

  get url() {
    return this._url;
  }

  private validate = () => {
    if (this._path.includes("//")) {
      throw new Error(`Invalid endpoint path: ${this._path}`);
    }
  }

  private constructUrl = (key: string) => {
    let endpoint = AppEndpoints;
    this._base = endpoint.path
    const segments = key.split('.');
    const mains: string[] = [];
    segments.forEach(s => {
      const n = endpoint[s];
      if (typeof n === 'string' || n == undefined) {
      } else {
        endpoint = n;
      }
      mains.push(endpoint.path);
    });
    this._path = mains.join('');
    return `${this._base}${this._path}`;
  }
}
