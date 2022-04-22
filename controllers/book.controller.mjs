import trips from "../public/javascripts/trips.mjs";

const bookController = {
  // localhost:port/book/6
  get: (req, res, next) => {
    if (req.params.trip_id >= trips.length) {
      next(404);
    }
    else {
      res.status(200).render(
        'book',
        { trip_id: req.params.trip_id },
      );
    }
  },
}
export default bookController;
