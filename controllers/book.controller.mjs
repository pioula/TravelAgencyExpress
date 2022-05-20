import db from "../services/database.mjs";

import { validationResult } from "express-validator";


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
  post: (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).render(
        'book',
        { trip_id: req.params.trip_id, errors: errors.array() });
    }

    db.Reservation.create({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      tickets: req.body.tickets,
      tripId: req.params.trip_id
    });

    return res.status(200).render(
      'book',
      { trip_id: req.params.trip_id, errors: [] },
    );
  }
}
export default bookController;
