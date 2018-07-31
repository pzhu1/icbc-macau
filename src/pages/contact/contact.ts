import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {CardMerchantService} from '../../service/card-merchant.service';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
    providers:[CardMerchantService]
})
export class ContactPage {

  constructor(public navCtrl: NavController, public cardMerchantService: CardMerchantService) {

  }

  test() {
    console.log("test click!")
    this.cardMerchantService.sendVerifyCode_rsa().toPromise().then(data=> console.log(data));
  }

}
