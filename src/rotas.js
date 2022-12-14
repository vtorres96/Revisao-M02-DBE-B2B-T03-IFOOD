const express = require('express')

const rotas = express.Router()

const UsuarioControlador = require('./controladores/usuarioControlador')

const { 
    validarCorpoCadastroEAtualizacaoDeUsuario,
    validarSeUsuarioExiste
 } = require('./intermediarios/validacoes')
// Parâmetros de rota - req.params
//     parâmetros obrigatórios 
//     parâmetros opcionais

// Parâmetros de query / Query Params - req.query

// Entender a diferença entre eles dentro do código 
// O que muda para nós desenvolvedores de acordo com cada um ?
    // Os parâmetros de rota vem sempre anterior a ?
    // já os parâmetro de query vem posterior a ?
    // O query param é considerado um parâmetro opcional, já nos parâmetros de rota
    // devemos informar quando será opcional

// Parâmetros de rota - req.params
// Se for informado apenas o parâmetro numero1, retorná-lo
// Se for informado parâmetro numero2, iremos somar os dois números
rotas.get('/calculos/:numero1/:numero2?', (req, res) => {
    const { numero1, numero2 } = req.params

    if (numero2) {
        let soma = parseInt(numero1) + parseInt(numero2)
        return res.status(200).json(soma)
    }

    return res.status(200).json(numero1)
});

// Quando recebermos o parâmetro ?categoria teremos que filtrar somente os produtos daquela categoria
// caso não tenha produto relacionado a categoria informada,
// iremos retornar "Não existem produtos vinculados a esta categoria"
// E quando não for informado o parâmetro ?categoria, iremos retornar todos os produtos do array
rotas.get('/produtos', (req, res) => {
    const { categoria } = req.query
    let produtos = [
        {
            "id": 1,
            "descricao": "smartphone motorola moto g9",
            "categoria": "celulares"
        },
        {
            "id": 2,
            "descricao": "god of war 3",
            "categoria": "video game"
        },
        {
            "id": 1,
            "descricao": "camiseta nike seleção do Marrocos",
            "categoria": "esportes"
        }
    ]
    
    if (categoria) {
        let produtosFiltradosPorCategoria = produtos.filter(produto => {
            return produto.categoria == categoria
        })

        if (produtosFiltradosPorCategoria.length === 0) {
            return res.status(404).json({
                'mensagem': 'Não existem produtos vinculados a esta categoria'
            })
        }
        
        return res.status(200).json(produtosFiltradosPorCategoria)
    }

    return res.status(200).json(produtos)
});


rotas.get('/usuarios/listar', UsuarioControlador.listar)
rotas.post('/usuarios/cadastrar', validarCorpoCadastroEAtualizacaoDeUsuario, UsuarioControlador.cadastrar)
rotas.put('/usuarios/atualizar/:id', validarSeUsuarioExiste, validarCorpoCadastroEAtualizacaoDeUsuario, UsuarioControlador.atualizar)
rotas.delete('/usuarios/excluir/:id', validarSeUsuarioExiste, UsuarioControlador.excluir)

module.exports = rotas