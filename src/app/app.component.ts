import {Component, ElementRef, ViewChild} from '@angular/core';
import { ElectronService } from './providers/electron.service';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  selectedMenu = 0;
  @ViewChild('loadingDialog') loadingDialog:ElementRef;
  @ViewChild('navMenu') navMenu:ElementRef;

  constructor(public electronService: ElectronService) {

    if (electronService.isElectron()) {
      console.log('Mode electron');
      // Check if electron is correctly injected (see externals in webpack.config.js)
      console.log('c', electronService.ipcRenderer);
      // Check if nodeJs childProcess is correctly injected (see externals in webpack.config.js)
      console.log('c', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }

  goToManequinControl(){
    this.selectedMenu = 0;
  }

  goToCustomerLog(){
    this.selectedMenu = 1;
  }

  public showLoadingDialog(){
    $(this.loadingDialog.nativeElement).show();
  }

  public hideLoadingDialog(){
    $(this.loadingDialog.nativeElement).hide();
  }

  public showNavMenu(){
    $(this.navMenu.nativeElement).show();
  }

  public hideNavMenu(){
    $(this.navMenu.nativeElement).hide();
  }
}
