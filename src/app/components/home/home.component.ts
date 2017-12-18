import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {AppComponent} from "../../app.component";
import {ApiServerService} from "../../providers/apiserver.service";
import {Constant} from "../../helpers/constant";
import {ElectronService} from "../../providers/electron.service";
import {applyChanges} from "@angular/cli/lib/ast-tools";

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  sizes = [4,6,8,10,12,14];
  slider = null;
  userOrder = {
    user_name: null,
    user_age: null,
    user_date: null,
    user_addr: null,
    comment: null,
    neck: null,
    bust: null,
    waist: null,
    hip: null,
    height: null,
    shoudler: null,
    real_shoudler: null,
    ext_shoudler: 0
  }

  constant = {
    min_neck: Constant.MIN_NECK,
    max_neck: Constant.MAX_NECK,
    min_shoudler: Constant.MIN_SHOULDER,
    max_shoudler: Constant.MAX_SHOULDER,
    min_bust: Constant.MIN_BUST,
    max_bust: Constant.MAX_BUST,
    min_waist: Constant.MIN_WAIST,
    max_waist: Constant.MAX_WAIST,
    min_hip: Constant.MIN_HIP,
    max_hip: Constant.MAX_HIP,
    min_height: Constant.MIN_HEIGHT,
    max_height: Constant.MAX_HEIGHT,
  }

  constructor(@Inject(AppComponent) private app: AppComponent, private electron: ElectronService){
    this.applySize(0)
    //app.showLoadingDialog();
    app.showNavMenu();
  }

  ngAfterViewInit(): void {
    let that = this;
    $(document).ready(function(){
      that.slider = $("input.slider").slider({
        precision: 1,
        step:0.1
      })
      ;$("#slide_ext_shoulder").slider({
      });
      $('.datepicker').datepicker({
        format: 'yyyy-m-d'
      });

    })

    $(document).on('slide', '#slide_neck', (slideEvt) => {
      that.userOrder.neck = slideEvt.value;
    })

    $(document).on('slide', '#slide_ext_shoulder', (slideEvt) => {
      that.userOrder.ext_shoudler = slideEvt.value;
      that.updateShoulder();
    })

    $(document).on('slide', '#slider_bust', (slideEvt) => {
      that.userOrder.bust = slideEvt.value;
    })

    $(document).on('slide', '#slider_waist', (slideEvt) => {
      that.userOrder.waist = slideEvt.value;
    })

    $(document).on('slide', '#slider_hip', (slideEvt) => {
      that.userOrder.hip = slideEvt.value;
    })

    $(document).on('slide', '#slider_height', (slideEvt) => {
      that.userOrder.height = slideEvt.value;
    })
  }

  ngOnInit() {


  }

  onChangeSize(event){
    this.applySize(event.target.selectedIndex)
  }

  applySize(indexSize) {
    this.userOrder.neck = Constant.NECK_STAND_SIZE_ARRAY[indexSize];
    this.userOrder.bust = Constant.BUST_STAND_SIZE_ARRAY[indexSize];
    this.userOrder.waist = Constant.WAIST_STAND_SIZE_ARRAY[indexSize];
    this.userOrder.hip = Constant.HIP_STAND_SIZE_ARRAY[indexSize];
    this.userOrder.height = Constant.HEIGHT_STAND_SIZE_ARRAY[indexSize];
    this.userOrder.real_shoudler = Constant.SHOULDER_STAND_SIZE_ARRAY[indexSize];
    this.updateShoulder();
    if(this.slider != null) {
      setTimeout(() => {
        $("input.slider").slider('destroy')
        $("input.slider").slider({
          precision: 1,
          step: 0.1
        });
      }, 100)
    }
  }

  updateShoulder(){
    let a = new this.electron.Big(this.userOrder.real_shoudler);
    this.userOrder.shoudler = a.add(this.userOrder.ext_shoudler)
  }
}
