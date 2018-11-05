export interface Usuario {
    //Não esquecer que os nomes dos parâmetros daqui deverão ser os mesmos que os da backend
    name?: string, //Coloquei o name e email como opcionais. Porque senão terei que definí-los toda vez que for 'instanciar' este Usuario...
    //...(veja o login.service). E como a backend que estou usando não me retorna name ou email, é melhor assim.
    email?: string,
    token: string
}