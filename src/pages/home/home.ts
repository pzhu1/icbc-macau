
import {Component, OnInit} from '@angular/core';
import { NavController,ModalController } from 'ionic-angular';
import {Store, select} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import {CounterActions} from '../../actions/counter.actions';
import {AppState} from '../../app/app.status';
import {CounterService} from "../../service/counter.service";
import {Refund} from "./services/refund";
import {Binsarch} from "./services/binsarch";
import {Wrongtrx} from "./services/wrongtrx";
import {Custservice} from "./services/custservice";
import {Qrcode} from "./qrcode/qrcode";


const EventSource: any = window['EventSource'];


export interface User {
    id: number;
    name: string;
    phone: string;
    asset:number;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit{


    constructor(
        public navCtrl: NavController,
        private store: Store<AppState> ,
        private counterService:CounterService,
        public modalCtrl: ModalController
    ) {


    }



    ngOnInit() {}



    openRefundModal() {
        let modal = this.modalCtrl.create(Refund);
        modal.present();
    }

    openBinsarchModal() {
        let modal = this.modalCtrl.create(Binsarch);
        modal.present();
    }

    openWrongtrxModal() {
        let modal = this.modalCtrl.create(Wrongtrx);
        modal.present();
    }

    openCustserviceModal() {
        let modal = this.modalCtrl.create(Custservice);
        modal.present();
    }

    openQrcodeModal() {
        let modal = this.modalCtrl.create(Qrcode);
        modal.present();
    }

}
