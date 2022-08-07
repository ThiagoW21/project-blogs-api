module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', 
  {
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    categoryId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
  }, {
    timestamps: false,
    tableName: 'PostCategories'
  })

  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, { 
      as: 'post',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId'
    });
    models.BlogPost.belongsToMany(models.Category, { 
      as: 'categories',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId'
    });
  };

  return PostCategory;
}