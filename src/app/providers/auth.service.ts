import {Injectable} from "@angular/core";
import {ApiServerService} from "./apiserver.service";
import {LoginRequest} from "../requests/login.request";

@Injectable()
export class AuthService {

  private _inAuth = false;
  private _token = null;

  constructor(private api: ApiServerService){

  }

  isLoggedIn(){
    return this._inAuth;
  }

  login(loginData: LoginRequest){
    let loginApi = this.api.login(loginData);
    let that = this;
    loginApi.$observable.subscribe((res) => {
      that._inAuth = true;
      that._token = res.results.token;
    }, () => {})
    return loginApi;
  }
}
