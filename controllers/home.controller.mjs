import trips from "../public/javascripts/trips.mjs";
import promotions from "../public/javascripts/promotions.mjs";
import advices from "../public/javascripts/advices.mjs";

const homeController = {
  get: (req, res) => {
    res.status(200).render('index.pug', { trips: trips, promotions: promotions, advices: advices });
  }
}

export default homeController;