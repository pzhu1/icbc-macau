import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import {SigninPage} from "../pages/auth/signin";
import { JPush } from '@jiguang-ionic/jpush';
import {NativeStorage} from "@ionic-native/native-storage";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //rootPage:any = TabsPage;
  rootPage:any = SigninPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, jpush: JPush,
              nativeStorage: NativeStorage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
        jpush.init();
        jpush.setDebugMode(true);
        console.log("Myapp:");
        nativeStorage.getItem("SESSIONID").then(data=>console.log(data));
    });
  }
}
