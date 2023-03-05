module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define("message", {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        currentChatReceiverId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
    });

    return Message
};