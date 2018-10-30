import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BACKEND_REST_2} from '../../app.backend'
//Interface que vai representar o objeto de usuário, com seu nome, email e token de acesso
import { Usuario } from "../usuario.model";

@Injectable()
export class LoginService {

    constructor(private http: HttpClient) {}

    login(email: string, senha: string): Observable<Usuario> {
        return this.http.post<Usuario>(`${BACKEND_REST_2}/api/login`,
                                //O novo módulo HttpClient já trabalha com Content-type: application/json. Então não preciso informar mais como estou mandado os dados
                                {email: email, password: senha}) //Repare que aqui, eu mandei password: senha. O que significa isso?
                                //Tenho que colocar o 'password' em ingles, porque o backend está esperando um parâmetro com este nome. Mesma coisa com o email
                                //...Aí depois que coloquei os parâmetros que o backend está esperando, vou mandar as variáveis que contém os valores
    }

}