const db = require("../../models/index");

module.exports = (app) => {
    app.post('/api/conversation/', (req, res) => {
        db.conversation.create(req.body)
        .then(data => {
            const message = `La conversation ${req.body.titre} a bien été crée.`
            return res.json({message, data})
        })
        .catch(error => {
            const message = `La conversation n\'a pas pu être ajouté. Réessayez dans quelques instants.`
            return res.status(500).json({message, data: error})
        })
    })
}