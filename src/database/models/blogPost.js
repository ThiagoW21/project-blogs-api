module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: {
      foreignKey: true,
      type: DataTypes.INTEGER,
    },
    published: sequelize.literal("CURRENT_TIMESTAMP"),
    updated: sequelize.literal("CURRENT_TIMESTAMP"), 
  }, {
    createdAt: 'published',
    updatedAt: 'updated'
  })

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User,
      { foreignKey: 'userId', as: 'user' })
  }

  return BlogPost;
}