import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
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
import { TesteLogadoComponent } from './usuario/teste-logado/teste-logado.component';
//Pra usar o serviço dos Cookies, temos que importá-lo e declará-lo na lista de providers de algum módulo
import { CookieService } from 'ngx-cookie-service';
//Componente só pra definir alguns exemplos para forms
import { FormularioComponent } from './formulario/formulario.component';
import { TratadorErro } from './app.erro-tratador';

import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthInterceptor } from './auth.interceptor';
import { MensagensComponent } from './websockets/mensagens/mensagens.component';

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
    AdicionarPostComponent,
    TesteLogadoComponent,
    FormularioComponent,
    MensagensComponent
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
  providers: [PostsService, HttpClient, CookieService,
                    //INTERCEPTOR
                    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}, /*Esta é a maneira que registramos um interceptor, todos são registrados dessa maneira e...
                    ...associados ao mesmo token HTTP_INTERCEPTORS. Este token (HTTP_INTERCEPTORS) terá mais de um valor, será 'multivalorado', então quando o angular for obter o..
                    ... valor deste token ele vai querer saber quais são os interceptors nós temos, então por isso o multi:true, exatamente para dizer: eu sei que este token tem...
                    ... mais de um valor, e eu quero que o meu interceptor faça parte da lista de valores deste token, chamado HTTP_INTERCEPTORS. Posso também registrar mais de...
                    ... um interceptor, se eu colocar dois interceptors, vai depender da ordem que eu coloquei, o que coloquei primeiro será chamado primeiro. */

                    {provide: ErrorHandler, useClass: TratadorErro}], //Essa putaria aqui é pra usar o 'token' ErrorHandler. Ou seja, eu vou chamar nos outros serviços e componentes...
                    //...como ErrorHandler, mas ele estará utilizando a classe TratadorErro.
  bootstrap: [AppComponent]
})
export class AppModule { }
