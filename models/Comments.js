module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define('Comments', {
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
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  }, {
    tableName: 'comments',
    timestamps: false,
  });

  Comments.getComments = (boardIdx) => Comments.findAll({
    where: {
      boardIdx
    }
  });

  return Comments
}