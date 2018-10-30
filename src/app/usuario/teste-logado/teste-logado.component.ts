import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-teste-logado',
  templateUrl: './teste-logado.component.html'
})

//Componente criado com o intúito de testar o login, ele vai acessar o loginService e mostrar se está logado ou não utilizando o método declarado naquele service
export class TesteLogadoComponent implements OnInit {

  //Apesar de parecer que estou criando uma nova instancia do loginService, eu estou utilizando a mesma instancia em todo o projeto.
  //É meio dificil de entender, mas eu estou conseguindo acessar a mesma instancia que contém a variável com o token do usuario logado
  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

}
