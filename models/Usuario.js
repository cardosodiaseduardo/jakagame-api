'use strict'

const mongoose = require('mongoose');

class usuario extends mongoose.Schema{

    constructor(){
        super({

            nome: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            senha: {
                type: String,
                required: true
            },
            contador: {
                type: Number
            }

        });

        //Registrando a criação do model no Mongoose
        mongoose.model('Usuario', this);
    }
}

module.exports = usuario