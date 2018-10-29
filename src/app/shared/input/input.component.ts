import { Component, OnInit, Input, ContentChild, AfterContentInit } from '@angular/core';
import { FormControlName } from '@angular/forms'

//Componente que vai tratar e lidar com as mensagens de validação dos inputs.
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit, AfterContentInit {

  //label que vai receber: o texto que aparece em icma do input, obviamente
  @Input() label: string
  //Aqui a mensagem de invalidez que vai receber, cada input tem uma mensagem de inválido. por isso estou recebendo-a por aqui
  @Input() mensagemInvalido: string

  //esta é a propriedade que representa o input. virá com as propriedades padrões de input do angular.
  input: any

  //ContentChild serve para indicar pro angular de onde é o elemento onde se quer pegar uma referência
  @ContentChild(FormControlName) control: FormControlName

  constructor() { }

  ngOnInit() {
  }

  //Este método vai ser chamado quando o conteúdo que vai ficar no lugar de <ng-content> for definido
  ngAfterContentInit() {
    this.input = this.control
    //verifar se existe uma tag FormCOntrolname la
    if (this.input === undefined)
      throw new Error('Esse componente precisa ser usado com uma diretiva formControlName')
  }

  //método que vai retornar true se o input prosseguir com as condições que estão dentro do método
  valido(): boolean{
    return this.input.valid && (this.input.dirty || this.input.touched) //Se o input for válido mesmo já estando dirty e touched (um deles acho que significa...
    //...que já foi tocado, o outro significa que já digitou algo dentro, nao lembro exatamente) O ponto é: Só vai acontecer se o cara já mexeu no input; isso evita...
    //..de já chegar mostrando o input como vermelho
  }

  //mesma coisa que o de cima, só que ao invés de válido, é o método para as classes inválidas (as clases que deixarão o input vermelho)
  invalido(): boolean {
    return this.input.invalid && (this.input.dirty || this.input.touched)
  }

}
