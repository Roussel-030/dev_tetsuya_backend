const db = require("../../models/index");

module.exports = (app) => {
    app.put('/api/messages/:id',auth, (req, res) => {
      const id = req.params.id
      db.message.update(req.body, {
        where: { id: id }
      })
      .then(_ => {
        return db.message.findByPk(id)
        .then(data => {
            if(data === null) {
                const message = `Le message demandé n'existe pas. Réessayez avec un autre identifiant.`
                res.status(404).json({message})
            }
            else {
                const message = `Le message ${data.content} a bien été modifié.`
                res.json({message, data })
            }
        })
      })
      .catch(error => {
        const message = `Le message n\'a pas pu être modifié. Réessayez dans quelques instants.`
        res.status(500).json({message: message, data: error})
      })
    })
}