module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define('Log', {
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
    userId: {
      field: 'user_id',
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    exchangeTime: {
      field: 'exchange_time',
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },{
    tableName: 'log',
    timestamps: false,
  });

  Log.associate = (models) => {
    models.Log.belongsTo(models.Board, {
      foreignKey: 'boardIdx',
    });

    models.Log.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  }

  return Log;
}