const db = require("../../models/index");

module.exports = (app) => {
    app.post('/api/messages/', (req, res) => {
        db.message.create(req.body)
        .then(data => {
            const message = `Le message ${req.body.content} a bien été crée.`
            return res.json({message, data})
        })
        .catch(error => {
            const message = `Le message n\'a pas pu être ajouté. Réessayez dans quelques instants.`
            return res.status(500).json({message, data: error})
        })
    })
}