const db = require("../../models/index");
const {Op} = require('sequelize');

module.exports = (app) => {
    app.get('/api/messages', (req, res) => {
        if(req.query.question) {
            const question = req.query.question;
            return db.message.findAndCountAll({
                where: {
                    content: {
                        [Op.like]: `%${question}%`
                    }
                },
                order: ['createdAt']
            })
            .then(({count, rows}) => {  // number result and the result you solicit
                const message = `Il y a ${count} messages qui correspondent au terme de recherche ${question}.`;
                res.json({message, data: rows})
            })
        }
        else {
            db.message.findAll({order: ['createdAt']})
            .then(data => {
                const message = 'Liste des messages.';
                return res.json({message, data});
            })
            .catch(error => {
                const message = `La liste des messages n'a pas pu être récuperée. Réessayez dans quelques instants.`;
                return res.status(500).json({message: message, data: error});
            })
        }     
    })
}