module.exports = (sequelize, DataTypes) => {
  const BoardLog = sequelize.define('BoardLog', {
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
    uploadDate: {
      field: 'upload_date',
      type: DataTypes.STRING(50),
      defaultValue: DataTypes.NOW,
    }
  })
}