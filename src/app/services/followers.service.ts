import { MasterService } from './master.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FollowersService extends MasterService {
  constructor(http:HttpClient) { 
    super('https://api.github.com/users/mosh-hamedani/followers',http)
  }
 }
