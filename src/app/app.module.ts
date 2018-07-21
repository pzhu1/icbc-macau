import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {SigninPage} from "../pages/auth/signin";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {NxModule} from '@nrwl/nx';
import {reducers} from './app.reducer';
import {counterReducer} from '../reducers/counter.reducer';
import {counterInitialState} from'../status/counter.state';
import {CounterEffects} from '../effects/counter.effects';
import {HttpClientModule} from '@angular/common/http';
import {CounterService} from "../service/counter.service";
import { JPush } from '@jiguang-ionic/jpush';

//import {CounterService,Sse} from "../service/counter.service";
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
      SigninPage
  ],
  imports: [
      HttpClientModule,
    BrowserModule,
      IonicModule.forRoot(MyApp),

      StoreModule.forRoot(reducers),
      EffectsModule.forRoot([]),
      StoreDevtoolsModule.instrument({maxAge: 25}) ,
      NxModule.forRoot(),
      StoreModule.forFeature('counter', counterReducer, {initialState: counterInitialState}),
      EffectsModule.forFeature([CounterEffects])

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
      SigninPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
      JPush,
      CounterService,//Sse,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
