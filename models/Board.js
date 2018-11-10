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
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    isFinish: { 
      field: 'is_finish',
      type: DataTypes.INTEGER,
      defaultValue: 0,
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
  }, {
    tableName: 'board',
    timestamps: false,
  });

  Board.associate = (models) => {
    models.Board.belongsTo(models.User,{
      foreignKey: 'userId',
    });
    models.Board.hasMany(models.Comments, {
      foreignKey: 'boardIdx',
    });
    models.Board.hasMany(models.Log, {
      foreignKey: 'boardIdx',
    });
  }

  Board.soldOut = (boardIdx) => Board.update({
    isFinish: 1,
  }, {
    where: {
      idx: boardIdx
    },
  });

  Board.getBoard = (boardIdx) => Board.findOne({
    where: {
      idx: boardIdx,
    },
    raw: true,
  });

  Board.getBoardList = (models) => Board.findAll({
    attributes: [
      [models.sequelize.literal('(SELECT name FROM user WHERE user.id = board.user_id)'), 'user_name'],
      'content',
      'upload_date',
      'is_finish',
      'dish_image',
      'lat',
      'lng',
    ],
    raw: true,
  });


  return Board;
}