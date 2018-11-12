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

  Comments.associate = (models) => {
    models.Comments.belongsTo(models.Board, {
      foreignKey: 'boardIdx',
    });

    models.Comments.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  }

  Comments.getComments = (boardIdx) => Comments.findAll({
    attributes: [
      'idx',
      'board_idx',
      'content',
      'dish_image',
      'user_id',
      'upload_date'
    ],
    where: {
      board_idx: boardIdx
    },
    raw: true,
  });

  return Comments
}