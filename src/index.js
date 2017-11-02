import 'babel-polyfill'
import express from 'express'
import renderer from './helpers/renderer'
import createStore from './helpers/createStore'
import { matchRoutes } from 'react-router-config'
import Routes from './client/Routes'
const app = express()

app.use(express.static('public'))

app.get('*', (req, res) => {

    const store = createStore()

    const promises = matchRoutes(Routes, req.path).map(({ route }) => {
        return route.loadData ? route.loadData(store) : null
    })

    Promise.all(promises).then(response => {
        console.log(response)
        res.send(renderer(req, store))
    }).catch(e => {
        console.log(e)
        return res.status(500).send("error")
    })

})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})