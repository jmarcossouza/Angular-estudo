import { Post } from './post-min/post.model';
import {Observable} from 'rxjs'
//Vou usar a variável BACKEND_REST que contém o endenreço para consultar os dados
import {BACKEND_REST} from '../app.backend'
import { Injectable } from '@angular/core';
//Não se esqueça de fazer os imports no módulo principal, ou em um módulo secundário
import { HttpClient} from '@angular/common/http' //Importando o Headers para definir os Headers, obviamente
import { map } from 'rxjs/operators'

//Este Injectable indica que o serviço pode receber outras 'injeções' de outros serviços. QUase todos os serviços vão usar isso,
//..porqu o HttpClient vai injetar nesse serviço, e eu vou usar o HttpClient
@Injectable()
export class PostsService {

    constructor(private http: HttpClient) {}

    //Método que retornará um array de objetos dos posts
    //retornará um Observable lista de Posts
    //a busca é uma variável que recebe como padrão uma string vazia. Isto resolveu o problema de eu entrar na página e ele só buscar quando...
    //...eu digitava algo. Agora não, ele já entra na página com essa string de busca vazia, então vai trazer todos os posts logo de inicio
    posts(busca: string = ''): Observable<Post[]> {
        return this.http.get<Post[]>(`${BACKEND_REST}/posts`, {params: {q: busca}} /* Quando indicamos o q, estamos informando ao json-server que quero fazer uma busca em todos os dados */)
    }

    //Este vai buscar por ID. Mas retornará só um objeto post, porque estou pegando só um
    postsPorId(id: string): Observable<Post> {
        return this.http.get<Post>(`${BACKEND_REST}/posts/${id}`)
    }

    enviarPost(post: Post): Observable<number> { //return type number, porque nessa backend que estou usando ele só retorna o id do post cadastrado
        const headers = new Headers()
        headers.append('Content-Type', 'application/json') //definindo o header. no caso vai informar que está enviando um json
        return this.http.post<Post>(`${BACKEND_REST}/posts`, post) //post<Post> o Post dentro dos <> identifica qual tipo vamos receber no http.post
                                    .pipe(map(post => post.id)) //pipe e o map vai mapear o retorno do backend e fazer oq eu mandei, no caso passar pra variável post.id
    }

}