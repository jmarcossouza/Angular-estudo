import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injector, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./usuario/login/login.service";
//NÃO SE ESQUEÇA DE DECLARAR ISTO AQUI EM ALGUMA LISTA DE PROVIDERS, ESTE ESTÁ DECLARADO NO MÓDULO PRINCIPAL.

//Pesquise mais sobre interceptors. https://www.udemy.com/angular-pt/learn/v4/t/lecture/8119298?start=0
//Mas pelo que entendi, ele vai interceptar toda chamada http.
//E também, eu consigo modificar chamadas http antes delas serem completamente realizadas, como modificar um header ou outra coisa. Com ele posso fazer o tratamento de erros.
@Injectable()
export class AuthInterceptor implements HttpInterceptor {//Em geral, registramos estes objetos na lista de providers, então vou registar nos providers do módulo principal.

    constructor(private injetor: Injector) {}//Se eu quiser injetar um serviço aqui (como o LoginService) pra fazer alguma coisa, eu não posso injetar diretamente pelo construtor...
    //...como normalmente faço (não sei exatamente o porquê não posso, sei que da um erro e o professor instruiu a fazer assim). Devo injetar usando este injector. Injector é uma...
    //...referência pro mecanismo de injeção do angular, posso injetar qualquer coisa com ele.

    //HttpRequest representa o request que eu quero interceptar, ou seja, quero modificar o quê? Quero modificar o header? Alguma outra opção?
    //Quando o interceptor terminar de fazer o trabalho dele, ele irá interagir com este objeto next e dizer que terminou seu trabalho, e agora é sua vez.
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //Coloquei este console log para ver como funciona, abra uma tela que faz chamada http (post e get) e veja o que aparece no console.
        console.log('Interceptor AuthInterceptor (Marcão) está OBSERVANDO a sua chamada http: ', request)

        const loginService = this.injetor.get(LoginService) //E é assim que eu faço a injeção usando o inector.
        /*
        Agora, aqui eu poderia fazer alguma coisa com este LoginService. Suponhamos que eu tenha uma verificação que veja se o usuário está logado, se estiver logado, ele vai pegar...
        ...o token e colocar no header da chamada. Eu poderia fazer isso lá no loginService, mas se tivesse vários outros serviços que precisassem fazer isso, daria em código duplicado...
        ...então, pelo bom costume, fazemos isso aqui. Eu não vou fazer de fato, vou criar um exemplo inexistente nesta aplicação só pra entender:

        if (this.loginService.logado()) { //verificando se o usuário está logado, primeiramente (Se existe o token no cookie ou em algum serviço)
            //Eu não consigo modificar esta instancia request do objeto HttpRequest. Então eu teria que clonar esta instancia para uma outra instancia e fazer o que devo. Mas sabendo que isso...
            //...seria muito comum, o pessoal do angular já criou um método clone no Request, então vou usá-lo.
            //Aqui estou criando outro Request e pegando a clonagem do request original
            const authRequest = request.clone( //Tem alguns parâmetros que podemos setar logo de cara na clonagem. Vou apresentar só um que é o setHeaders, mas daria pra modificar o body se quisesse tbm
                {setHeaders: {'Authorization': `Bearer ${loginService.usuario.token}`}} //Aqui estou setando o token no header
            )

            //Agora que fiz o que tinha que fazer, vou retornar o handle só que com um novo request modificado
            return next.handle(authRequest)
        } else { //Se não estiver logado, vou deixar a chamada rolar, porque dane-se. Não tenho o que fuçar aqui. Se o cara tentar acessar uma página que requer autentificação e não estiver logado...
                        //..vai receber um erro http (401 eu acho), mas eu posso tratar esse erro no httphandler, e lá sim ver o que vou fazer se isso acontecer.
            return next.handle(request) //Método pra continuar a chamada, como abaixo
        }

        */

        //Este comando que vai fazer interagir com o proximo da 'fila'
        return next.handle(request) //Este está dizendo para continuar e passar a chamada http pro resto da fila. este 'request' são os dados que queremos que continuem até chegar na chamada
    }
}