import { Sequelize, DataTypes, Op } from 'sequelize';
import reservationModel from './reservation.mjs';
import tripModel from './trip.mjs';
import userModel from './user.mjs';

// // Połączenie z bazą danych
export let sequelize = new Sequelize('TravelAgency', 'postgres', 'admin', {
    host: 'localhost',
    dialect: 'postgres'
  });

// export let sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: './mydatabase.sqlite',
// });

const getDatabase = () => {
    return sequelize.authenticate()
      .then(() => {
        console.log('Connection to the database has been established successfully.');
        const db = {};
        db.sequelize = sequelize;
        
        db.Trip = tripModel(sequelize, Sequelize, DataTypes);
        db.Reservation = reservationModel(sequelize, Sequelize, DataTypes);
        db.User = userModel(sequelize, Sequelize, DataTypes);

        db.Trip.hasMany(db.Reservation, {
          foreignKey: {
            allowNull: false
          }
        });
        
        db.Reservation.belongsTo(db.Trip);

        db.User.hasMany(db.Reservation, {
          foreignKey: {
            allowNull: false
          },
        });

        db.Reservation.belongsTo(db.User);

        return db.sequelize.sync().then(() => db);
      })
      .catch((err) => console.log(err));
};

const db = await getDatabase();

export default db;