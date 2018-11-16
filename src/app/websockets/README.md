#Websockets com SignalR

Aqui só está sendo explicado como implementar no Angular. Obviamente deve-se ter uma backend configurada e lá que fica a parte mais difícil, a do client-side é bem tranquilo.

Primeiramente deve-se instalar a ferramente de websockets que foi usada (no caso estou usando o da Microsoft pela compatibilidade com o asp.net)
npm install @aspnet/signalr --save

A WebAPI configurada e funcionando encontra-se em: 
https://github.com/jmarcossouza/asp.net.core-webapi-estudo

Tudo foi feito seguindo o tutorial:
https://medium.com/@rukshandangalla/how-to-notify-your-angular-5-app-using-signalr-5e5aea2030b2 (Foi mudada algumas coisas, pois o tutorial jaé antigo)

Doc da Microsoft (só que eu nem li essa merda.):
https://docs.microsoft.com/pt-br/aspnet/signalr/overview/getting-started/introduction-to-signalr