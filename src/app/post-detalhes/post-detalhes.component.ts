import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts/posts.service';
import { Post } from '../posts/post-min/post.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-detalhes',
  templateUrl: './post-detalhes.component.html',
  styleUrls: ['./post-detalhes.component.css']
})
export class PostDetalhesComponent implements OnInit {

  post: Post

  constructor(private postsService: PostsService,
              //Esta variável rota é um objeto ActivatedRoute, ela possui funções que irão identificar o id pela URL. No caso usarei o snapshot
              private rota: ActivatedRoute) { }

  ngOnInit() {
    //O snapshot vai pegar na URL qual é o parâmetro (id) que foi recebido e vai mandá-lo para o método postsPorId do serviço de posts
    this.postsService.postsPorId(this.rota.snapshot.params['id'])
      .subscribe(post => this.post = post)
  }

}
