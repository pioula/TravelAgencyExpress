import { Sequelize, DataTypes, Op } from 'sequelize';
import reservationModel from './reservation.mjs';
import tripModel from './trip.mjs';

// Połączenie z bazą danych
const sequelize = new Sequelize('TravelAgency', 'postgres', 'admin', {
    host: 'localhost',
    dialect: 'postgres'
  });

const getDatabase = () => {
    return sequelize.authenticate()
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
        return db.sequelize.sync().then(() => db);
      })
      .catch((err) => console.log(err));
};

//- img title offer_description price id
let trips = await getDatabase()
  .then((db) => db.Trip.findAll({
    attributes: ['id', 'title', 'offer_description', 'img', 'price', 'beg_date', 'end_date'],
    where: {
      beg_date: {
        [Op.gt]: new Date(),
      }
    },
    order: sequelize.col('beg_date'),
  }))
  .then((trips) => trips.map((val, _ind) => val.dataValues));

console.log(trips);

export default getDatabase;