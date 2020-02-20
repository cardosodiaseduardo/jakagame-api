'use strict'

const mongoose =  require('mongoose')
const usuario =  mongoose.model('Usuario')
mongoose.set('useFindAndModify', false)


class usuarioController{

    static async buscarUsuarios(req, res){
        try{
            res.json(await usuario.find({}))
        }catch(error){
            console.log("Erro ao buscar os alunos, o erro é: " + error)
            res.status(500).send("Erro ao buscar USUÁRIOS!")
        }
    }

    static async buscarUsuarioPorId(req, res){
        try{
            let _id = req.body._id
            let usuarioEncontrado = await usuario.findOne({ _id })
            res.status(200).json(usuarioEncontrado)
        } catch(error){
            res.status(500).send("Erro ao buscar usuario com id especificado!")
        }
            
    }

    static async autenticarLogin(req, res){
        try{
            let email = req.body.email
            let senha = req.body.senha

            let existeUsuario = await usuario.findOne({ email, senha });
            
            if(existeUsuario == null){
                res.send("Usuario não encontrado")
            } else {
                res.status(200).send(existeUsuario)
            }

        }catch(error){
            console.log(error)
            res.status(500).send("Erro na autenticação do Usuario!")
        }
    }

    static async adicionarUsuario(req, res){
        try{
            let email = req.body.email
            let usuarioJaEhCadastrado = await usuario.findOne({ email })
            
            if(usuarioJaEhCadastrado === {} || usuarioJaEhCadastrado === null || usuarioJaEhCadastrado === undefined){
                let novoUsuario = await usuario.create(req.body)
                res.status(200).json(novoUsuario)
            }
            else {
                res.status(200).send("Usuario já cadastrado")
            }

        } catch(error){
            console.log("Erro ao salvar usuario: " + error)
            res.status(500).send("Algum erro inesperado ocorreu, por favor, informe o adm!")
        }
    }

    static async deletarUsuario(req, res){
        try{
            let resultado = await usuario.findByIdAndDelete(req.body)
            res.status(200).json(resultado)
        } catch(error){
            res.status(500).send("Erro ao deletar USUÁRIO!")
        }
    }

    static async editarUsuario(req, res){
        try{
            let email = req.body.email
            let senha = req.body.senha
            
            let usuarioAEditar = await usuario.findOne({ email, senha })
            
            let usuarioEditado = await usuario.findByIdAndUpdate(usuarioAEditar._id, req.body)
            let _id = usuarioEditado._id
            
            let novoUsuario = await usuario.findOne({ _id })
            
            res.status(200).json(novoUsuario)
        }catch(error){
            res.status(500).send("Erro ao editar Usuario!")
        }
    }

    static async contagemDeVezesJogadas(req, res){
        try{
            
            let _id = req.body._id
            let usuarioNovo = await usuario.findById( _id )
            usuarioNovo.contador = usuarioNovo.contador + 1
            let usuarioContado = await usuario.findByIdAndUpdate(_id, usuarioNovo)
            console.log("usuarioContado é: " + JSON.stringify(usuarioContado))
            res.status(200).json(usuarioContado)
        }catch(error){
            console.log(error)
            res.status(500).send("Erro ao fazer contagem das vezes jogadas, informe ao adm!")
        }

    }

}

module.exports = usuarioController