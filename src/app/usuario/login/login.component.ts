import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(private formBuilder: FormBuilder) { }
  

  ngOnInit() {
    this.loginForm = this.formBuilder.group(
      {
        //Aqui vão as propriedades que os inputs terão, suas validações, etc. Neste carro, o input se identificará como title
        usuario: this.formBuilder.control(/* Isto indica que vai começar com um value vazio */'', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
        senha: this.formBuilder.control(/* Isto indica que vai começar com um value vazio */'', [Validators.required, Validators.minLength(4), Validators.maxLength(16)])
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
}
