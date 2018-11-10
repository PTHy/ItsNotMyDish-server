module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      field: 'id',
      type: DataTypes.STRING(50),
      primaryKey: true,
      validate: {
        is: /^[0-9a-zA-Z]{4,20}$/,
      },
    },
    password: {
      field: 'passsword',
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    name: {
      field: 'name',
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      field: 'email',
      type: DataTypes.STRING(50),
    },
    lat: {
      field: 'lat',
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lng: {
      field: 'lng',
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  });

  User.associate = (models) => {
    models.User.hasMany(models.Board, {
      foreignKey: 'userId',
    }); 
  };

  return User;
}