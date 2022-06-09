import db from "../services/database.mjs";

const tripDescriptionController = {
  // localhost:port/trip/6
  get: (req, res, next) => {
      db.Trip.findByPk(req.params.trip_id, {
        attributes: ['id', 'title', 'trip_description', 'img', 'beg_date', 'end_date']
      })
      .then((trip) => {
        if (trip === null) {
          next(404);
        }
        else {
          res.status(200).render(
            'tripDescription',
            { trip_id: req.params.trip_id, trip: trip.dataValues },
          );
        }
      })
      .catch((err) => {
        next(500);
      })
  },
}
export default tripDescriptionController;
