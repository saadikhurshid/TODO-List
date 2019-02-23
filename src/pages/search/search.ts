import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
searchForm:FormGroup
searchs:any=[]
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private fb:FormBuilder,private sqlite: SQLite,private toast:Toast) {
this.searchForm=this.fb.group({
  search:[''],
  searchdate:[''],
  searchdatemin:[''],
  searchdatemax:['']
});
}
search(){
  let data=this.searchForm.value
  let cred ={
   search:data.search
  }
  this.sqlite.create({
    name:'ionicdb.db',
    location:'default'
  }).then((db:SQLiteObject)=>{
    db.executeSql('SELECT * FROM items WHERE type like ?', [cred.search])
  .then(res => {
    this. searchs= [];
    for(var i=0; i<res.rows.length; i++) {
      this.searchs.push({rowid:res.rows.item(i).rowid,date:res.rows.item(i).date,type:res.rows.item(i).type,description:res.rows.item(i).description,amount:res.rows.item(i).amount})
    }
    this.searchForm.reset()
  })
})
.catch(e => {
  console.log(e);
  this.toast.show(e, '5000', 'center').subscribe(
    toast => {
      console.log(toast);
    }
  )}
  )}
  searchdate(){
    let data=this.searchForm.value
    let cred ={
     search:data.searchdate
    }
    this.sqlite.create({
      name:'ionicdb.db',
      location:'default'
    }).then((db:SQLiteObject)=>{
      db.executeSql('SELECT * FROM items WHERE date like ?', [cred.search])
    .then(res => {
      this. searchs= [];
      for(var i=0; i<res.rows.length; i++) {
        this.searchs.push({rowid:res.rows.item(i).rowid,date:res.rows.item(i).date,type:res.rows.item(i).type,description:res.rows.item(i).description,amount:res.rows.item(i).amount})
      }
      this.searchForm.reset()
    })
  })
  .catch(e => {
    console.log(e);
    this.toast.show(e, '5000', 'center').subscribe(
      toast => {
        console.log(toast);
      }
    )}
    )}
    searchdaterange(){
      let data=this.searchForm.value
      let cred ={
       search:data.searchdatemin,
       search2:data.searchdatemax
      }
      this.sqlite.create({
        name:'ionicdb.db',
        location:'default'
      }).then((db:SQLiteObject)=>{
        db.executeSql('SELECT * FROM items WHERE date BETWEEN (?) AND (?)', [cred.search,cred.search2])
      .then(res => {
        this. searchs= [];
        for(var i=0; i<res.rows.length; i++) {
          this.searchs.push({rowid:res.rows.item(i).rowid,date:res.rows.item(i).date,type:res.rows.item(i).type,description:res.rows.item(i).description,amount:res.rows.item(i).amount})
        }
        this.searchForm.reset()
      })
    })
    .catch(e => {
      console.log(e);
      this.toast.show(e, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      )}
      )}
}