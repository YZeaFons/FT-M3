const express = require("express");

let publications = [];
let id = 1;

const server = express();

server.use(express.json());

server.post('/posts', (req, res) => {
    const { author, title, contents } = req.body
    if (author && title && contents) {
        publications.push({
            id: id,
            author: author,
            title: title,
            contents: contents
        })
        id++
        res.status(200).json(publications.filter(pub => pub.id === (id - 1)))
    }
    res.status(404).json({ error: "No se recibieron los parámetros necesarios para crear la publicación" })
})

server.get('/posts', (req, res) => {
    const { title, author } = req.query
    const newArr = publications.filter(pub => pub.author === author && pub.title === title)
    if (newArr.length) res.status(200).json(newArr)
    else res.status(404).json({ error: "No existe ninguna publicación con dicho título y autor indicado" })
})

server.get('/posts/:author', (req, res) => {
    const newArr = publications.filter(pub => pub.author === req.author)
    if (newArr.length) res.status(200).json(newArr)
    else res.status(404).json({ error: "No existe ninguna publicación del autor indicado" })
})

server.put('/posts/:id', (req, res) => {
    const arrSol = publications.filter(pub => pub.id === req.id)
    if (arrSol.length) {
        const { title, contents } = req.body
        if (title && contents) {
            const index = publications.findIndex(pub => pub.id === req.id)
            publications[index].title = title
            publications[index].contents = contents
            res.status(200).json(publications[index])
        } else res.status(404).json({ error: "No se recibieron los parámetros necesarios para modificar la publicación" })

    } else res.status(404).json({ error: "No se recibió el id correcto necesario para modificar la publicación" })
})

server.delete('/posts/:id', (req, res) => {
    if (req.id) {
        const index = publications.findIndex(pub => pub.id === req.id)
        if (index) {
            publications.splice(index, 1)
            res.status(200).json({ success: true })
        } else res.status(404).json({ error: "No se recibió el id de la publicación a eliminar" })

    } else res.status(404).json({ error: "No se recibió el id correcto necesario para eliminar la publicación" })

})

// server.get('/', (req, res) => {
//     const objet = {
//         respuesta: 'Hola mundo'
//     }
//     res.status(200).json(objet)

// })

//NO MODIFICAR EL CODIGO DE ABAJO. SE USA PARA EXPORTAR EL SERVIDOR Y CORRER LOS TESTS
module.exports = { publications, server };
