const fs = require('fs')

const lerArquivoETransformarJsonParaArray = (caminhoArquivo) => {
    // obtendo os dados do arquivo src/dados/usuarios.json
    let dadosUsuarios = fs.readFileSync(caminhoArquivo)

    // transformando o json que obtemos em array
    let dadosUsuariosArray = JSON.parse(dadosUsuarios)

    return dadosUsuariosArray
}

const escreverNoArquivo = (caminhoArquivo, texto) => {
    // escrever o conteudo no arquivo dados/usuarios.js
    fs.writeFileSync(caminhoArquivo, texto)
}

module.exports = {
    lerArquivoETransformarJsonParaArray,
    escreverNoArquivo
}