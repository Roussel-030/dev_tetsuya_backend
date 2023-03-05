const db = require("../../models/index");

module.exports = (app) => {
    app.delete('/api/messages/:id', (req, res) => {
      db.message.findByPk(req.params.id)
      .then(data => {
          if(data === null) {
              const message = `Le message demandé n'existe pas. Réessayez avec un autre identifiant.`
              return res.status(400).json({message})
          }
          else {
              const messageDeleted = data;
              return db.message.destroy({
                  where: { id: db.message.id }
              })
              .then(_ => {
                  const message = `Le message avec l'identifiant n°${messageDeleted.id} a bien été supprimé.`
                  res.json({message, data: messageDeleted })
              })
          }
      })
      .catch(error => {
          const message = `Le message n\'a pas pu être supprimé. Réessayez dans quelques instants.`
          res.status(500).json({message: message, data: error})
      })
    })
  }