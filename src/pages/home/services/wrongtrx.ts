
import {Component, OnInit} from '@angular/core';
import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';



@Component({
  selector: 'page-home',
  templateUrl: 'wrongtrx.html',
})
export class Wrongtrx implements OnInit{


    constructor(
        public platform: Platform,
        public params: NavParams,
        public viewCtrl: ViewController
    ) {
    }


    ngOnInit() {}

    dismiss() {
        this.viewCtrl.dismiss();
    }

}
