import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { PagNaoEncontradaComponent } from './pag-nao-encontrada/pag-nao-encontrada.component';

export const ROUTES: Routes = [ //Constante responsável pelas rotas do projeto
    {path: '', component: HomeComponent}, //Quando o caminho for vazio vai redirecionar para o componente home
    {path: '**', component: PagNaoEncontradaComponent} //Os ** são para quando o usuário tentar entrar em uma página não existente
]