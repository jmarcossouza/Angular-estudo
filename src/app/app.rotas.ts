import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'

export const ROUTES: Routes = [ //Constante responsável pelas rotas do projeto
    {path: '', component: HomeComponent} //Quando o caminho for vazio vai redirecionar para o componente home
]