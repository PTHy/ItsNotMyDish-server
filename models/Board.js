module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define('Board', {
    idx: {
      field: 'idx',
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      field: 'user_id',
      type: DataTypes.STRING(50),
      allowNull: false, 
    },
    content: {
      field: 'content',
      type: DataTypes.STRING(255),
    },
    uploadDate: {
      field: 'upload_date',
      type: DataTypes.STRING(50),
      defaultValue: DataTypes.NOW,
    },
    dishImage: {
      field: 'dish_image',
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


  return Board;
}