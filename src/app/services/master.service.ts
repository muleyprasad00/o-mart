import { BadInput } from './../common/bad-input';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private url, private http:HttpClient) { }


  getAll(){
    return this.http.get(this.url)
    .pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  create(resource){
    return this.http.post(this.url,resource)
    .pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }
  
  update(resource){
    return this.http.patch(this.url+`/${resource.id}`,resource)
    .pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  delete(id){
    return this.http.delete(this.url+`/${id}`)
    .pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }


  private handleError(error:Response){
    if(error.status === 400){
      return Observable.throw(new BadInput(error.json()))
    }
    if(error.status === 404){
      return Observable.throw(new NotFoundError())
    }
    return Observable.throw(new AppError(error.json()));
  }

}
