import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

//Componente criado somente para reunir alguns exemplos simples de formulários e como fazê-los. Ex: input radio, checkbox, etc.
@Component({
    selector: 'app-formulario',
    templateUrl: './formulario.component.html',
    styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

    formulario: FormGroup

    constructor() { }

    ngOnInit() {
        this.formulario = new FormGroup({
            nome: new FormControl(null, [Validators.required, Validators.minLength(4)]),
            cpf: new FormControl(null, [Validators.required, Validators.pattern('[0-9]{11}')]), //Com este pattern, posso valizar facilmente o CPF. O [0-9] indica que...
                //...deve receber somente números, e o {11} indica que deverá receber 11 números, nem mais nem menos

            //input de radio
            sexo: new FormControl(null, Validators.required), //Pra deixar um valor padrão, é só colocá-lo no lugar de null.
            //...Se eu não quisesse um valor padrão, deixaria null.

            viagem: new FormControl(false),//Se quiser colocar um validator para obrigar a marcar o check, basta colocar: Validators.requiredTrue
            
            //E por último, um FormGroup dentro de outro FormGroup
            endereco: new FormGroup({
                rua: new FormControl(null),
                numero: new FormControl(null, Validators.pattern('[0-9]*')),
                bairro: new FormControl(null)
            })
        })
    }

    validacaoClass(input: any) {
        if(input.valid && (input.dirty || input.touched))
            return 'is-valid'
        else if (!input.valid && (input.dirty || input.touched))
            return 'is-invalid'
    }

    visualizarForm() {
        console.clear()
        console.log(this.formulario)
    }

}
