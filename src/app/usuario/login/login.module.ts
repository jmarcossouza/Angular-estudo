import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

import { LoginComponent} from './login.component'
import { SharedModule } from 'src/app/shared/shared.module';

const ROUTES: Routes = [
  {path: '', component: LoginComponent}
]

@NgModule({
  declarations:[LoginComponent],
  imports: [RouterModule.forChild(ROUTES),
    //Aqui no SharedModule, já tem a declaração do inputComponent, FormsModule e etc
    SharedModule
  ]
})
export class LoginModule {}