import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, } from '@angular/animations';
import { NotificacaoService } from './notificacao.service';
import { tap, switchMap } from 'rxjs/operators';
import { timer } from 'rxjs';

@Component({
    selector: 'app-notificacao',
    templateUrl: './notificacao.component.html',
    styleUrls: ['./notificacao.component.css'], //Veja o css

    animations: [ //Nenhum segredo aqui, animações
        trigger('amostrar', [
            state('escondido', style({
                opacity: 0,
                bottom: '0px'
            })),
            state('amostrado', style({
                opacity: 1,
                bottom: '25px'
            })),
            transition('escondido => amostrado', [
                animate('400ms')
            ]),
            transition('amostrado => escondido', [
                animate('400ms')
            ]),
        ]),
    ]
})
export class NotificacaoComponent implements OnInit {

    mensagem: string //var que contém a mensagem a ser exibida no alerta de notificação

    estadoAlerta: string = 'escondido' //var do estado da animação

    constructor(private notificacaoService: NotificacaoService) { } //Puxar o notificacaoServico com o EventEmitter

    ngOnInit() { //O momento ideal para eu me "inscrever" no Emitter do notificacaoService é aqui no OnInit.
        //Acho que entendi o esquema do Emitter, alguém está publicando a mensagem, e eu estou me "inscrevendo" (não é subscribe, veja abaixo) nela aqui, quando alguém...
        //...publicar uma mensagem lá, eu vou pegar a mensagem aqui e mostrá-la na notificacao

        this.notificacaoService.notificador.pipe(
                    tap(mensagem => {//Aqui, como explicado, estou fazendo a ação quando chega a mensagem, porém com o do (que agora virou tap)...
                        //...A diferença é que o tap permite eu fazer a ação no momento em que chega a mensagem. O subscribe coloca um listener no Observable e, só a partir...
                        //...daquele ponto é que o Observable vai me notificar.
                        this.mensagem = mensagem
                        this.amostrar()
                    }), 
                    switchMap(mensagem => timer(2000))//O switchMap, faz algo um pouco parecido com o Map. O Map pega as resposta Http e as transforma em json pra nós, o switchMap faz a transformação com...
                        //...Observables. Então eu estava recebendo a mensagem no primeiro ponto, e com o switchMap vou trocar isso para um timer de X segundos.
                    ).subscribe(timer => this.esconder())//Agora, finalmente tem-se o subscriber que vai esperar o timer finalizar e escoder o elemento
    }

    //Métodos relcionados a animação
    amostrar() {
        this.estadoAlerta = 'amostrado'
    }

    esconder() {
        this.estadoAlerta = 'escondido'
    }


}
