import { Post } from './post-min/post.model';
import {Observable} from 'rxjs'
//Vou usar a variável BACKEND_REST que contém o endenreço para consultar os dados
import {BACKEND_REST} from '../app.backend'
import { Injectable } from '@angular/core';
//Não se esqueça de fazer os imports no módulo principal, ou em um módulo secundário
import { HttpClient } from '@angular/common/http'

//Este Injectable indica que o serviço pode receber outras 'injeções' de outros serviços. QUase todos os serviços vão usar isso,
//..porqu o HttpClient vai injetar nesse serviço, e eu vou usar o HttpClient
@Injectable()
export class PostsService {

    constructor(private http: HttpClient) {}

    //Método que retornará um array de objetos dos posts
    //retornará um Observable lista de Posts
    posts(): Observable<Post[]> {
        return this.http.get<Post[]>(`${BACKEND_REST}/posts`)
    }

    //Este vai buscar por ID. Mas retornará só um objeto post, porque estou pegando só um
    postsPorId(id: string): Observable<Post> {
        return this.http.get<Post>(`${BACKEND_REST}/posts/${id}`)
    }

}