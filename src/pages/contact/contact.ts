import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {CardMerchantService} from '../../service/card-merchant.service';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
    providers:[CardMerchantService]
})
export class ContactPage {

  constructor(public navCtrl: NavController,
              public cardMerchantService: CardMerchantService,
              private nativeStorage: NativeStorage) {

  }

  //send verifycode
  test() {
    console.log("test click!")
    this.cardMerchantService.sendVerifyCode_rsa('66767311').toPromise().then(data=> {
      console.log(data);
    });
  }

  //check verifycode
  test2() {
      console.log("test2 click!")
      this.cardMerchantService.checkVerifyCode_rsa('66767311','960938').toPromise().then(data=> {
        console.log(data);
        console.log(Object(data).message);
        console.log(Object(Object(data).data).uid);
        console.log(Object(Object(data).data).sessionid);
        this.nativeStorage.setItem('UID', Object(Object(data).data).uid)
            .then(
                () => console.log('Stored UID!'),
                error => console.error('Error storing item', error)
            );
        this.nativeStorage.setItem('SESSIONID', Object(Object(data).data).sessionid)
            .then(
                () => console.log('Stored SESSIONID!'),
                error => console.error('Error storing item', error)
            );

      });
  }

  test3() {
      this.nativeStorage.getItem('UID')
          .then(
              data => console.log(data),
              error => console.error(error)
          );
      this.nativeStorage.getItem('SESSIONID')
          .then(
              data => console.log(data),
              error => console.error(error)
          );
  }

}
