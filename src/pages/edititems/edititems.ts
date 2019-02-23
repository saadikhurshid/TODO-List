import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ListPage } from '../list/list';
/**
 * Generated class for the EdititemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edititems',
  templateUrl: 'edititems.html',
})
export class EdititemsPage {
  data = { rowid:0, type:"", description:""};
  catogeries:any=[]
  edititemForm:FormGroup
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private sqlite: SQLite,
    private toast: Toast,private fb:FormBuilder) {
      this.edititemForm=this.fb.group({
        Category:['',Validators.required]
      })
      this.getCurrentData(navParams.get("rowid"));
  }
  ionViewDidLoad() {
    this.getData();
  }
   
  getData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM category ORDER BY rowid DESC', [])
      .then(res => {
        this. catogeries = [];
        for(var i=0; i<res.rows.length; i++) {
          this. catogeries.push({rowid:res.rows.item(i).rowid,name:res.rows.item(i).name})
        }
      })
  })

}
  getCurrentData(rowid) {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM items WHERE rowid=?', [rowid])
        .then(res => {
          if(res.rows.length > 0) {
            this.data.rowid = res.rows.item(0).rowid;
            this.data.type = res.rows.item(0).type;
            this.data.description = res.rows.item(0).description;
          }
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

  updateData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('UPDATE items SET type=?,description=? WHERE rowid=?',[this.data.type,this.data.description,this.data.rowid])
        .then(res => {
          console.log(res);
          this.toast.show('Data updated', '5000', 'center').subscribe(
            toast => {
              this.navCtrl.push(ListPage);
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