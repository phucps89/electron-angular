import {MetaResponse} from "./meta.response";

export interface LoginResponse extends MetaResponse<LoginResponse> {
  token: string;
}
