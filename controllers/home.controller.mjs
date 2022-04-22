import trips from "../public/javascripts/trips.mjs";
import promotions from "../public/javascripts/promotions.mjs";

const homeController = {
  get: (req, res) => {
    res.status(200).render('index.pug', { trips: trips, promotions: promotions });
  }
}

export default homeController;