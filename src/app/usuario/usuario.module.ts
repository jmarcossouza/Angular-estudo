import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common' //Tive que importar este CommonModule pra funcionar o ngIf
import {RouterModule, Routes} from '@angular/router'
//Como inventei de criar este módulo separado para lazy loading, tenho que importar todos os negócios fdos forms por ele
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { LoginComponent} from './login/login.component'
import { InputComponent } from '../shared/input/input.component'

const ROUTES: Routes = [ //Tenho que criar as rotas novamente
  {path: '', component: LoginComponent} //Indicando quem iniciará de carregamento 'padrão'. COmo só tenho um componente, vou indicar ele mesmo
  //Obs: estas rotas estão como filhas de /sobre/. Então por isso o path vazio, porque quando não houver nada depois de /sobre ele vai encaminhar para SobreComponent
]

@NgModule({
  declarations:[LoginComponent, InputComponent],
  imports: [RouterModule.forChild(ROUTES), //No modulo raiz, tivemos que importar as referencias daquele módulo, aqui devemos fazer a mesma coisa, e vamos passar essa ROUTE
    //...indicando quem são as rotas a partir deste módulo
    FormsModule, 
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [ //Esse exports eu não entendi completamente, mas pelo que entendi, estou exportando os componentes ou módulos que podem ser usados por outros módulos que importem este. Acho que eles devem importar este módulo
    InputComponent, 
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class UsuarioModule {}