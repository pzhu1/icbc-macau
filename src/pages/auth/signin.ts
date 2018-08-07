import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { NavController } from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import { AlertController } from 'ionic-angular';
import {CardMerchantService} from "../../service/card-merchant.service";
import {NativeStorage} from "@ionic-native/native-storage";


@Component({
    selector: 'page-signin',
    templateUrl: 'signin.html'
})
export class SigninPage implements OnInit{

    @ViewChild('eyes') eyes: ElementRef;
    @ViewChild('ps') ps: ElementRef;
    eyetype = 'eye-off'
    passwordtype = 'password'
    constructor(public navCtrl: NavController,
                private alertCtrl: AlertController,
                public cardMerchantService: CardMerchantService,
                private nativeStorage: NativeStorage) {
        console.log("SigninPage constructor")


    }

    //沟崽子们


    ionViewWillEnter(){
        console.log("SigninPage ionViewWillEnter")

        this.nativeStorage.getItem("SESSIONID").then(data=>{
            this.cardMerchantService.checkLoginSession(data).toPromise().then(data=>{
                console.log(data);
                if(Object(data).code == "0")
                    this.navCtrl.push(TabsPage);

            })
        })
    }




    ngOnInit(){
        console.log("SigninPage Oninit")


    }
    checkEnter(event,acc,psw){
        console.log(event)
        if(event.keyCode == 13)
            this.signin(acc,psw);
    }

    send(mobile) {
        console.log("test click!")
        this.cardMerchantService.sendVerifyCode_rsa(mobile).toPromise().then(data=> {
            console.log(data);
        });
    }

    signin(acc,psw){
        console.log(acc,psw)
        // if(acc == '1' && psw == '1')
        //     this.navCtrl.push(TabsPage);
        // else if(acc !='1')
        //     this.presentAlert('account do not exist!')
        // else if(acc =='1' && psw != '1')
        //     this.presentAlert('wrong password!')
        console.log("test2 click!")
        this.cardMerchantService.checkVerifyCode_rsa(acc,psw).toPromise().then(data=> {
            console.log(data);
            console.log(Object(data).message);
            console.log(Object(Object(data).data).uid);
            console.log(Object(Object(data).data).sessionid);
            /* this.nativeStorage.setItem('UID', Object(Object(data).data).uid)
                .then(
                    () => console.log('Stored UID!'),
                    error => console.error('Error storing item', error)
                );
            this.nativeStorage.setItem('SESSIONID', Object(Object(data).data).sessionid)
                .then(
                    () => console.log('Stored SESSIONID!'),
                    error => console.error('Error storing item', error)
                ); */
				
			localStorage.setItem('UID', Object(Object(data).data).uid);
			localStorage.setItem('SESSIONID', Object(Object(data).data).sessionid);
			
            if(Object(data).code === "0")
                this.navCtrl.push(TabsPage);
            else if(Object(data).code === "1")
                alert("手機號碼不合法")
            else if(Object(data).code === "2")
                alert("驗證碼不正確")
            else if (Object(data).code === "3")
                alert("驗證碼已過期，請重新獲取")
            else
                alert("網絡故障，請稍後再試")
        });
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
