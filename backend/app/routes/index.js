const express = require('express')
const router = express.Router()
const routes = [
    {
        path: 'user'
    },
    {
        path: 'items'
    },
    {
        path: 'personal'
    },
    // {
    //     path: 'autenticar'
    // },
    {
        path: 'administrativo'
    },
    {
        path: 'upload'
    },
    {
        path: 'docente'
    },
    {
        path: 'imagen'
    },
    {
        path: 'delete'
    },
    {
        path: 'patio'
    },
    {
        path: 'video'
    },
    {
        path: 'televisor'
    },
    {
        path: 'pdfs'
    },
    {
        path: 'documento'
    },
    {
        path: 'words'
    },
    {
        path: 'solicitud'
    },
    {
        path: 'maestria'
    },
    {
        path: 'links'
    },
    {
        path: 'audio'
    },
    {
        path: 'funcion'
    },
    {
        path: 'directivo'
    }
]
routes.forEach(route => {
    return router.use(`/${route.path}`, require(`./${route.path}`))
})
module.exports = router