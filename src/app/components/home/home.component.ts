import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = `App works 456!`;

  constructor() {

    $(document).ready(function(){
      var mySlider = $("input.slider").slider();
    })

  }

  ngOnInit() {
  }

}
