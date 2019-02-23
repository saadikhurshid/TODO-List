import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { LoginPage } from '../login/login';
import { Toast } from '@ionic-native/toast';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  loginError:string;
  adduserForm:FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formbuilder:FormBuilder,private sqlite: SQLite,private toast:Toast) {
  
      this.adduserForm=this.formbuilder.group({
        email:['',Validators.email],
        password:['',Validators.minLength(6)]
      });
    }
  adduser(){
    let data=this.adduserForm.value
    let cred ={
      email:data.email,
      password:data.password
    }
    this.sqlite.create({
      name:'ionicdb.db',
      location:'default'
    }).then((db:SQLiteObject)=>{
      db.executeSql('CREATE TABLE IF NOT EXISTS login(rowid INTEGER PRIMARY KEY, email TEXT,password TEXT )',[])
.then(()=>{
  db.executeSql('INSERT INTO login VALUES(NULL,?,?)',[cred.email,cred.password])
  .then(res => {
    console.log(res);
    this.toast.show('Data saved', '5000', 'center').subscribe(
      toast => {
        this.navCtrl.push(LoginPage);
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
})
    })
  }
 
}
