export default (sequelize, DataTypes) => {
  const Appointment = sequelize.define('Appointment', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    PatientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ProfessionalId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    appointmentDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
  // relaciones entre objetos
  Appointment.associate = (models) => {
    Appointment.belongsTo(models.Category, {
      foreignKey: 'CategoryId',
      targetKey: 'id',
    });
    Appointment.belongsTo(models.User, {
      foreignKey: 'UserId',
      targetKey: 'id',
    });
    Appointment.belongsTo(models.Professional, {
      foreignKey: 'ProfessionalId',
      as: 'professional',
      targetKey: 'id',
    });
  };

  return Appointment;
};
