import { Component, OnInit } from '@angular/core';
import { LoginService } from '../usuario/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  //Agora eu sei se está logado ou não. Veja teste-logado.component e login.service para entender melhor como funciona
  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  deslogar() { //método para chamar o método deslogar do loginService
      this.loginService.deslogar()
  }
}
