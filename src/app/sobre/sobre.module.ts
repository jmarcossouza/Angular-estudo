import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

import {SobreComponent} from './sobre.component'

const ROUTES: Routes = [ //Tenho que criar as rotas novamente
  {path: '', component: SobreComponent} //Indicando quem iniciará de carregamento 'padrão'. COmo só tenho um componente, vou indicar ele mesmo
  //Obs: estas rotas estão como filhas de /sobre/. Então por isso o path vazio, porque quando não houver nada depois de /sobre ele vai encaminhar para SobreComponent
]

@NgModule({
  declarations:[SobreComponent],
  imports: [RouterModule.forChild(ROUTES)] //No modulo raiz, tivemos que importar as referencias daquele módulo, aqui devemos fazer a mesma coisa, e vamos passar essa ROUTE
  //...indicando quem são as rotas a partir deste módulo
})
export class SobreModule {}