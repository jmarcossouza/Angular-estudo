import { Component, OnInit, Input } from '@angular/core';
//Tem que importar o modelo do post, já que ele está sendo usado
import { Post } from './post.model';
//Imports para os animations
import { trigger, state, style, animate, transition, } from '@angular/animations';

//Estou gerando este componente por frescura, mas eu poderia muito bem exibir os dados dos componentes em um ngFor no componente 'posts' (pai deste componente)
@Component({
  selector: 'app-post-min',
  templateUrl: './post-min.component.html',
  styleUrls: ['./post-min.component.css'],
  animations: [ //Aqui vai a putaria das animações
    trigger('expandir', [
      state('normal', style({
        transform: 'scale(1)',
        color: 'black'
      })),
      state('hovered', style({
        transform: 'scale(1.05)',
        color: '#ed6c3d'
      })),
      transition('normal => hovered', [
        animate('250ms')
      ]),
      transition('hovered => normal', [
        animate('100ms')
      ]),
    ]),
  ]
})
export class PostMinComponent implements OnInit {

  //Estado padrão da animação do card
  cardEstado: string = 'normal'
  
  //O Input indica que vou receber essa variável de um outro componente, no caso, vou recebê-la de posts. Estarei enviando pela declaração html mesmo
  @Input() post?: Post //Vou colocá-la como opcional porque vai que né

  constructor() { }

  ngOnInit() {
  }

  mouseInAnimacao() {
    this.cardEstado = 'hovered'
  }

  mouseOutAnimacao() {
    this.cardEstado = 'normal'
  }

}