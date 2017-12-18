import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {AppComponent} from "../../app.component";
import {ApiServerService} from "../../providers/apiserver.service";
import {AuthService} from "../../providers/auth.service";
import {Router} from "@angular/router";
import {LoginRequest} from "../../requests/login.request";
import {LoginResponse} from "../../responses/login.response";
import {ErrorResponse} from "../../responses/error.response";

declare var $: any;

@Component({
  selector: 'login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginData:LoginRequest = {
    username: 'admin',
    password: '123456'
  };

  errorText = null;

  constructor(@Inject(AppComponent) private app: AppComponent, private auth: AuthService,
    private router: Router
  ){
    app.hideNavMenu()

  }

  ngAfterViewInit(): void {

  }

  ngOnInit() {
  }

  login() {
    let app = this.app;
    let that = this;
    app.showLoadingDialog();
    this.auth.login(this.loginData).$observable.subscribe((res: LoginResponse) => {

      this.router.navigate([''])
      app.hideLoadingDialog();
    }, (error:Response) => {
      let dataError = error.json() as any as ErrorResponse;
      that.errorText = dataError.message;
      app.hideLoadingDialog();
    })
  }

}
