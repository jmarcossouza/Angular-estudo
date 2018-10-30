import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { PagNaoEncontradaComponent } from './pag-nao-encontrada/pag-nao-encontrada.component';
import { PostsComponent } from './posts/posts.component';
import { PostDetalhesComponent } from './post-detalhes/post-detalhes.component';
import { AdicionarPostComponent } from './adicionar-post/adicionar-post.component';
import { TesteLogadoComponent } from './usuario/teste-logado/teste-logado.component';

export const ROUTES: Routes = [ //Constante responsável pelas rotas do projeto
    {path: '', component: HomeComponent}, //Quando o caminho for vazio vai redirecionar para o componente home
    {path: 'posts', component: PostsComponent},
    {path: 'posts/:id', component: PostDetalhesComponent}, //indica-se parâmetros com ':'. Como pode ver no 'id'
    {path: 'add-post', component: AdicionarPostComponent},
    {path: 'sobre', loadChildren: './sobre/sobre.module#SobreModule'}, /*Aqui estou indicando um lazy loading. Só que tem um porém: 
    ...Eu não estou mais carregando o componente, e sim um módulo inteiro. Então eu preciso ir no meu module novo sobre e indicar quem 
    ...vai ser o 'padrão' de carregamento, no caso ele mesmo. (veja sobre.module)*/
    {path: 'login', loadChildren: './usuario/login/login.module#LoginModule'},
    {path: 'teste-logado', component: TesteLogadoComponent},
    {path: '**', component: PagNaoEncontradaComponent} //Os ** são para quando o usuário tentar entrar em uma página não existente
]