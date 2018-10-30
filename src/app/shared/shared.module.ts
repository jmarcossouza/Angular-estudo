import {NgModule, ModuleWithProviders} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import {InputComponent} from './input/input.component'
import { LoginService } from '../usuario/login/login.service';

//Este módulo é um 'módulo compartilhado', mas ele não tem carregamento tárdio, ele meio que reune componentes que vários módulos usarão e os declara aqui
//Porém, para os outros módulos usarem os componentes (services, components) daqui, eles devem importar este SharedModule
@NgModule({
  declarations: [InputComponent],
  //Como aqui já está sendo importado o FormsModule, não preciso importar no módulo raiz.
  //Mesma cois com o InputComponent
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [InputComponent, CommonModule,
            FormsModule, ReactiveFormsModule ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers:[LoginService]
    }
  }
}