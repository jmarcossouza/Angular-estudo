import { Component, OnInit } from '@angular/core';

import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

import { Mensagem } from './mensagem.model';

@Component({
    selector: 'app-mensagens',
    templateUrl: './mensagens.component.html',
    styleUrls: ['./mensagens.component.css']
})
export class MensagensComponent implements OnInit {

    constructor() { }

    //Variável da conexão com o negócio
    public _hubConnection: HubConnection;
    //Array que irá receber as mensagens
    msgs: Mensagem[] = [];

    ngOnInit() {
        //Acredito que isso tudo ficaria mais organizado em um serviço, mas vamos fazer aqui mesmo.
        //Criação da conexão, aqui devemos colocar o link do backend e o endenreço 'no caso /notify' que foi configurado lá pra construir essa "conexão"
        this._hubConnection = new HubConnectionBuilder().withUrl('http://localhost:50428/notify').build();
        this._hubConnection
            .start() //start
            .then(() => console.log('Conexão criada!')) //Se der certo vai mandar no console.
            .catch(err => console.log('Deu merda na conexão: ', err)); //Senão vai mandar isso aqui no console.

        //Esse BroadcastMessage é o método que vai "mandar" a mensagem. Ele está em uma interface chamada ITypedHubClient no backend
        this._hubConnection.on('BroadcastMessage', (nome: string, mensagem: string) => { //Após isso vamos receber as coisas e jogá-las no array msgs daqui.
            this.msgs.push({ nome: nome, mensagem: mensagem });
        });
    }

}
