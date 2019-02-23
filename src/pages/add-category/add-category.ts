import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { HomePage } from '../home/home';

import { EditcategoryPage } from '../editcategory/editcategory';
/**
 * Generated class for the AddCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-category',
  templateUrl: 'add-category.html',
})
export class AddCategoryPage {
  data = { name:"", CategoryMin:"",CategoryMax:""};
  categories: any = [];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private sqlite: SQLite,
    private toast: Toast) {}

  
  saveData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      let details = {
        name:this.data.name,
        CategoryMin:this.data.CategoryMin,
        CategoryMax:this.data.CategoryMax
      }
      db.executeSql('INSERT INTO category VALUES(NULL,?,?,?)',[details.name,details.CategoryMin,details.CategoryMax])
        .then(res => {
          this.toast.show('Data saved', '5000', 'center').subscribe(
            toast => {
              this.getData();
            }
          );
        })
        .catch(e => {
          console.log(e);
          this.toast.show(JSON.stringify(e), '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
    }).catch(e => {
      console.log(e);
      this.toast.show(JSON.stringify(e), '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
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

editData(rowid) {
  this.navCtrl.push(EditcategoryPage, {
    rowid:rowid
  });
}
}

