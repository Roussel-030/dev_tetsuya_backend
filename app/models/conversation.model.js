module.exports = (sequelize, Sequelize) => {
    const Conversation = sequelize.define("conversation", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      titre: { 
        type: Sequelize.STRING,
        allowNull: false,
      },
      question: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ue: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      users: {
        type: Sequelize.STRING,
        unique: true,
      },
    });

    return Conversation
};