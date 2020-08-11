import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AppUser } from '../models/app-user';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  public appUser:AppUser
  constructor(private auth:AuthService) {
        auth.appUser$.subscribe(appUser =>{
          if(appUser) this.appUser = appUser;
        })
   }

  ngOnInit(): void {

  }


}
