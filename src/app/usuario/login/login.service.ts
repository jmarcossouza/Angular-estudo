import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BACKEND_REST_2} from '../../app.backend'
//Interface que vai representar o objeto de usuário, com seu nome, email e token de acesso
import { Usuario } from "../usuario.model";
//Com o Operador tap e pipe eu vou conseguir obter os valores do meu usuario logado antes que eu passe essa informação para o componente login
import { tap } from 'rxjs/operators'

@Injectable()
export class LoginService {

    usuario: Usuario

    constructor(private http: HttpClient) {}

    //Método para verificar se o usuário está logado
    logado(): boolean {
        //Se o objeto usuario for diferente de undefined, é porque está logado
        return this.usuario != undefined
    }

    login(email: string, senha: string): Observable<Usuario> {
        return this.http.post<Usuario>(`${BACKEND_REST_2}/api/login`,
                                //O novo módulo HttpClient já trabalha com Content-type: application/json. Então não preciso informar mais como estou mandado os dados
                                {email: email, password: senha}) //Repare que aqui, eu mandei password: senha. O que significa isso?
                                //Tenho que colocar o 'password' em ingles, porque o backend está esperando um parâmetro com este nome. Mesma coisa com o email
                                //...Aí depois que coloquei os parâmetros que o backend está esperando, vou mandar as variáveis que contém os valores

                                //Com isso, eu estou salvando em minha variável usuario aqui as informações de login (token, etc) antes de enviar pro loginComponent
                                .pipe(tap(usuario => this.usuario = usuario))
                                
    }

}