// importar dependência
const express = require('express');
const path = require('path');
const pages = require('./pages.js');

//iniciar o express
const server = express()
server

    //utilizar body da req
    .use(express.urlencoded({extended: true}))

    //utilizando arquivos estáticos
    .use(express.static('public'))

    // configurar template engine
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'hbs')

    // rotas da aplicação
    .get('/', pages.index)
    .get('/orphanage', pages.orphanage)
    .get('/orphanages', pages.orphanages)
    .get('/create-orphanage', pages.createOrphanage)
    .post('/save-orphanage', pages.saveOrphanage)


// ligar o servidor
server.listen(5500)