import { Component, OnInit } from '@angular/core';
import { Post } from './post-min/post.model'; //Modelo pra exibir os dados
import { PostsService } from './posts.service'; //Serviço que vai puxar os dados por Get via api backend

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: Post[]

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.postsService.posts()
      .subscribe(posts => this.posts = posts)
  }

}
