import { Transaction } from "sequelize";
import Sequelize from "sequelize";

import { validationResult } from "express-validator";

import db, { sequelize } from "../services/database.mjs";

const bookController = {
  // localhost:port/book/6
  get: (req, res, next) => {
    db.Trip.findByPk(req.params.trip_id)
      .then((trip) => {
        if (trip === null || trip.beg_date < new Date()) {
          next(404);
        }
        else {
          res.status(200).render(
            'book',
            { trip_id: req.params.trip_id, errors: [] },
          );
        }    
      });
  },
  post: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).render(
        'book',
        { trip_id: req.params.trip_id, errors: errors.array() });
    }
    const t = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
    });
    
    let trip = await db.Trip.findByPk(req.params.trip_id, { transaction: t });  
        
    if (trip.tickets_left < req.body.tickets) {
      return res.status(400).render(
        'book',
        { trip_id: req.params.trip_id, errors: [{ param: 'tickets', msg: 'You are asking for too many tickets!'}] });
    } else {
      await db.Trip.update({ tickets_left: Sequelize.literal(`tickets_left - ${req.body.tickets}`) }, { where: { id: req.params.trip_id }, transaction: t });
      await db.Reservation.create({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        tickets: req.body.tickets,
        TripId: req.params.trip_id
      }, { transaction: t });
      await t.commit();
    }
    
    return db.Trip.findByPk(req.params.trip_id, {
      attributes: ['id', 'title', 'trip_description', 'img', 'beg_date', 'end_date']
      })
      .then((trip) => {
        if (trip === null) {
          next(404);
        }
        else {
          return res.status(200).render(
            'tripDescription',
            { trip_id: req.params.trip_id, trip: trip.dataValues, success: true },
          );
        }
      })
      .catch((err) => {
        next(500);
      });
  }
}
export default bookController;
