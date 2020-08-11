import { FollowersService } from './../services/followers.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {

  followers:any;
  constructor(private service:FollowersService) { }

  ngOnInit(): void {
    this.service.getAll()
    .subscribe(followers=>this.followers = followers)
  }

}
