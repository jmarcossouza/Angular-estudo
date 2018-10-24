import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ROUTES } from './app.rotas';
import { PagNaoEncontradaComponent } from './pag-nao-encontrada/pag-nao-encontrada.component';
import { PostsService } from './posts/posts.service';
import { PostsComponent } from './posts/posts.component';
//Pra usar o httpClient você deve importá-lo aqui na raiz.
import { HttpClient } from '@angular/common/http'
//Assim como importar esse Module
import { HttpClientModule } from '@angular/common/http';
import { PostMinComponent } from './posts/post-min/post-min.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    PagNaoEncontradaComponent,
    PostsComponent,
    PostMinComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, //Colocar o HttpClientModule aqui também
    RouterModule.forRoot(ROUTES) //como estamos no componente principal, usa-se o forRoot, mas se fosse outro componente, usaria-se o forChild
  ],
  //Todo serviço tem que estar em algum provider, se for fazer um módulo separado para carregar as coisas, deve-se colocar os serviços la
  providers: [PostsService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
