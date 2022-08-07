module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Category', {
    id:{
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: DataTypes.STRING,
  }, {
    timestamps: false,
    tableName: 'Categories'
  });
};
