module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id:{
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    timestamps: false,
    tableName: 'Users'
  })

  User.associate = (models) => {
    User.hasMany(models.BlogPost,
      { foreignkey: 'userId', as: 'user' })
    }

  return User;
}