import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Searchbar } from 'ionic-angular';
import { SQLite } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AddCategoryPage } from '../pages/add-category/add-category';
import { CategoryProvider } from '../providers/category/category';
import { MainPage } from '../pages/main/main';
import { TransactionPage } from '../pages/transaction/transaction';
import { ReportPage } from '../pages/report/report';
import { AdditemsPage } from '../pages/additems/additems';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { EditcategoryPage } from '../pages/editcategory/editcategory';
import { EdititemsPage } from '../pages/edititems/edititems';
import { SearchPage } from '../pages/search/search';
import { SearchresultPage } from '../pages/searchresult/searchresult';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AddCategoryPage,
    MainPage,
    TransactionPage,
    ReportPage,
    AdditemsPage,
    LoginPage,
    SignupPage,
    EditcategoryPage,
    AddCategoryPage,
    EdititemsPage,
    SearchPage,
    SearchresultPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    AddCategoryPage,
    MainPage,
    TransactionPage,
    ReportPage,
    AdditemsPage,
    LoginPage,
    SignupPage,
    EditcategoryPage,
    AddCategoryPage,
    EdititemsPage,
    SearchPage,
    SearchresultPage


  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Toast,
    SQLite,
    CategoryProvider 
  ]
})
export class AppModule {}
