import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BACKEND_REST_2} from '../../app.backend'
//Interface que vai representar o objeto de usuário, com seu nome, email e token de acesso
import { Usuario } from "../usuario.model";
//Com o Operador tap e pipe eu vou conseguir obter os valores do meu usuario logado antes que eu passe essa informação para o componente login
import { tap } from 'rxjs/operators'
//Serviço de login
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class LoginService {

    usuario: Usuario

    //Injetando o HttpClient e o CookieService (pra setar e pegar cookies, obviamente)
    constructor(private http: HttpClient, private cookieService: CookieService) {
        if (cookieService.check('token')) //Aqui, vai checar se o cookie com o nome 'token' existe.
            this.usuario = { //Se existir, vai meio que criar uma instancia de usuario com esses {} (tenho que fazer isso porque é um objeto model)
                token: cookieService.get('token') //e vai setar a propriedade token pegando o valor do token que está no cookie
            }
    }

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
                                .pipe(tap(usuario => {
                                    this.usuario = usuario
                                    this.cookieService.set( 'token', usuario.token, 1, '/') //Além de setar aqui as informações de login, vai setar um cookie com algumas propriedades.
                                                            //Nome: token,
                                                            //Valor: Vai receber o valor de usuario.token (variável auxiliar para receber o retorno do post de login),
                                                            //(Opcional)Tempo de duração: aparentemente pode ser setado em number (dias) ou date. Estou usando number porque é mais fácil. Então no caso está 1 dia.
                                                            //(Opcional)Path: caminho do cookie, se eu não definir, vai colocar a partir do caminho que está sendo chamado. É melhor definir e colocar o path '/' pra funcionar no sistema inteiro
                                }))
                                
    }

    deslogar() {
        this.usuario = undefined //Setar a variável local de usuário para undefined
        this.cookieService.delete('token', '/') //Remover o cookie:
                                    //1º: Nome do cookie a ser removido
                                    //2º: Path ou caminho, estou removendo do path inicial, então vou remover do site inteiro
                                    //(to achando que este path não é necessário colocar, mas estou colocando pra garantir e pra explicar sobre ele também)
    }

}