import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Toast } from '@ionic-native/toast';
import { EdititemsPage } from '../edititems/edititems';

/**
 * Generated class for the AdditemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transaction',
  templateUrl: 'transaction.html',
})
export class TransactionPage {
  expenses: any = [];
  items: any = [];
  subItems:any = [];
  AddItemForm:FormGroup;
  totalIncome = 0;
  totalExpense = 0;
  balance = 0;
  cat:any = [];
  value:any
  constructor(public navCtrl: NavController,private sqlite: SQLite,private fb:FormBuilder, 
    private toast:Toast,private alertCtrl: AlertController) {
    this.AddItemForm=this.fb.group({
      Category:['',Validators.required],
      Amount:['',Validators.required],
      Items:['',Validators.required],
      
     });
    // If we navigated to this page, we will have an item available as a nav param
  }

  ionViewDidLoad() {
    this.getitems()
    this.getData();
  }
  ionViewWillEnter() {
    this.getData();
    this.getitems();
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
onamountChange($event){
  this.sqlite.create({
    name: 'ionicdb.db',
    location: 'default'
  }).then((db: SQLiteObject) => {
    db.executeSql('SELECT * FROM category WHERE name=?',[this.AddItemForm.value.Category])
    .then(res => {
      this.cat = [];
      for(var i=0; i<res.rows.length; i++) {
        this.cat.push({rowid:res.rows.item(i).rowid,name:res.rows.item(i).name,CategoryMin:res.rows.item(i).CategoryMin,CategoryMax:res.rows.item(i).CategoryMax})      
      }
    }).then(()=>{
      let data = this.cat[0]
    console.log(this.value,"Here is ther value")
      let alert = this.alertCtrl.create({
        title: 'Amount Exceed',
        subTitle:'Amount Limit Exceed From The Define Max Amount For THis Category',
        buttons: ['Dismiss']
      });
      if(this.value > parseInt(data.CategoryMax)){
        alert.present();
      }
    
     else{
       console.log('')
     }
    })
})

}
onChange($event){  
  this.getsubItems($event)
  }
getsubItems($event) {
  this.sqlite.create({
    name: 'ionicdb.db',
    location: 'default'
  }).then((db: SQLiteObject) => {
    db.executeSql('SELECT * FROM items WHERE type=?',[$event])
    .then(res => {
      this.subItems = [];
      for(var i=0; i<res.rows.length; i++) {
        this.subItems.push({rowid:res.rows.item(i).rowid,type:res.rows.item(i).type,description:res.rows.item(i).description})
      }
    })
})

}
getitems() {
  this.sqlite.create({
    name: 'ionicdb.db',
    location: 'default'
  }).then((db: SQLiteObject) => {
    db.executeSql('CREATE TABLE IF NOT EXISTS tanscations(rowid INTEGER PRIMARY KEY, type TEXT, Amount TEXT)',[])
    .then(res => console.log('Executed SQL'))
    .catch(e => console.log(e));
    db.executeSql('SELECT * FROM tanscations ORDER BY rowid DESC', [])
    .then(res => {
      this.items = [];
      for(var i=0; i<res.rows.length; i++) {
        this.items.push({rowid:res.rows.item(i).rowid,type:res.rows.item(i).type,Amount:res.rows.item(i).Amount})
      }
    }).catch(e => console.log(e));
    db.executeSql('SELECT SUM(amount) AS totalExpense FROM tanscations WHERE amount', [])
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
    db.executeSql('DELETE FROM tanscations WHERE rowid=?', [rowid])
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
      Amount:type.Amount
    }

    db.executeSql('INSERT INTO tanscations VALUES(NULL,?,?)',[data.type,data.Amount])
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
