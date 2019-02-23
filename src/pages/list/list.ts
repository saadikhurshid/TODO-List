import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdditemsPage } from '../additems/additems';
import { EdititemsPage } from '../edititems/edititems';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  items: any = [];
  AddItemForm:FormGroup;
  totalIncome = 0;
  totalExpense = 0;
  balance = 0;
  constructor(public navCtrl: NavController,private sqlite: SQLite,private fb:FormBuilder) {
    this.AddItemForm=this.fb.group({
      Category:['',Validators.required]
     });
    // If we navigated to this page, we will have an item available as a nav param
  }
  ionViewDidLoad() {
   this.getitems()
  }

getitems() {
  this.sqlite.create({
    name: 'ionicdb.db',
    location: 'default'
  }).then((db: SQLiteObject) => {
    db.executeSql('CREATE TABLE IF NOT EXISTS items(rowid INTEGER PRIMARY KEY, type TEXT, description TEXT)',[])
    .then(res => console.log('Executed SQL'))
    .catch(e => console.log(e));
    db.executeSql('SELECT * FROM items ORDER BY rowid DESC', [])
    .then(res => {
      this.items = [];
      for(var i=0; i<res.rows.length; i++) {
        this.items.push({rowid:res.rows.item(i).rowid,type:res.rows.item(i).type,description:res.rows.item(i).description})
      }
    }).catch(e => console.log(e));
    db.executeSql('SELECT SUM(amount) AS totalExpense FROM items WHERE amount', [])
    .then(res => {
      if(res.rows.length>0) {
        this.totalExpense = parseInt(res.rows.item(0).totalExpense);
        this.balance = this.balance+this.totalExpense;
      }
    })
})

}
addpage(){
  this.navCtrl.push(AdditemsPage)
}
deleteData(rowid) {
  this.sqlite.create({
    name: 'ionicdb.db',
    location: 'default'
  }).then((db: SQLiteObject) => {
    db.executeSql('DELETE FROM items WHERE rowid=?', [rowid])
    .then(res => {
      console.log(res);
      this.getitems();
    })
    .catch(e => console.log(e));
  }).catch(e => console.log(e));
}
editData(rowid){
  this.navCtrl.push(EdititemsPage,{rowid:rowid})
}
}
