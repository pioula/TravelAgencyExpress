import trips from "../public/javascripts/trips.mjs";
import promotions from "../public/javascripts/promotions.mjs";
import advices from "../public/javascripts/advices.mjs";
import { page } from "../public/javascripts/home/pagination.mjs";

const homeController = {
  get: (req, res) => {
    res.status(200).render('index.pug', { trips: trips, promotions: promotions, advices: advices, page: page });
  }
}

export default homeController;