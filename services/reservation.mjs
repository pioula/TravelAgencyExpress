const reservationModel = (sequelize, Sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      tickets: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    }, {
      tableName: 'reservations'
    });

    return Reservation;
};   

export default reservationModel;