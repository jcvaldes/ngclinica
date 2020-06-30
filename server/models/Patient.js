export default (sequelize, DataTypes) => {
  const Patient = sequelize.define('Patient', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {timestamps: false});
  Patient.associate = (models) => {

    Patient.hasOne(models.Appointment, {
      foreignKey: 'PatientId',
    })
  };
  return Patient;
};
