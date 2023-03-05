const db = require("../../models/index");

module.exports = (app) => {
    app.get('/api/conversations/', (req, res) => {
        db.conversation.findAll()
        .then(data => {
            const message = 'Liste des conversations.';
            return res.json({message, data});
        })
        .catch(error => {
            const message = `La liste des conversations n'a pas pu être récuperée. Réessayez dans quelques instants.`;
            return res.status(500).json({message: message, data: error});
        })
    })
}