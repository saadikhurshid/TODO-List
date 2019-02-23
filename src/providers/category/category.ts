import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the CategoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoryProvider {
categories:any=[]
  constructor(private sqlite: SQLite) {

    console.log('Hello CategoryProvider Provider');
  }
  getData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS category(rowid INTEGER PRIMARY KEY, name TEXT,CategoryMin INTEGER,CategoryMax INTEGER )', [])
      .then(res => console.log('Executed SQL'))
      .catch(e => console.log(e));
      db.executeSql('SELECT * FROM category ORDER BY rowid DESC', [])
      .then(res => {
        this. categories = [];
        for(var i=0; i<res.rows.length; i++) {
        //  this.categories.push({rowid:res.item(i).rowid})
          this.categories.push({rowid:res.rows.item(i).rowid,name:res.rows.item(i).name
            ,CategoryMin:res.rows.item(i).CategoryMin,CategoryMax:res.rows.item(i).CategoryMax})
        }
        
      })
  })

}
}
