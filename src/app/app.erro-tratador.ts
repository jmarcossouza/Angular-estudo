import { HttpErrorResponse } from '@angular/common/http'
import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core'; //Como vou usar injeção de dependencia, vou trazer o Injectable
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

            this.injetor.get(NgZone).run(() => {//Zonas. Isso aqui é mais ou menos assim: Digamos que eu queira mostrar uma notificação na tela ao dar erro que dure 3 segundos, se eu simplesmente implementá-la...
                //...aqui e não rodar dentro desta função que criei, ela provavelmente será exibida mas não desaparecerá depois. Isso significa que ela está fora das zonas (pesquisar melhor sobre isso) do angular...
                //...não sei explicar perfeitamente, mas zonas de execução tem a ver com os subscribes, o angular fica observando se houve alteração em algo, aí quando houver a alteração ele irá fazer o que está...
                //...'inscrito' naquela função ou propriedade. Aqui é o mesmo conceito: Minha notificação tem uma propriedade para sumir depois de x segundos, ela aparece e na hora de sumir o angular não está olhando..
                //...para aquela parte que mudou e está mandando sumir, está fora da zona. Então eu rodo as coisas dentro desta função pra resolver este problema. Não é obrigatório, é meio situacional, vai depender...
                //...do que estou usando. No meu caso aqui, não precisei disso (até porque nem implementei a notificação), mas estou colocando pra servir como exemplo.
                
                //Este switch que trata os status de erro que estava fora desta função run do NgZone, fica dentro dela.

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
            })
            
        }
        //PROVOQUE UM ERRO HTTP (altere a URL de algum dos serviços) PROPOSITALMENTE PARA VER O ERRORHANDLER ATUANDO, QUE BONITO, QUE BELEZA.

        //O método original (da classe ErrorHandler) já tem um esquema de tratar o erro e exibir no console. Então poderia fazer isso aqui para chamá-lo
        super.handleError(errorResponse)
    }
}