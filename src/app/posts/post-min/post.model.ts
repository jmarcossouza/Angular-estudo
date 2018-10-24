//Esta é uma interface para auxiliar na organização dos dados que serão recebidos da backend. No caso os posts
export interface Post {
    /*Muito importante: os nomes das variáveis devem estar iguais as 'keys' dos posts. Não é como eu quero
    Exemplo: No Json onde estou pegando esses dados, tem la:
    {
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    }
    Então os nomes das variáveis aqui no módulo devem ser iguais aos que a api vai retornar*/
    id: number
    userId: number
    title: string
    body: string
}