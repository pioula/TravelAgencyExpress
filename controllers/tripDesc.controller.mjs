import trips from "../public/javascripts/trips.mjs";

const tripDescriptionController = {
  // localhost:port/trip/6
  get: (req, res, next) => {
    if (req.params.trip_id >= trips.length) {
      next(404);
    }
    else {
      res.status(200).render(
        'tripDescription',
        { trip_id: req.params.trip_id, trip: trips[req.params.trip_id] },
      );
    }
  },
}
export default tripDescriptionController;
