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
    email: {
      field: 'email',
      type: DataTypes.STRING(50),
    },
    name: {
      field: 'name',
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    location: {
      field: 'location',
      type: DataTypes.STRING(50),
      allowNull: false,
    }
    
  });
}