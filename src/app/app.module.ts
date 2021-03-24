import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
var firebaseConfig = {
  apiKey: "AIzaSyCasNI2qAoo17xvXOHM1rF3v9ARz5pdwaA",
  authDomain: "shopping-list-2e9f6.firebaseapp.com",
  databaseURL: "https://shopping-list-2e9f6.firebaseio.com",
  projectId: "shopping-list-2e9f6",
  storageBucket: "shopping-list-2e9f6.appspot.com",
  messagingSenderId: "436891313869",
  appId: "1:436891313869:web:9dd11985ec5a0a3829eb84",
  measurementId: "G-95DX6L2ZW1"
};
//Initialize Firebase
firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
