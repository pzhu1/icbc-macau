
import {Component, OnInit} from '@angular/core';
import { NavController,ModalController } from 'ionic-angular';
import {Store, select} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import {CounterActions} from '../../actions/counter.actions';
import {AppState} from '../../app/app.status';
import {CounterService} from "../../service/counter.service";
import {Refund} from "./services/refund";
import {Setup} from "./services/setup";
import {Binsarch} from "./services/binsarch";
import {Wrongtrx} from "./services/wrongtrx";
import {Custservice} from "./services/custservice";
import {Qrcode} from "./qrcode/qrcode";
import { JPush } from "@jiguang-ionic/jpush";
import { Device } from "@ionic-native/device";

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
        public jpush: JPush,
        device: Device,
        public modalCtrl: ModalController
    ) {
        this.devicePlatform = device.platform;

        document.addEventListener(
            "jpush.receiveNotification",
            (event: any) => {
                var content;
                if (this.devicePlatform == "Android") {
                    content = event.alert;
                } else {
                    content = event.aps.alert;
                }
                alert("Receive notification: " + JSON.stringify(event));
            },
            false
        );

        document.addEventListener(
            "jpush.openNotification",
            (event: any) => {
                var content;
                if (this.devicePlatform == "Android") {
                    content = event.alert;
                } else {
                    // iOS
                    if (event.aps == undefined) {
                        // 本地通知
                        content = event.content;
                    } else {
                        // APNS
                        content = event.aps.alert;
                    }
                }
                alert("open notification: " + JSON.stringify(event));
            },
            false
        );

        document.addEventListener(
            "jpush.receiveLocalNotification",
            (event: any) => {
                // iOS(*,9) Only , iOS(10,*) 将在 jpush.openNotification 和 jpush.receiveNotification 中触发。
                var content;
                if (this.devicePlatform == "Android") {
                } else {
                    content = event.content;
                }
                alert("receive local notification: " + JSON.stringify(event));
            },
            false
        );



    }

    public registrationId: string;

    devicePlatform: string;
    sequence: number = 0;

    tagResultHandler = function(result) {
        var sequence: number = result.sequence;
        var tags: Array<string> = result.tags == null ? [] : result.tags;
        alert(
            "Success!" + "\nSequence: " + sequence + "\nTags: " + tags.toString()
        );
    };

    aliasResultHandler = function(result) {
        var sequence: number = result.sequence;
        var alias: string = result.alias;
        alert("Success!" + "\nSequence: " + sequence + "\nAlias: " + alias);
    };

    errorHandler = function(err) {
        var sequence: number = err.sequence;
        var code = err.code;
        alert("Error!" + "\nSequence: " + sequence + "\nCode: " + code);
    };


    getRegistrationID() {
        this.jpush.getRegistrationID().then(rId => {
            this.registrationId = rId;
        });
    }

    setTags() {
        this.jpush
            .setTags({ sequence: this.sequence++, tags: ["Tag1", "Tag2"] })
            .then(this.tagResultHandler)
            .catch(this.errorHandler);
    }

    addTags() {
        this.jpush
            .addTags({ sequence: this.sequence++, tags: ["Tag3", "Tag4"] })
            .then(this.tagResultHandler)
            .catch(this.errorHandler);
    }

    checkTagBindState() {
        this.jpush
            .checkTagBindState({ sequence: this.sequence++, tag: "Tag1" })
            .then(result => {
                var sequence = result.sequence;
                var tag = result.tag;
                var isBind = result.isBind;
                alert(
                    "Sequence: " + sequence + "\nTag: " + tag + "\nIsBind: " + isBind
                );
            })
            .catch(this.errorHandler);
    }

    deleteTags() {
        this.jpush
            .deleteTags({ sequence: this.sequence++, tags: ["Tag4"] })
            .then(this.tagResultHandler)
            .catch(this.errorHandler);
    }

    getAllTags() {
        this.jpush
            .getAllTags({ sequence: this.sequence++ })
            .then(this.tagResultHandler)
            .catch(this.errorHandler);
    }

    cleanTags() {
        this.jpush
            .cleanTags({ sequence: this.sequence++ })
            .then(this.tagResultHandler)
            .catch(this.errorHandler);
    }

    setAlias() {
        this.jpush
            .setAlias({ sequence: this.sequence++, alias: "TestAlias" })
            .then(this.aliasResultHandler)
            .catch(this.errorHandler);
    }

    getAlias() {
        this.jpush
            .getAlias({ sequence: this.sequence++ })
            .then(this.aliasResultHandler)
            .catch(this.errorHandler);
    }

    deleteAlias() {
        this.jpush
            .deleteAlias({ sequence: this.sequence++ })
            .then(this.aliasResultHandler)
            .catch(this.errorHandler);
    }

    addLocalNotification() {
        if (this.devicePlatform == "Android") {
            this.jpush.addLocalNotification(0, "Hello JPush", "JPush", 1, 5000);
        } else {
            this.jpush.addLocalNotificationForIOS(5, "Hello JPush", 1, "localNoti1");
        }
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
	
	openSetupModal() {
        let modal = this.modalCtrl.create(Setup);
        modal.present();
    }

}
