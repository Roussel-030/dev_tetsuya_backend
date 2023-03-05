module.exports = (sequelize) => {
    const UserToConversation=sequelize.define("userToConversation");
    
    return UserToConversation
};