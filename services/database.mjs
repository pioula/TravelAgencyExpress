import { Sequelize, DataTypes } from 'sequelize';
import reservationModel from './reservation.mjs';
import tripModel from './trip.mjs';

// Połączenie z bazą danych
const sequelize = new Sequelize('postgres', 'postgres', 'admin', {
    host: 'localhost',
    dialect: 'postgres'
  });

const getDatabase = () => {
    sequelize.authenticate()
      .then(() => {
        console.log('Connection to the database has been established successfully.');
        const db = {};
        db.sequelize = sequelize;
        
        db.Trip = tripModel(sequelize, Sequelize, DataTypes);
        db.Reservation = reservationModel(sequelize, Sequelize, DataTypes);
        
        db.Trip.hasMany(db.Reservation, {
          foreignKey: {
            allowNull: false,
            name: 'tripId'
          }
        });
        db.Reservation.belongsTo(db.Trip);
        db.sequelize.sync();
        return db;
      })
      .catch((err) => console.log(err));
};

await getDatabase();

export default getDatabase;