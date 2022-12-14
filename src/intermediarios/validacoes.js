const { lerArquivoETransformarJsonParaArray } = require("../utils/manipulaArquivo")

const validarCorpoCadastroEAtualizacaoDeUsuario = (req, res, next) => {
    const { nome, email, senha } = req.body

    if (!nome || nome == "") {
        return res.status(400).json({
            'mensagem': 'A propriedade nome não foi informada ou está vazia'
        })
    }

    if (!email || email == "") {
        return res.status(400).json({
            'mensagem': 'A propriedade email não foi informada ou está vazia'
        })
    }

    if (!senha || senha == "") {
        return res.status(400).json({
            'mensagem': 'A propriedade senha não foi informada ou está vazia'
        })
    }

    next()
}

const validarSeUsuarioExiste = (req, res, next) => {
    // obtendo o id informado como parametro na rota
    const { id } = req.params

    // obtendo o json e transformando para array
    let dadosUsuariosArray = lerArquivoETransformarJsonParaArray('src/dados/usuarios.json')

    // procurando o usuario atraves do metodo find
    let usuarioBuscado = dadosUsuariosArray.find(usuario => {
        return usuario.id == id
    })

    if (!usuarioBuscado) {
        return res.status(404).json({
            'mensagem': 'Usuário não encontrado'
        })
    }

    next()
}

module.exports = {
    validarCorpoCadastroEAtualizacaoDeUsuario,
    validarSeUsuarioExiste
}