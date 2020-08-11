import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoriesRef: AngularFireList<any>;
  private categories: Observable<any[]>;
  constructor(private db:AngularFireDatabase) { 
    this.categoriesRef = db.list('categories');
    // Use snapshotChanges().map() to store the key
    this.categories = this.categoriesRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }
  getAll(){
    return this.categories;
  }

}
