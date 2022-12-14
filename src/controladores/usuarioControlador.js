const { v4: uuidv4 } = require('uuid')
const { 
    lerArquivoETransformarJsonParaArray,
    escreverNoArquivo
} = require('../utils/manipulaArquivo')

// obtendo o json e transformando para array
let dadosUsuariosArray = lerArquivoETransformarJsonParaArray('src/dados/usuarios.json')

const UsuarioControlador = {
    listar(req, res) {
        try {
            if (dadosUsuariosArray.length === 0) {
                return res.status(200).json({
                    'mensagem': 'Não temos usuários em nossa base de dados'
                })
            }
    
            return res.status(200).json(dadosUsuariosArray);
        } catch (error) {
            return res.status(400).json({
                'mensagem': `Erro no servidor ${error.message}`
            });   
        }
    },

    async cadastrar(req, res) {
        try {
            // criando um identificador unico para cada usuario no momento do cadastro
            let id = uuidv4()

            // criando o objeto usuario para padronizar os registros
            let usuario = { id, ...req.body }

            // adicionando objeto criado do novo usuario dentro do array de usuarios
            dadosUsuariosArray.push(usuario)

            // // transformando o array dadosUsuarios em uma string utilizando JSON.stringify
            let dadosUsuariosTexto = JSON.stringify(dadosUsuariosArray)

            escreverNoArquivo('src/dados/usuarios.json', dadosUsuariosTexto)

            return res.status(200).json(usuario)
        } catch (error) {
            return res.status(400).json({
                'mensagem': `Erro no servidor ${error.message}`
            })
        }
    },

    atualizar(req, res) {
        try {        
            // obtendo o id informado como parametro na rota
            const { id } = req.params
    
            // obtendo as propriedades enviadas no corpo da requisicao
            const { nome, email, senha } = req.body
         
            // procurando o usuario atraves do metodo find
            let usuarioBuscado = dadosUsuariosArray.find(usuario => {
                return usuario.id == id
            })
    
            usuarioBuscado.nome = nome 
            usuarioBuscado.email = email 
            usuarioBuscado.senha = senha
    
            // transformando o array dadosUsuariosArrayFiltrados em uma string utilizando JSON.stringify
            let dadosUsuariosTexto = JSON.stringify(dadosUsuariosArray)
    
            escreverNoArquivo('src/dados/usuarios.json', dadosUsuariosTexto)
    
            return res.status(200).json(usuarioBuscado)
        } catch (error) {
            return res.status(400).json({
                'mensagem': `Erro no servidor ${error.message}`
            })
        }

    },

    excluir(req, res) {
        try {
            // obtendo o id informado como parametro na rota
            const { id } = req.params

            // filtrando os usuarios que nao possuam o ID informado na rota
            // para assim conseguirmos remover o registro que deve ser excluido
            let dadosUsuariosArrayFiltrados = dadosUsuariosArray.filter(usuario => {
                return usuario.id != id
            })

            // transformando o array dadosUsuariosArrayFiltrados em uma string utilizando JSON.stringify
            let dadosUsuariosTexto = JSON.stringify(dadosUsuariosArrayFiltrados)

            escreverNoArquivo('src/dados/usuarios.json', dadosUsuariosTexto)
            
            return res.status(200).json({
                'mensagem': 'Usuário excluído com sucesso'
            })
        } catch (error) {
            return res.status(400).json({
                'mensagem': `Erro no servidor ${error.message}`
            })
        }
    },
}

module.exports = UsuarioControlador