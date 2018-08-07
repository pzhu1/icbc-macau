
import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import {CardMerchantService} from "../../../service/card-merchant.service";
import {NativeStorage} from "@ionic-native/native-storage";

declare var localStorage: any;

@Component({
  selector: 'page-home',
  templateUrl: 'setup.html',
})
export class Setup implements OnInit{
	@ViewChild('mobile') Mobile: ElementRef;
	@ViewChild('name') Name: ElementRef;
	@ViewChild('departmentid') Departmentid: ElementRef;
	
	openModalMgt: Boolean;
	openModalAdd: Boolean;
	mobile: any;
	name: any;
	departmentid: any;

    constructor(
        public platform: Platform,
        public params: NavParams,
        public viewCtrl: ViewController,
		public cardMerchantService: CardMerchantService,
		private nativeStorage: NativeStorage
    ) {
    }


    ngOnInit() {
		this.openModalMgt = false;
		this.openModalAdd = false;
	}

    dismiss() {
        this.viewCtrl.dismiss();
    }
	
	openUserMgt(){
		console.log('clicked');
		this.openModalMgt = true;
		this.openModalAdd = false;
	}
	
	addUser(){
		console.log('clicked');
		this.openModalAdd = true;
		this.openModalMgt = false;
	}
	
	closeModalMgt(){
		this.openModalMgt = false;
	}
	
	closeModalAdd(){
		this.openModalAdd = false;
	}
	
	submitForm(){
		var data = {
			sessionid: localStorage.getItem('SESSIONID'),
			mobile: this.Mobile.value,
			name: this.Name.value,
			departmentid: this.Departmentid.value
		};
		
		this.cardMerchantService.addUser(data).toPromise().then(data=> {
			console.log(data);
		});
	}

}
