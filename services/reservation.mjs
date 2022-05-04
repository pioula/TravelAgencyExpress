const reservationModel = (sequelize, Sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },     
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      tickets: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    }, {
      tableName: 'Reservations'
    });

    return Reservation;
};   

export default reservationModel;