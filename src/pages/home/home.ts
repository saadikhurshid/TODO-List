import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { AddCategoryPage } from '../add-category/add-category';
import { EditcategoryPage } from '../editcategory/editcategory';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  categories: any = [];
  totalIncome = 0;
  totalExpense = 0;
  balance = 0;
  constructor(public navCtrl: NavController,private sqlite: SQLite) {

    }
    ionViewDidLoad() {
      this.getData();
    }
    
    ionViewWillEnter() {
      this.getData();
   
    }
    getData() {
      this.sqlite.create({
        name: 'ionicdb.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        db.executeSql('CREATE TABLE IF NOT EXISTS category(rowid INTEGER PRIMARY KEY, name TEXT,CategoryMin TEXT,CategoryMax TEXT)', [])
        .then(res => console.log('Executed SQL'))
        .catch(e => console.log(e));
        db.executeSql('SELECT * FROM category ORDER BY rowid DESC', [])
        .then(res => {
          this.categories = [];
          for(var i=0; i<res.rows.length; i++) {
  
            this.categories.push({rowid:res.rows.item(i).rowid,name:res.rows.item(i).name,CategoryMin:res.rows.item(i).CategoryMin,CategoryMax:res.rows.item(i).CategoryMax})
          }
        })
    })

  }
  deleteData(rowid) {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM category WHERE rowid=?', [rowid])
      .then(res => {
        console.log(res);
        this.getData();
      })
      .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }
  addpage(){
    this.navCtrl.push(AddCategoryPage)
  }
  editData(rowid) {
    this.navCtrl.push(EditcategoryPage, {
      rowid:rowid
    });
  }
}
