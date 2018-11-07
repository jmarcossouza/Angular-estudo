import { Component, OnInit } from '@angular/core';
//Import dos forms
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms'
import { Post } from '../posts/post-min/post.model';
import { PostsService } from '../posts/posts.service';
import { NotificacaoService } from '../shared/notificacao/notificacao.service';

@Component({
  selector: 'app-adicionar-post',
  templateUrl: './adicionar-post.component.html',
  styleUrls: ['./adicionar-post.component.css']
})
export class AdicionarPostComponent implements OnInit {

  //Variável que contém o formulário
  addPostForm: FormGroup

  constructor(private formBuilder: FormBuilder, private postsService: PostsService, private notificacao: NotificacaoService) { }

  ngOnInit() {
    this.addPostForm = this.formBuilder.group(
      {
        //Aqui vão as propriedades que os inputs terão, suas validações, etc. Neste carro, o input se identificará como title
        title: this.formBuilder.control(/* Isto indica que vai começar com um value vazio */'', [Validators.required, Validators.minLength(4), Validators.maxLength(250)]),
        body: this.formBuilder.control(/* Isto indica que vai começar com um value vazio */'', [Validators.required, Validators.minLength(4)])
      }
    )
  }

  enviarPost(post: Post) { //Vai receber os dados do form como objeto Post e vai enviá-los para o service enviar o form
    this.postsService.enviarPost(post) //Enviando a variável post do tipo Post com os dados do formulário
        .subscribe( (postId: number) => {//Aqui tem o subscribe que vai me retornar o que foi pedido lá no serviço. vou receber o id e imprimir no console.
          //método que vai fazer algo quando eu receber o meu subscribe
          this.notificacao.notificar(`Post adicionado. ID: ${postId}`)//Mostrar a notificação
        })
  }

}
