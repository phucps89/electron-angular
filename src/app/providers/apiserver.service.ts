import {Injectable} from '@angular/core';
import {
  Resource, ResourceParams, ResourceAction, ResourceMethod, ResourceMethodPromise,
  ResourceMethodObservable
} from 'ngx-resource';
import {RequestMethod} from '@angular/http';
import {environment} from "environments";
import {LoginRequest} from "../requests/login.request";
import {LoginResponse} from "../responses/login.response";

interface ServerInfo {
  region?: string;
  country_name?: string;
  ip?: string;
}

@Injectable()
@ResourceParams({
  url: environment.server
})
export class ApiServerService extends Resource {

  @ResourceAction({
    method: RequestMethod.Post,
    path:'auth/login'
  })
  login: ResourceMethod<LoginRequest, LoginResponse>;

}
