import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Toast } from '@ionic-native/toast';
import { EdititemsPage } from '../edititems/edititems';
import { ListPage } from '../list/list';
/**
 * Generated class for the AdditemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-additems',
  templateUrl: 'additems.html',
})
export class AdditemsPage {
  expenses: any = [];
  items: any = [];
  AddItemForm:FormGroup;
  totalIncome = 0;
  totalExpense = 0;
  balance = 0;
  constructor(public navCtrl: NavController,private sqlite: SQLite,private fb:FormBuilder, private toast:Toast) {
    this.AddItemForm=this.fb.group({
      Category:['',Validators.required],
      description:['',Validators.required],
      
     });
    // If we navigated to this page, we will have an item available as a nav param
  }

  ionViewDidLoad() {
    this.getitems()
    this.getData();
   
  }
  ionViewWillEnter() {
    this.getData();
    this.getitems()
 
  }
  getData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM category ORDER BY rowid DESC', [])
      .then(res => {
        this.expenses = [];
        for(var i=0; i<res.rows.length; i++) {
          this.expenses.push({rowid:res.rows.item(i).rowid,name:res.rows.item(i).name})
        }
      })
  })

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
saveData() {
  this.sqlite.create({
    name: 'ionicdb.db',
    location: 'default'
  }).then((db: SQLiteObject) => {
    let type=this.AddItemForm.value
    let data={
      type:type.Category,
      description:type.description
    }

    db.executeSql('INSERT INTO items VALUES(NULL,?,?)',[data.type,data.description])
      .then(res => {
        this.toast.show('Data saved', '5000', 'center').subscribe(
          toast => {
            this.getitems();
          }
        );
      })
      .catch(e => {
        console.log(e);
        this.toast.show(e, '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      });
  }).catch(e => {
    console.log(e);
    this.toast.show(e, '5000', 'center').subscribe(
      toast => {
        console.log(toast);
      }
    );
  });
}

}
