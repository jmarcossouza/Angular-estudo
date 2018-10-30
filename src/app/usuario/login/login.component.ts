import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Usuario } from '../usuario.model'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  //Criei este objeto usuario só pra salvar a resposta do token e mostrar na tela
  usuario: Usuario

  constructor(private formBuilder: FormBuilder, private loginService: LoginService) { }
  

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
	  							.subscribe(usuario => this.usuario = usuario)
  }
}
