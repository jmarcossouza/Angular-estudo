import { EventEmitter } from '@angular/core';

export class NotificacaoService {
    //O EventEmitter cria meio que um esquema de publish e subscribe, ou seja, alguem vai emitir aqueles eventos e alguem vai se inscrever...
    //...para ouvir os eventos. Como eu não sei quem estará publicando o evento, eu criei este serviço pra isso

    notificador = new EventEmitter<string>() //vai emitir um objeto do tipo
    
    //este método que vai receber a mensagem e usar o EventEmitter pra emití-la
    notificar(mensagem: string) {
        this.notificador.emit(mensagem)
    }
}