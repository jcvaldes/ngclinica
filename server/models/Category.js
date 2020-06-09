export default (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  }, {
    timestamps: false,
  });
  Category.associate = (models) => {
    // 1:1
    Category.hasOne(models.Appointment, {
      foreignKey: 'CategoryId'
    });
  };

  return Category;
};
