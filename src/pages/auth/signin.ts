import {Component, ElementRef, ViewChild} from '@angular/core';
import { NavController } from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import { AlertController } from 'ionic-angular';


@Component({
    selector: 'page-signin',
    templateUrl: 'signin.html'
})
export class SigninPage {

    @ViewChild('eyes') eyes: ElementRef;
    @ViewChild('ps') ps: ElementRef;
    eyetype = 'eye-off'
    passwordtype = 'password'
    constructor(public navCtrl: NavController,private alertCtrl: AlertController) {

    }

    signin(acc,psw){
        console.log(acc,psw)
        if(acc == '88888888' && psw == '111111')
            this.navCtrl.push(TabsPage);
        else if(acc !='88888888')
            this.presentAlert('account do not exist!')
        else if(acc =='88888888' && psw != '111111')
            this.presentAlert('wrong password!')

    }

    eyeOnOff(){
        this.eyetype = this.eyetype == 'eye-off'?'eye':'eye-off';
        this.passwordtype = this.passwordtype == 'password'? 'text':'password';

    }

    presentAlert(note) {
        let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: note,
            buttons: ['Dismiss']
        });
        alert.present();
    }

}