import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { NotificacaoService } from 'src/app/shared/notificacao/notificacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  //Como eu já estou guardando o token do usuário no login.service. Não preciso mais salvá-lo aqui

  //Este objeto que mostrará a mensagem na tela quando ele logar ou der errado
  //mensagem: string
  //Como eu implementei o notificacaoService, não vou usar mais esse método de merda.

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private notificacao: NotificacaoService) { }
  

  ngOnInit() {
    this.loginForm = this.formBuilder.group(
      {
        //Aqui vão as propriedades que os inputs terão, suas validações, etc. Neste carro, o input se identificará como title
        email: this.formBuilder.control(/* Isto indica que vai começar com um value vazio */'', [Validators.required, Validators.email, Validators.maxLength(60)]),
        senha: this.formBuilder.control(/* Isto indica que vai começar com um value vazio */'', [Validators.required, Validators.minLength(4), Validators.maxLength(32)])
      }
    )
  }

  //Este método foi meio que criado como um auxiliar, pra eivtar um código gigante dentro do ngClass do input
  inputValido(input: any) {
    return input.valid && (input.dirty || input.touched) //Se atender a essas exigências vai retornar true
    //No caso, se o input for válido, se é dirty e touched
  }

  //mesma coisa q acima, só que pro inválido
  inputInvalido(input: any) {
    return !input.valid && (input.dirty || input.touched)
  }

  login() {
	  //Chamando o método de login do LoginService e informado os valores email e senha do form daqui
	  this.loginService.login(this.loginForm.value.email, this.loginForm.value.senha)
	  							.subscribe(//Resposta de sucesso
                              usuario => this.notificacao.notificar(`Login realizado. Token: ${usuario.token}.`), //Vai chamar a notificação informando o sucesso do login
                              //Resposta de erro
                              object => this.notificacao.notificar(`Falha no login: ${object.error.message}.`) //Pela API eu sei que ele vai mandar um object com o parâmetro error, então já ocloquei pra exibílo
                              //O problema é que ele nunca vai exibir a mensagem de erro (a menos que eu nao mande a senha), porque a API do backend está configurada para receber qualquer valor como login e senha e dar sucesso
                              )
  }
}
