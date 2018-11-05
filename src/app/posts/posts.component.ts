import { Component, OnInit } from '@angular/core';
import { Post } from './post-min/post.model'; //Modelo pra exibir os dados
import { PostsService } from './posts.service'; //Serviço que vai puxar os dados por Get via api backend
import { FormControl, FormGroup } from '@angular/forms';
import { switchMap, tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable } from 'rxjs'

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html'
})
export class PostsComponent implements OnInit {

  posts: Post[]

  pesquisa: FormGroup

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    //Também posso criar um form dessa maneira, não preciso importar o FormBuilder no construtor que nem fiz dos primeiros jeitos
    this.pesquisa = new FormGroup({
        palavraschave: new FormControl('')
    })

    //Criando um subscribe pro input palavraschave. Toda vez que houver um valueChanges (ou seja, toda vez que mudar o valor do input)
    //...vai acionar um evento
    this.pesquisa.controls.palavraschave.valueChanges //Loucura pra fazer a busca quando mudar os valores. Nem sei o que está sendo feito aí
                    .pipe(
                        debounceTime(500), //Vai fazer com que ele aguarde 500 milisegundos antes de fazer a pesquisa, isso ajuda para que ele não fique pedindo um get toda vez que o usuário aperta uma tecla, agora ele espera 500milisegundos
                        distinctUntilChanged(), //Só vai pesquisar quando o valor atual da pesquisa for diferente do último
                        switchMap(termobusca => //Pesquise sobre o switchMap para entender melhor. Mas ele meio que vai cancelar o outro subscribe, se é isso que eu entendi.
                            this.postsService.posts(termobusca)))
                    .subscribe(posts => this.posts = posts)

    //Apesar de eu ter definido o método de busca acima, tenho que deixar esta chamada aqui. Para que, quando entre na página, já trazer todos os posts
    //Mas veja no posts.service, porque la tem uma pegada com o parâmetro do termo de busca.
    this.postsService.posts()
      .subscribe(posts => this.posts = posts)
  }

}
