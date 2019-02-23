import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Alert } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SignupPage } from '../signup/signup';
import { MainPage } from '../main/main';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginError:string;
 loginForm:FormGroup;
 

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private formbuilder:FormBuilder,private sqlite: SQLite,private alert:Alert) {

    this.loginForm=this.formbuilder.group({
      email:['',Validators.email],
      password:['',Validators.minLength(6)]
    });
  }

  login(){
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      let data= this.loginForm.value
      let cred ={
        email:data.email,
        password:data.password
      }
      db.executeSql('SELECT password FROM login WHERE password=?', [cred.password])
      .then(res => {
        if(res.rows.length==0){
          console.log(res) 
        }
        else{
          console.log(res);
          this.navCtrl.push(MainPage);
        }
       
      })
      .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }
  signUp(){
    this.navCtrl.push(SignupPage)
  }
}
