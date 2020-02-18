const usuario = require('../models/Usuario')
const usuarioController = require('../controllers/UsuarioController')

class usuarioRoute {
    constructor(app) {

        app.route('/usuarios')
            .get(usuarioController.buscarUsuarios)
            .post(usuarioController.adicionarUsuario)
            // .delete(alunoController.deletarAluno)
            // .put(alunoController.editar)

        app.route('/usuariologar')
            .post(usuarioController.autenticarLogin)

        app.route('/editarusuario')
            .post(usuarioController.editarUsuario)

        app.route('/usuarioporid')
            .post(usuarioController.buscarUsuarioPorId)

        // app.route('/deletaraluno')
            // .post(alunoController.deletarAluno)
        
        // app.route('/matricular')
            // .post(alunoController.matricularAluno)
    }
}

module.exports = usuarioRoute