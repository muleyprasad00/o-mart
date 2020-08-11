import { BadInput } from './../common/bad-input';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: any;
  
  constructor(private service:PostService) { }

  ngOnInit(): void {
    this.service.getAll()
      .subscribe(posts => this.posts = posts);
  }

  createPost(input: HTMLInputElement) {
    let post = { title: input.value }
    input.value = '';
   this.service.create(post)
      .subscribe(posts => {
        post['id'] = posts['id'];
        this.posts.splice(0, 0, post);
        console.log(posts)
      },
      (error:AppError)=>{
        if(error instanceof BadInput){
          alert("Post is already been deleted.");
        }
        else throw error;
      });
  }

  updatePost(post){
    this.service.update(JSON.stringify({isRead:true}))
    .subscribe(posts=>{
      console.log(posts);
    });
  }

  deletePost(post){
    this.service.delete(post.id)
    .subscribe(posts=>{
      let index = this.posts.indexOf(post);
      this.posts.splice(index,1);
    },
    (error:AppError)=>{
      if(error instanceof NotFoundError){
        alert("Post is already been deleted.");
      }
      else throw error;
    });
  }
}