module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('comment', {
    idx: {
      field: 'idx',
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    boardIdx: {
      field: 'board_idx',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      field: 'content',
      type: DataTypes.STRING(255),
    },
    dishImage: {
      field: 'dish_image',
      type: DataTypes.STRING(50),
    },
    userId: {
      field: 'user_id',
      type: DataTypes.STRING(50),
      allowNull: false, 
    },
    uploadDate: {
      field: 'upload_date',
      type: DataTypes.STRING(50),
      defaultValue: DataTypes.NOW,
    }
  }, {
    tableName: 'comment',
    timestamps: false,
  });

  return Comment
}