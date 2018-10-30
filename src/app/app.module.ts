import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router'
//Para as animações
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
//Não esquecer de importar as rotas
import { ROUTES } from './app.rotas';
import { PagNaoEncontradaComponent } from './pag-nao-encontrada/pag-nao-encontrada.component';
import { PostsService } from './posts/posts.service';
import { PostsComponent } from './posts/posts.component';
//Pra usar o httpClient você deve importá-lo aqui na raiz.
import { HttpClient } from '@angular/common/http'
//Assim como importar esse Module
import { HttpClientModule } from '@angular/common/http';
import { PostMinComponent } from './posts/post-min/post-min.component';
import { PostDetalhesComponent } from './post-detalhes/post-detalhes.component';
import { AdicionarPostComponent } from './adicionar-post/adicionar-post.component';
//Módulo compartilhado. Veja-o
import { SharedModule } from './shared/shared.module';

//Tirei o componente sobre daqui para que o módulo raiz já não conheça ele e nem tente carregá-lo ao iniciar

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    PagNaoEncontradaComponent,
    PostsComponent,
    PostMinComponent,
    PostDetalhesComponent,
    AdicionarPostComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, //Colocar o HttpClientModule aqui também
    BrowserAnimationsModule, //Importar as animações
    //Módulo compartilhado, veja-o
    SharedModule.forRoot(),
    RouterModule.forRoot(ROUTES, {preloadingStrategy: PreloadAllModules}) //como estamos no componente principal, usa-se o forRoot, mas se fosse outro componente, usaria-se o forChild
    //Com os argumentos dentro do {} estamos dizendo para o angular recarregar todos os módulos em segundo plano. Para quando chegarmos em um componente
    //...que usa um módulo em lazy loading, ele não demorar pra carregar, já que não foi carregado junto com a aplicação.
  ],
  //Todo serviço tem que estar em algum provider, se for fazer um módulo separado para carregar as coisas, deve-se colocar os serviços la
  providers: [PostsService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
