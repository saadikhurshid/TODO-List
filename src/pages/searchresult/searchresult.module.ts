import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchresultPage } from './searchresult';

@NgModule({
  declarations: [
    SearchresultPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchresultPage),
  ],
})
export class SearchresultPageModule {}
