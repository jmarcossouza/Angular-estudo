import { Component, OnInit, Input } from '@angular/core';
import { Post } from './post.model';

//Estou gerando este componente por frescura, mas eu poderia muito bem exibir os dados dos componentes em um ngFor no componente 'posts' (pai deste componente)
@Component({
  selector: 'app-post-min',
  templateUrl: './post-min.component.html',
  styleUrls: ['./post-min.component.css']
})
export class PostMinComponent implements OnInit {
  
  //O Input indica que vou receber essa variável de um outro componente, no caso, vou recebê-la de posts. Estarei enviando pela declaração html mesmo
  @Input() post?: Post //Vou colocá-la como opcional porque vai que né

  constructor() { }

  ngOnInit() {
  }

}