const reservationModel = (sequelize, Sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
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
      tableName: 'reservations'
    });

    return Reservation;
};   

export default reservationModel;