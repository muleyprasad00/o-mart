import { MasterService } from './master.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PostService extends MasterService {
  constructor(http:HttpClient) { 
    super('https://jsonplaceholder.typicode.com/posts',http)
  }
}
