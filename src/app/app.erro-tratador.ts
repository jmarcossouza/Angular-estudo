import { HttpErrorResponse } from '@angular/common/http'
import { ErrorHandler, Injectable, Injector } from '@angular/core'; //Como vou usar injeção de dependencia, vou trazer o Injectable
import { Router } from '@angular/router';

@Injectable()
export class TratadorErro extends ErrorHandler { //Estou extendendo uma classe do angular chamada ErrorHandler

    /*Se tivesse algum serviço de notificação e quisesse implementar no errorHandler. Eu o puxaria pelo injetor (veja o authInterceptor, lá tem uma explicação melhor). Mas não poderia de esquecer...
    ...de, dentro do construtor, colocar o super(). Pra ativar o construtor da classe ErrorHandler.
    Assim: */

    constructor(private injetor: Injector ) {
        super() //Como dito acima, o super deve ser chamado por causa do construtor da classe ErrorHandler
    }

    handleError(errorResponse: Response | any) { //Estou sobreescrevendo o método handleError que já contém na classe ErrorHandler
        //Aí o método do serviço de notificação seria usado aqui dentro. Se fosse pra colocar pra aparecer uma notificação, colocaria-se aqui.
        
        //Eu poderia puxar o serviço de notificação aqui (não literalmente aqui, dentro deste if abaixo, em alguns dos casos) pelo injetor (VEJA A PORRA DO AUTHINTERCEPTOR ./auth.interceptor.ts PARA ENTENDER)
        if (errorResponse instanceof HttpErrorResponse) { //Se a var errorResponse for mesmo uma instancia de HttpErrorResponse
            //Se o backend enviar uma mensagem junto com o erro, podemos salvá-la em uma constante assim:
            //const mensagem = errorResponse.error.message
            switch (errorResponse.status) { //Aqui estou pegando o status (codigo) do erro e exibindo umas mensagens conforme
                case 401://401 é onde você tenta acessar uma página que precisa de alguma autentificação, mas não mandamos nada.
                    //Então vou mandar pra página de login
                    this.injetor.get(Router).navigate(['/login'])//Aqui estou injetando o serviçoRouter pra mandar pra página de login
                    break;
                case 403:
                    alert('403: Não autorizado') //Ou coloque a constante mensagem se souber que o backend envia uma
                    //Ou se tivesse o serviço de notificação
                    //this.notificacao.notifique("Não autorizado")
                    break;
                case 404:
                    alert('404: Não encontrado')
                    break;
            }
        }
        //PROVOQUE UM ERRO HTTP (altere a URL de algum dos serviços) PROPOSITALMENTE PARA VER O ERRORHANDLER ATUANDO, QUE BONITO, QUE BELEZA.

        //O método original (da classe ErrorHandler) já tem um esquema de tratar o erro e exibir no console. Então poderia fazer isso aqui para chamá-lo
        super.handleError(errorResponse)
    }
}