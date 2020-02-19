'use strict'

const Express = require('express')
const Cors = require('cors')

const Mongoose = require('mongoose')
const env = process.NODE_ENV || 'development'
const BodyParser = require('body-parser')
const config = require('./Config.json')[env]

const usuario = require('./models/Usuario')

class App{

    constructor(){
        this.app
    }

    init(){
        //Instanciar o objeto do Express
        this.app = Express()

        this.app.use(BodyParser.json())

        this.app.use(Cors())

        //chamando o DB
        // Mongoose.connect( { useNewUrlParser: true})
        Mongoose.connect(`mongodb+srv://${config.db.user}:${config.db.password}@${config.db.url}/${config.db.name}`, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => console.log('ok!'))
            .catch(err => console.error(err));

        //Chamando as entidades (inserir aqui todas as entidades: cliente, usuário, departamentos, etc...)
        new usuario()

        //Importando as rotas (inserir aqui todas as rotas das entidades: clienteRota, usuárioRota, etc...)
        const usuarioRoute = require('./routes/UsuarioRoute')

        //instanciando o objeto responsável por definir as rotas (instanciar aqui todas os objetos que 
        // definem as rotas)
        new usuarioRoute(this.app)

        //Define a rota e o handler da rota raiz (/) da API
        this.app.get('/', function(req, res){
            res.send('Seja bem-vindo a API da Loja HT!!')
        })

        //Listener
        this.app.listen( config.port, function(){
            console.log('API ouvindo porta ' + config.port)

        })

    }
    
}

new App().init()