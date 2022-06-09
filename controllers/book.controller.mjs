import { Transaction } from "sequelize";
import Sequelize from "sequelize";

import { validationResult } from "express-validator";

import db, { sequelize } from "../services/database.mjs";

const bookController = {
  // localhost:port/book/6
  get: (req, res, next) => {
    if (req.session.userMail) {
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
    } else {
      res.redirect('/login');
    }
  },
  post: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render(
        'book',
        { trip_id: req.params.trip_id, errors: errors.array() });
    }

    const t = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
    });
    
    let user = await db.User.findAll({
      where: {
        email: req.session.userMail ? req.session.userMail : '' 
      },
      transaction: t
    });
    if (user.length === 0) {
      await t.rollback();
      return res.redirect('/register');
    }

    let trip = await db.Trip.findByPk(req.params.trip_id, { 
      transaction: t, 
      lock: { of: db.Trip } ,
    });  
        
    if (trip.tickets_left < req.body.tickets) {
      await t.rollback();
      return res.status(400).render(
        'book',
        { trip_id: req.params.trip_id, errors: [{ param: 'tickets', msg: 'You are asking for too many tickets!'}] });
    } else {
      await db.Trip.update({ tickets_left: Sequelize.literal(`tickets_left - ${req.body.tickets}`) }, { where: { id: req.params.trip_id }, transaction: t });
      await db.Reservation.create({
        tickets: req.body.tickets,
        TripId: req.params.trip_id,
        UserId: user[0].dataValues.id,
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
